import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-village',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './village.html',
  styleUrl: './village.scss'
})
export class Village {
  title = 'Village';

  columns = [
  {
    key: "name",
    label: "Village"
  },
  {
    key: "mandal",
    label: "Mandal"
  },
  {
    key: "district",
    label: "District"
  },
  {
    key: "employees",
    label: "Employees"
  },
  {
    key: "status",
    label: "Status"
  }
];

  fields = [
  {
    key: "name",
    label: "Village Name",
    type: "text"
  },
  {
    key: "mandal",
    label: "Mandal",
    type: "text"
  },
  {
    key: "district",
    label: "District",
    type: "text"
  },
  {
    key: "employees",
    label: "Employees",
    type: "text"
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      "Main Village",
      "Active",
      "Inactive"
    ]
  }
];

  rows: Row[] = [
  {
    "name": "Kalavalasa",
    "mandal": "Bheemunipatnam",
    "district": "Visakhapatnam",
    "employees": "218",
    "status": "Main Village"
  },
  {
    "name": "Devada",
    "mandal": "Padmanabham",
    "district": "Visakhapatnam",
    "employees": "164",
    "status": "Active"
  },
  {
    "name": "Tagarapuvalasa",
    "mandal": "Bheemunipatnam",
    "district": "Visakhapatnam",
    "employees": "142",
    "status": "Active"
  },
  {
    "name": "Chittivalasa",
    "mandal": "Bheemunipatnam",
    "district": "Visakhapatnam",
    "employees": "96",
    "status": "Active"
  },
  {
    "name": "Annavaram",
    "mandal": "Padmanabham",
    "district": "Visakhapatnam",
    "employees": "84",
    "status": "Active"
  },
  {
    "name": "Gudilova",
    "mandal": "Anandapuram",
    "district": "Visakhapatnam",
    "employees": "67",
    "status": "Active"
  },
  {
    "name": "Revidi",
    "mandal": "Bheemunipatnam",
    "district": "Visakhapatnam",
    "employees": "52",
    "status": "Inactive"
  }
];

  // ── search / pagination ──
  searchTerm = '';
  page = 1;
  pageSize = 5;

  get filtered(): Row[] {
    const t = this.searchTerm.trim().toLowerCase();
    if (!t) return this.rows;
    return this.rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(t)));
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

  // ── add / edit popup ──
  showModal = false;
  editIndex = -1;
  form: Row = {};

  openAdd() {
    this.editIndex = -1;
    this.form = {};
    for (const f of this.fields) this.form[f.key] = f.type === 'select' ? (f.options?.[0] ?? '') : '';
    this.showModal = true;
  }

  openEdit(row: Row) {
    this.editIndex = this.rows.indexOf(row);
    this.form = { ...row };
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  save() {
    const first = this.fields[0].key;
    if (!String(this.form[first] ?? '').trim()) return;
    if (this.editIndex >= 0) {
      this.rows[this.editIndex] = { ...this.form };
    } else {
      this.rows = [{ ...this.form }, ...this.rows];
      this.page = 1;
    }
    this.showModal = false;
  }

  // ── print / export ──
  private matrix(): string[][] {
    return this.filtered.map(r => this.columns.map(c => r[c.key] ?? ''));
  }
  doExport() { exportCsv(this.title, this.columns.map(c => c.label), this.matrix()); }
  doPrint() { printTable(this.title, this.columns.map(c => c.label), this.matrix()); }
}
