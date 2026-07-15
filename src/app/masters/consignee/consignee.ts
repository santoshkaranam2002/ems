import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-consignee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consignee.html',
  styleUrl: './consignee.scss'
})
export class Consignee {
  title = 'Consignee';

  columns = [
  {
    key: "name",
    label: "Consignee"
  },
  {
    key: "type",
    label: "Type"
  },
  {
    key: "location",
    label: "Location"
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
    label: "Consignee Name",
    type: "text"
  },
  {
    key: "type",
    label: "Type",
    type: "select",
    options: [
      "Internal",
      "Project",
      "External"
    ]
  },
  {
    key: "location",
    label: "Location",
    type: "select",
    options: [
      "KALAVALASA",
      "Main Plant",
      "Township",
      "Coal Yard"
    ]
  },
  {
    key: "contact",
    label: "Contact Person",
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
    "name": "Stores — Main Plant",
    "type": "Internal",
    "location": "KALAVALASA",
    "contact": "S. Prakash",
    "status": "Active"
  },
  {
    "name": "BTG Erection Wing",
    "type": "Project",
    "location": "Main Plant",
    "contact": "K. Mohan Rao",
    "status": "Active"
  },
  {
    "name": "CHP Operations",
    "type": "Internal",
    "location": "Coal Yard",
    "contact": "D. Ravi Kumar",
    "status": "Inactive"
  },
  {
    "name": "AHP Maintenance",
    "type": "Internal",
    "location": "Main Plant",
    "contact": "P. Srinu",
    "status": "Active"
  },
  {
    "name": "Township Estate Office",
    "type": "Internal",
    "location": "Township",
    "contact": "M. Kumari",
    "status": "Active"
  },
  {
    "name": "FGD Project Cell",
    "type": "Project",
    "location": "Main Plant",
    "contact": "V. Naresh",
    "status": "Active"
  },
  {
    "name": "Railway Siding Cell",
    "type": "External",
    "location": "Coal Yard",
    "contact": "B. Raju",
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
