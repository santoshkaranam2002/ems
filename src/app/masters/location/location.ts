import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location.html',
  styleUrl: './location.scss'
})
export class Location {
  title = 'Location';

  columns = [
  {
    key: "name",
    label: "Location"
  },
  {
    key: "code",
    label: "Code"
  },
  {
    key: "type",
    label: "Type"
  },
  {
    key: "gate",
    label: "Gate"
  },
  {
    key: "status",
    label: "Status"
  }
];

  fields = [
  {
    key: "name",
    label: "Location Name",
    type: "text"
  },
  {
    key: "code",
    label: "Code",
    type: "text"
  },
  {
    key: "type",
    label: "Type",
    type: "select",
    options: [
      "Main Plant",
      "Restricted",
      "Residential"
    ]
  },
  {
    key: "gate",
    label: "Gate",
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
    "name": "KALAVALASA",
    "code": "101",
    "type": "Main Plant",
    "gate": "Gate 1",
    "status": "Active"
  },
  {
    "name": "Main Plant — BTG",
    "code": "102",
    "type": "Restricted",
    "gate": "Gate 2",
    "status": "Active"
  },
  {
    "name": "Township",
    "code": "103",
    "type": "Residential",
    "gate": "Gate 4",
    "status": "Active"
  },
  {
    "name": "Coal Yard",
    "code": "104",
    "type": "Restricted",
    "gate": "Gate 3",
    "status": "Active"
  },
  {
    "name": "Ash Pond",
    "code": "105",
    "type": "Restricted",
    "gate": "Gate 5",
    "status": "Active"
  },
  {
    "name": "Raw Water Reservoir",
    "code": "106",
    "type": "Restricted",
    "gate": "Gate 6",
    "status": "Inactive"
  },
  {
    "name": "Guest House Campus",
    "code": "107",
    "type": "Residential",
    "gate": "Gate 4",
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
