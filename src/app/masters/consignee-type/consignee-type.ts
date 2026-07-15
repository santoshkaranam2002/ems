import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-consignee-type',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consignee-type.html',
  styleUrl: './consignee-type.scss'
})
export class ConsigneeType {
  title = 'Consignee Type';

  columns = [
  {
    key: "type",
    label: "Type"
  },
  {
    key: "code",
    label: "Code"
  },
  {
    key: "desc",
    label: "Description"
  },
  {
    key: "count",
    label: "Consignees"
  },
  {
    key: "status",
    label: "Status"
  }
];

  fields = [
  {
    key: "type",
    label: "Type Name",
    type: "text"
  },
  {
    key: "code",
    label: "Code",
    type: "text"
  },
  {
    key: "desc",
    label: "Description",
    type: "text"
  },
  {
    key: "count",
    label: "Consignees",
    type: "text"
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      "Active",
      "Inactive"
    ]
  }
];

  rows: Row[] = [
  {
    "type": "Internal",
    "code": "CT-01",
    "desc": "Plant internal departments",
    "count": "12",
    "status": "Active"
  },
  {
    "type": "Project",
    "code": "CT-02",
    "desc": "Erection & project wings",
    "count": "7",
    "status": "Active"
  },
  {
    "type": "External",
    "code": "CT-03",
    "desc": "Outside agencies",
    "count": "4",
    "status": "Active"
  },
  {
    "type": "Statutory",
    "code": "CT-04",
    "desc": "Government inspection bodies",
    "count": "3",
    "status": "Active"
  },
  {
    "type": "Township",
    "code": "CT-05",
    "desc": "Residential estate services",
    "count": "5",
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
