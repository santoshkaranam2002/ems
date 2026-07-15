import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-group-pass-expiry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './group-pass-expiry.html',
  styleUrl: './group-pass-expiry.scss'
})
export class GroupPassExpiry {
  title = 'Employee Group Pass Expiry';

  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises', 'Vizag Power Solutions'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];

  selContractor = 'All Contractors';
  selLocation   = 'All Locations';
  fromDate = '';
  toDate   = '';
  generatedAt: Date | null = null;

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
    key: "passExpiry",
    label: "Expiry Date"
  },
  {
    key: "daysLeft",
    label: "Days Left"
  },
  {
    key: "status",
    label: "Status"
  }
];

  rows: Row[] = [
  {
    "gp": "GP-2026-018",
    "contractor": "SVR Engineering Works",
    "wo": "WO/2026/0141",
    "members": "14",
    "passExpiry": "20 Jul 2026",
    "daysLeft": "7",
    "status": "Expiring"
  },
  {
    "gp": "GP-2026-015",
    "contractor": "Godavari Mech Pvt Ltd",
    "wo": "WO/2025/0512",
    "members": "9",
    "passExpiry": "31 Jul 2026",
    "daysLeft": "18",
    "status": "Expiring"
  },
  {
    "gp": "GP-2026-011",
    "contractor": "Coastal Infra Services",
    "wo": "WO/2026/0134",
    "members": "11",
    "passExpiry": "30 Sep 2026",
    "daysLeft": "79",
    "status": "Active"
  },
  {
    "gp": "GP-2026-008",
    "contractor": "Vizag Power Solutions",
    "wo": "WO/2026/0098",
    "members": "7",
    "passExpiry": "20 Oct 2026",
    "daysLeft": "99",
    "status": "Active"
  },
  {
    "gp": "GP-2025-042",
    "contractor": "Sai Teja Enterprises",
    "wo": "WO/2025/0488",
    "members": "12",
    "passExpiry": "15 Mar 2026",
    "daysLeft": "0",
    "status": "Expired"
  }
];

  page = 1;
  pageSize = 6;

  get filtered(): Row[] {
    let list = this.rows;
    if (this.selContractor !== 'All Contractors') {
      list = list.filter(r => !('contractor' in r) || r['contractor'] === this.selContractor);
    }
    return list;
  }

  get totalPages(): number { return Math.max(1, Math.ceil(this.filtered.length / this.pageSize)); }
  get pages(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }
  get paged(): Row[] {
    const p = Math.min(this.page, this.totalPages);
    return this.filtered.slice((p - 1) * this.pageSize, p * this.pageSize);
  }
  setPage(p: number) { if (p >= 1 && p <= this.totalPages) this.page = p; }

  generate() {
    this.page = 1;
    this.generatedAt = new Date();
  }

  pill = pillClass;
  isPillCol(key: string): boolean { return key === 'status'; }

  private matrix(): string[][] {
    return this.filtered.map(r => this.columns.map(c => r[c.key] ?? ''));
  }
  doExport() { exportCsv(this.title, this.columns.map(c => c.label), this.matrix()); }
  doPrint() { printTable(this.title, this.columns.map(c => c.label), this.matrix()); }
}
