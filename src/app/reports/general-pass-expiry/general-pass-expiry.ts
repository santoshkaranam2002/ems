import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-general-pass-expiry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './general-pass-expiry.html',
  styleUrl: './general-pass-expiry.scss'
})
export class GeneralPassExpiry {
  title = 'Employees General Pass Expiry';

  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises', 'Vizag Power Solutions'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];

  selContractor = 'All Contractors';
  selLocation   = 'All Locations';
  fromDate = '';
  toDate   = '';
  generatedAt: Date | null = null;

  columns = [
  {
    key: "code",
    label: "Emp Code"
  },
  {
    key: "name",
    label: "Employee"
  },
  {
    key: "contractor",
    label: "Contractor"
  },
  {
    key: "passIssue",
    label: "Issue Date"
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
    "code": "EMP-24814",
    "name": "B. Venkata Rao",
    "contractor": "Sai Teja Enterprises",
    "passIssue": "15 Jul 2025",
    "passExpiry": "15 Jul 2026",
    "daysLeft": "2",
    "status": "Expiring"
  },
  {
    "code": "EMP-23755",
    "name": "R. Appala Raju",
    "contractor": "SVR Engineering Works",
    "passIssue": "19 Jul 2025",
    "passExpiry": "19 Jul 2026",
    "daysLeft": "6",
    "status": "Expiring"
  },
  {
    "code": "EMP-24816",
    "name": "P. Suresh Kumar",
    "contractor": "Coastal Infra Services",
    "passIssue": "21 Jul 2025",
    "passExpiry": "21 Jul 2026",
    "daysLeft": "8",
    "status": "Expiring"
  },
  {
    "code": "EMP-24390",
    "name": "D. Krishna Murthy",
    "contractor": "Godavari Mech Pvt Ltd",
    "passIssue": "27 Jul 2025",
    "passExpiry": "27 Jul 2026",
    "daysLeft": "14",
    "status": "Expiring"
  },
  {
    "code": "EMP-23871",
    "name": "T. Nagaraju",
    "contractor": "SVR Engineering Works",
    "passIssue": "01 Aug 2025",
    "passExpiry": "01 Aug 2026",
    "daysLeft": "19",
    "status": "Expiring"
  },
  {
    "code": "EMP-23902",
    "name": "K. Simhadri",
    "contractor": "Vizag Power Solutions",
    "passIssue": "05 Aug 2025",
    "passExpiry": "05 Aug 2026",
    "daysLeft": "23",
    "status": "Expiring"
  },
  {
    "code": "EMP-23640",
    "name": "V. Srinivasa Rao",
    "contractor": "Vizag Power Solutions",
    "passIssue": "09 Feb 2025",
    "passExpiry": "09 Feb 2026",
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
