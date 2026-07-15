import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-adjustment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adjustment.html',
  styleUrl: './adjustment.scss'
})
export class Adjustment {
  title = 'Adjustment';

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
    label: "Month"
  },
  {
    key: "type",
    label: "Adjustment Type"
  },
  {
    key: "amount",
    label: "Amount (₹)"
  },
  {
    key: "reason",
    label: "Reason"
  }
];

  rows: Row[] = [
  {
    "code": "EMP-24817",
    "name": "K. Ramesh Naidu",
    "contractor": "SVR Engineering Works",
    "month": "Jun 2026",
    "type": "Arrear",
    "amount": "+1,240",
    "reason": "Wage revision w.e.f. Apr 2026"
  },
  {
    "code": "EMP-24518",
    "name": "N. Ravi Teja",
    "contractor": "Coastal Infra Services",
    "month": "Jun 2026",
    "type": "Deduction",
    "amount": "-600",
    "reason": "Canteen advance recovery"
  },
  {
    "code": "EMP-24390",
    "name": "D. Krishna Murthy",
    "contractor": "Godavari Mech Pvt Ltd",
    "month": "May 2026",
    "type": "Arrear",
    "amount": "+890",
    "reason": "OT recalculation"
  },
  {
    "code": "EMP-24211",
    "name": "CH. Durga Prasad",
    "contractor": "Sai Teja Enterprises",
    "month": "May 2026",
    "type": "Deduction",
    "amount": "-450",
    "reason": "PPE issue recovery"
  },
  {
    "code": "EMP-23871",
    "name": "T. Nagaraju",
    "contractor": "SVR Engineering Works",
    "month": "Apr 2026",
    "type": "Arrear",
    "amount": "+1,020",
    "reason": "Attendance correction"
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
