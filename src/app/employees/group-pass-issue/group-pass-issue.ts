import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-group-pass-issue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './group-pass-issue.html',
  styleUrl: './group-pass-issue.scss'
})
export class GroupPassIssue {
  title = 'Group Pass Issue';

  columns = [
  {
    key: "gp",
    label: "Group Pass No."
  },
  {
    key: "contractor",
    label: "Contractor"
  },
  {
    key: "wo",
    label: "Work Order"
  },
  {
    key: "members",
    label: "Members"
  },
  {
    key: "expiry",
    label: "Expiry Date"
  },
  {
    key: "status",
    label: "Status"
  }
];

  fields = [
  {
    key: "gp",
    label: "Group Pass No.",
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
    key: "wo",
    label: "Work Order",
    type: "select",
    options: [
      "WO/2026/0141",
      "WO/2026/0134",
      "WO/2025/0512",
      "WO/2026/0098",
      "WO/2026/0076"
    ]
  },
  {
    key: "members",
    label: "Members Count",
    type: "text"
  },
  {
    key: "expiry",
    label: "Expiry Date",
    type: "text"
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      "Active",
      "Expiring",
      "Expired"
    ]
  }
];

  rows: Row[] = [
  {
    "gp": "GP-2026-018",
    "contractor": "SVR Engineering Works",
    "wo": "WO/2026/0141",
    "members": "14",
    "expiry": "20 Jul 2026",
    "status": "Expiring"
  },
  {
    "gp": "GP-2026-015",
    "contractor": "Godavari Mech Pvt Ltd",
    "wo": "WO/2025/0512",
    "members": "9",
    "expiry": "31 Jul 2026",
    "status": "Expiring"
  },
  {
    "gp": "GP-2026-011",
    "contractor": "Coastal Infra Services",
    "wo": "WO/2026/0134",
    "members": "11",
    "expiry": "30 Sep 2026",
    "status": "Active"
  },
  {
    "gp": "GP-2026-008",
    "contractor": "Vizag Power Solutions",
    "wo": "WO/2026/0098",
    "members": "7",
    "expiry": "20 Oct 2026",
    "status": "Active"
  },
  {
    "gp": "GP-2026-004",
    "contractor": "SVR Engineering Works",
    "wo": "WO/2026/0076",
    "members": "10",
    "expiry": "14 Aug 2026",
    "status": "Active"
  },
  {
    "gp": "GP-2025-042",
    "contractor": "Sai Teja Enterprises",
    "wo": "WO/2025/0488",
    "members": "12",
    "expiry": "15 Mar 2026",
    "status": "Expired"
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
