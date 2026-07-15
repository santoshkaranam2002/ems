import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-work-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './work-orders.html',
  styleUrl: './work-orders.scss'
})
export class WorkOrders {
  title = 'Work Orders';

  columns = [
  {
    key: "wo",
    label: "Work Order"
  },
  {
    key: "contractor",
    label: "Contractor"
  },
  {
    key: "area",
    label: "Work Area"
  },
  {
    key: "validTill",
    label: "Valid Till"
  },
  {
    key: "status",
    label: "Status"
  }
];

  fields = [
  {
    key: "wo",
    label: "Work Order No.",
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
    key: "area",
    label: "Work Area",
    type: "select",
    options: [
      "Boiler Maintenance",
      "Coal Handling Plant",
      "Ash Handling",
      "Turbine Section",
      "Switch Yard",
      "Civil Works"
    ]
  },
  {
    key: "validTill",
    label: "Valid Till",
    type: "text"
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      "Open",
      "Closing",
      "Closed"
    ]
  }
];

  rows: Row[] = [
  {
    "wo": "WO/2026/0141",
    "contractor": "SVR Engineering Works",
    "area": "Boiler Maintenance",
    "validTill": "31 Dec 2026",
    "status": "Open"
  },
  {
    "wo": "WO/2026/0134",
    "contractor": "Coastal Infra Services",
    "area": "Coal Handling Plant",
    "validTill": "30 Sep 2026",
    "status": "Open"
  },
  {
    "wo": "WO/2025/0512",
    "contractor": "Godavari Mech Pvt Ltd",
    "area": "Ash Handling",
    "validTill": "31 Jul 2026",
    "status": "Closing"
  },
  {
    "wo": "WO/2025/0488",
    "contractor": "Sai Teja Enterprises",
    "area": "Turbine Section",
    "validTill": "15 Mar 2026",
    "status": "Closed"
  },
  {
    "wo": "WO/2026/0098",
    "contractor": "Vizag Power Solutions",
    "area": "Switch Yard",
    "validTill": "20 Oct 2026",
    "status": "Open"
  },
  {
    "wo": "WO/2026/0076",
    "contractor": "SVR Engineering Works",
    "area": "Civil Works",
    "validTill": "14 Aug 2026",
    "status": "Closing"
  },
  {
    "wo": "WO/2026/0052",
    "contractor": "Godavari Mech Pvt Ltd",
    "area": "Boiler Maintenance",
    "validTill": "09 Nov 2026",
    "status": "Open"
  },
  {
    "wo": "WO/2025/0463",
    "contractor": "Coastal Infra Services",
    "area": "Ash Handling",
    "validTill": "28 Feb 2026",
    "status": "Closed"
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
