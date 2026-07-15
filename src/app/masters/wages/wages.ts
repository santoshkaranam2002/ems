import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-wages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wages.html',
  styleUrl: './wages.scss'
})
export class Wages {
  title = 'Wages';

  columns = [
  {
    key: "category",
    label: "Category"
  },
  {
    key: "basis",
    label: "Basis"
  },
  {
    key: "basic",
    label: "Basic (₹)"
  },
  {
    key: "da",
    label: "DA (₹)"
  },
  {
    key: "status",
    label: "Status"
  }
];

  fields = [
  {
    key: "category",
    label: "Category",
    type: "select",
    options: [
      "Highly Skilled",
      "Skilled",
      "Semi-Skilled",
      "Unskilled"
    ]
  },
  {
    key: "basis",
    label: "Basis",
    type: "select",
    options: [
      "Daily",
      "Monthly"
    ]
  },
  {
    key: "basic",
    label: "Basic (₹)",
    type: "text"
  },
  {
    key: "da",
    label: "DA (₹)",
    type: "text"
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      "Current",
      "Inactive"
    ]
  }
];

  rows: Row[] = [
  {
    "category": "Highly Skilled",
    "basis": "Daily",
    "basic": "742.00",
    "da": "128.40",
    "status": "Current"
  },
  {
    "category": "Skilled",
    "basis": "Daily",
    "basic": "664.00",
    "da": "118.20",
    "status": "Current"
  },
  {
    "category": "Semi-Skilled",
    "basis": "Daily",
    "basic": "571.00",
    "da": "104.60",
    "status": "Current"
  },
  {
    "category": "Unskilled",
    "basis": "Daily",
    "basic": "498.00",
    "da": "92.80",
    "status": "Current"
  },
  {
    "category": "Highly Skilled",
    "basis": "Monthly",
    "basic": "19,292.00",
    "da": "3,338.40",
    "status": "Current"
  },
  {
    "category": "Skilled",
    "basis": "Monthly",
    "basic": "17,264.00",
    "da": "3,073.20",
    "status": "Current"
  },
  {
    "category": "Semi-Skilled",
    "basis": "Monthly",
    "basic": "14,846.00",
    "da": "2,719.60",
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
