import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-salary-not-issued',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salary-not-issued.html',
  styleUrl: './salary-not-issued.scss'
})
export class SalaryNotIssued {
  title = 'Employee Salary Not Issued Report';

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
    key: "month",
    label: "Pending Month"
  },
  {
    key: "lastPaid",
    label: "Last Paid Month"
  },
  {
    key: "status",
    label: "Status"
  }
];

  rows: Row[] = [
  {
    "code": "EMP-24211",
    "name": "CH. Durga Prasad",
    "contractor": "Sai Teja Enterprises",
    "month": "Jun 2026",
    "lastPaid": "May 2026",
    "status": "Not Issued"
  },
  {
    "code": "EMP-23902",
    "name": "K. Simhadri",
    "contractor": "Vizag Power Solutions",
    "month": "Jun 2026",
    "lastPaid": "May 2026",
    "status": "Not Issued"
  },
  {
    "code": "EMP-24518",
    "name": "N. Ravi Teja",
    "contractor": "Coastal Infra Services",
    "month": "May 2026",
    "lastPaid": "Apr 2026",
    "status": "Overdue"
  },
  {
    "code": "EMP-23755",
    "name": "R. Appala Raju",
    "contractor": "SVR Engineering Works",
    "month": "Jun 2026",
    "lastPaid": "May 2026",
    "status": "Not Issued"
  },
  {
    "code": "EMP-24102",
    "name": "A. Simhachalam",
    "contractor": "Godavari Mech Pvt Ltd",
    "month": "Apr 2026",
    "lastPaid": "Mar 2026",
    "status": "Overdue"
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
