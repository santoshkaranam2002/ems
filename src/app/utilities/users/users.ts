import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
  title = 'Users';

  columns = [
  {
    key: "name",
    label: "User"
  },
  {
    key: "username",
    label: "Username"
  },
  {
    key: "role",
    label: "Role"
  },
  {
    key: "lastLogin",
    label: "Last Login"
  },
  {
    key: "status",
    label: "Status"
  }
];

  fields = [
  {
    key: "name",
    label: "Full Name",
    type: "text"
  },
  {
    key: "username",
    label: "Username",
    type: "text"
  },
  {
    key: "role",
    label: "Role",
    type: "select",
    options: [
      "Super Admin",
      "HR Officer",
      "Security Head",
      "Wages Clerk",
      "Gate Operator"
    ]
  },
  {
    key: "lastLogin",
    label: "Last Login",
    type: "text"
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      "Active",
      "Disabled"
    ]
  }
];

  rows: Row[] = [
  {
    "name": "Administrator",
    "username": "admin",
    "role": "Super Admin",
    "lastLogin": "Today, 09:12 AM",
    "status": "Active"
  },
  {
    "name": "K. Srinivas",
    "username": "srinivas.k",
    "role": "HR Officer",
    "lastLogin": "Today, 08:47 AM",
    "status": "Active"
  },
  {
    "name": "P. Ramana Murthy",
    "username": "ramana.p",
    "role": "Security Head",
    "lastLogin": "Yesterday, 06:31 PM",
    "status": "Active"
  },
  {
    "name": "M. Divya",
    "username": "divya.m",
    "role": "Wages Clerk",
    "lastLogin": "08 Jul 2026",
    "status": "Active"
  },
  {
    "name": "B. Ajay Kumar",
    "username": "ajay.b",
    "role": "Gate Operator",
    "lastLogin": "21 Jun 2026",
    "status": "Disabled"
  },
  {
    "name": "S. Harish",
    "username": "harish.s",
    "role": "Gate Operator",
    "lastLogin": "10 Jul 2026",
    "status": "Active"
  },
  {
    "name": "V. Anusha",
    "username": "anusha.v",
    "role": "HR Officer",
    "lastLogin": "12 Jul 2026",
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
