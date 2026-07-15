import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-import-employee-salary-statement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './import-employee-salary-statement.html',
  styleUrl: './import-employee-salary-statement.scss'
})
export class ImportEmployeeSalaryStatement {
  title = 'Import Salary Statement';

  columns = [
  {
    key: "batch",
    label: "Batch No."
  },
  {
    key: "contractor",
    label: "Contractor"
  },
  {
    key: "month",
    label: "Wage Month"
  },
  {
    key: "records",
    label: "Records"
  },
  {
    key: "importedOn",
    label: "Imported On"
  },
  {
    key: "status",
    label: "Status"
  }
];

  fields = [
  {
    key: "batch",
    label: "Batch No.",
    type: "text"
  },
  {
    key: "contractor",
    label: "Contractor",
    type: "select",
    options: [
      "SVR Engineering Works",
      "Coastal Infra Services",
      "Godavari Mech Pvt Ltd",
      "Sai Teja Enterprises",
      "Vizag Power Solutions"
    ]
  },
  {
    key: "month",
    label: "Wage Month",
    type: "select",
    options: [
      "Jun 2026",
      "May 2026",
      "Apr 2026",
      "Mar 2026"
    ]
  },
  {
    key: "records",
    label: "Records",
    type: "text"
  },
  {
    key: "importedOn",
    label: "Imported On",
    type: "text"
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      "Imported",
      "Pending"
    ]
  }
];

  rows: Row[] = [
  {
    "batch": "IMP-2026-064",
    "contractor": "SVR Engineering Works",
    "month": "Jun 2026",
    "records": "486",
    "importedOn": "05 Jul 2026",
    "status": "Imported"
  },
  {
    "batch": "IMP-2026-063",
    "contractor": "Coastal Infra Services",
    "month": "Jun 2026",
    "records": "402",
    "importedOn": "05 Jul 2026",
    "status": "Imported"
  },
  {
    "batch": "IMP-2026-062",
    "contractor": "Godavari Mech Pvt Ltd",
    "month": "Jun 2026",
    "records": "331",
    "importedOn": "04 Jul 2026",
    "status": "Imported"
  },
  {
    "batch": "IMP-2026-061",
    "contractor": "Sai Teja Enterprises",
    "month": "Jun 2026",
    "records": "264",
    "importedOn": "—",
    "status": "Pending"
  },
  {
    "batch": "IMP-2026-058",
    "contractor": "Vizag Power Solutions",
    "month": "May 2026",
    "records": "197",
    "importedOn": "06 Jun 2026",
    "status": "Imported"
  },
  {
    "batch": "IMP-2026-055",
    "contractor": "SVR Engineering Works",
    "month": "May 2026",
    "records": "479",
    "importedOn": "05 Jun 2026",
    "status": "Imported"
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
