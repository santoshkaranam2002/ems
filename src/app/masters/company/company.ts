import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company.html',
  styleUrl: './company.scss'
})
export class Company {
  title = 'Company';

  columns = [
  {
    key: "name",
    label: "Company"
  },
  {
    key: "code",
    label: "Code"
  },
  {
    key: "city",
    label: "City"
  },
  {
    key: "contact",
    label: "Contact"
  },
  {
    key: "status",
    label: "Status"
  }
];

  fields = [
  {
    key: "name",
    label: "Company Name",
    type: "text"
  },
  {
    key: "code",
    label: "Company Code",
    type: "text"
  },
  {
    key: "city",
    label: "City",
    type: "text"
  },
  {
    key: "contact",
    label: "Contact",
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
    "name": "Hinduja National Power Corporation Ltd.",
    "code": "1001",
    "city": "Visakhapatnam",
    "contact": "0891-2788000",
    "status": "Active"
  },
  {
    "name": "HNPCL Township Services",
    "code": "1002",
    "city": "Visakhapatnam",
    "contact": "0891-2788101",
    "status": "Active"
  },
  {
    "name": "HNPCL O&M Division",
    "code": "1003",
    "city": "Visakhapatnam",
    "contact": "0891-2788230",
    "status": "Active"
  },
  {
    "name": "HNPCL Ash Utilisation Wing",
    "code": "1004",
    "city": "Visakhapatnam",
    "contact": "0891-2788245",
    "status": "Active"
  },
  {
    "name": "HNPCL CSR Foundation",
    "code": "1005",
    "city": "Visakhapatnam",
    "contact": "0891-2788310",
    "status": "Active"
  },
  {
    "name": "HNPCL Security Services",
    "code": "1006",
    "city": "Visakhapatnam",
    "contact": "0891-2788330",
    "status": "Active"
  },
  {
    "name": "HNPCL Logistics Cell",
    "code": "1007",
    "city": "Visakhapatnam",
    "contact": "0891-2788356",
    "status": "Inactive"
  },
  {
    "name": "HNPCL Guest House Admin",
    "code": "1008",
    "city": "Visakhapatnam",
    "contact": "0891-2788390",
    "status": "Active"
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
