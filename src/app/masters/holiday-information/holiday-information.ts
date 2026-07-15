import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-holiday-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './holiday-information.html',
  styleUrl: './holiday-information.scss'
})
export class HolidayInformation {
  title = 'Holiday Information';

  columns = [
  {
    key: "name",
    label: "Holiday"
  },
  {
    key: "date",
    label: "Date"
  },
  {
    key: "day",
    label: "Day"
  },
  {
    key: "type",
    label: "Type"
  },
  {
    key: "status",
    label: "Status"
  }
];

  fields = [
  {
    key: "name",
    label: "Holiday Name",
    type: "text"
  },
  {
    key: "date",
    label: "Date",
    type: "text"
  },
  {
    key: "day",
    label: "Day",
    type: "text"
  },
  {
    key: "type",
    label: "Type",
    type: "select",
    options: [
      "National",
      "Festival",
      "Plant"
    ]
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      "Declared",
      "Upcoming"
    ]
  }
];

  rows: Row[] = [
  {
    "name": "Republic Day",
    "date": "26 Jan 2026",
    "day": "Monday",
    "type": "National",
    "status": "Declared"
  },
  {
    "name": "Maha Shivaratri",
    "date": "15 Feb 2026",
    "day": "Sunday",
    "type": "Festival",
    "status": "Declared"
  },
  {
    "name": "Ugadi",
    "date": "19 Mar 2026",
    "day": "Thursday",
    "type": "Festival",
    "status": "Declared"
  },
  {
    "name": "May Day",
    "date": "01 May 2026",
    "day": "Friday",
    "type": "National",
    "status": "Declared"
  },
  {
    "name": "Independence Day",
    "date": "15 Aug 2026",
    "day": "Saturday",
    "type": "National",
    "status": "Upcoming"
  },
  {
    "name": "Vinayaka Chavithi",
    "date": "14 Sep 2026",
    "day": "Monday",
    "type": "Festival",
    "status": "Upcoming"
  },
  {
    "name": "Gandhi Jayanti",
    "date": "02 Oct 2026",
    "day": "Friday",
    "type": "National",
    "status": "Upcoming"
  },
  {
    "name": "Vijaya Dashami",
    "date": "20 Oct 2026",
    "day": "Tuesday",
    "type": "Festival",
    "status": "Upcoming"
  },
  {
    "name": "Deepavali",
    "date": "08 Nov 2026",
    "day": "Sunday",
    "type": "Festival",
    "status": "Upcoming"
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
