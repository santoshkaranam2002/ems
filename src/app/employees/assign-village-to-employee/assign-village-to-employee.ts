import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-assign-village-to-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-village-to-employee.html',
  styleUrl: './assign-village-to-employee.scss'
})
export class AssignVillageToEmployee {
  title = 'Assign Village to Employee';

  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises', 'Vizag Power Solutions'];
  selContractor = 'All Contractors';
  searchTerm = '';

  columns = [
  {
    key: "code",
    label: "Emp Code"
  },
  {
    key: "name",
    label: "Employee"
  },
  {
    key: "contractor",
    label: "Contractor"
  },
  {
    key: "village",
    label: "Village"
  },
  {
    key: "status",
    label: "Status"
  }
];
  popupFields = [
  {
    key: "village",
    label: "Village",
    type: "select",
    options: [
      "Kalavalasa",
      "Devada",
      "Tagarapuvalasa",
      "Chittivalasa",
      "Annavaram",
      "Gudilova",
      "Revidi"
    ]
  }
];

  rows: Row[] = [
  {
    "code": "EMP-24817",
    "name": "K. Ramesh Naidu",
    "contractor": "SVR Engineering Works",
    "village": "Kalavalasa",
    "status": "Active"
  },
  {
    "code": "EMP-24816",
    "name": "P. Suresh Kumar",
    "contractor": "Coastal Infra Services",
    "village": "—",
    "status": "Pending"
  },
  {
    "code": "EMP-24815",
    "name": "M. Lakshmi Devi",
    "contractor": "Godavari Mech Pvt Ltd",
    "village": "Tagarapuvalasa",
    "status": "Active"
  },
  {
    "code": "EMP-24814",
    "name": "B. Venkata Rao",
    "contractor": "Sai Teja Enterprises",
    "village": "—",
    "status": "Pending"
  },
  {
    "code": "EMP-24813",
    "name": "S. Anil Kumar",
    "contractor": "SVR Engineering Works",
    "village": "Annavaram",
    "status": "Active"
  },
  {
    "code": "EMP-24812",
    "name": "G. Padma Priya",
    "contractor": "Vizag Power Solutions",
    "village": "—",
    "status": "Pending"
  },
  {
    "code": "EMP-23871",
    "name": "T. Nagaraju",
    "contractor": "SVR Engineering Works",
    "village": "Devada",
    "status": "Active"
  }
];

  page = 1;
  pageSize = 5;

  get filtered(): Row[] {
    let list = this.rows;
    if (this.selContractor !== 'All Contractors') list = list.filter(r => r['contractor'] === this.selContractor);
    const t = this.searchTerm.trim().toLowerCase();
    if (t) list = list.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(t)));
    return list;
  }
  get totalPages(): number { return Math.max(1, Math.ceil(this.filtered.length / this.pageSize)); }
  get pages(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }
  get paged(): Row[] {
    const p = Math.min(this.page, this.totalPages);
    return this.filtered.slice((p - 1) * this.pageSize, p * this.pageSize);
  }
  onSearch() { this.page = 1; }
  setPage(p: number) { if (p >= 1 && p <= this.totalPages) this.page = p; }

  pill = pillClass;
  isDisabled(r: Row): boolean { return false; }

  // ── action popup ──
  showModal = false;
  target: Row | null = null;
  form: Row = {};

  openAction(row: Row) {
    this.target = row;
    this.form = {};
    for (const f of this.popupFields) this.form[f.key] = f.type === 'select' ? (f.options?.[0] ?? '') : '';
    this.showModal = true;
  }
  closeModal() { this.showModal = false; this.target = null; }

  confirmAction() {
    if (!this.target) return;
    this.target['village'] = this.form['village'];
    this.target['status'] = 'Active';
    this.showModal = false;
    this.target = null;
  }

  private matrix(): string[][] {
    return this.filtered.map(r => this.columns.map(c => r[c.key] ?? ''));
  }
  doExport() { exportCsv(this.title, this.columns.map(c => c.label), this.matrix()); }
  doPrint() { printTable(this.title, this.columns.map(c => c.label), this.matrix()); }
}
