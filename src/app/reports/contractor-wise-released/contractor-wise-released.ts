import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-contractor-wise-released',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contractor-wise-released.html',
  styleUrl: './contractor-wise-released.scss'
})
export class ContractorWiseReleased {
  title = 'Contractor wise Released Employees';

  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises', 'Vizag Power Solutions'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];

  selContractor = 'All Contractors';
  selLocation   = 'All Locations';
  fromDate = '';
  toDate   = '';
  generatedAt: Date | null = null;

  columns = [
  {
    key: "contractor",
    label: "Contractor"
  },
  {
    key: "code",
    label: "Emp Code"
  },
  {
    key: "name",
    label: "Employee"
  },
  {
    key: "cancelDate",
    label: "Release Date"
  },
  {
    key: "reason",
    label: "Reason"
  },
  {
    key: "status",
    label: "Status"
  }
];

  rows: Row[] = [
  {
    "contractor": "Coastal Infra Services",
    "code": "EMP-23112",
    "name": "G. Mahesh",
    "cancelDate": "14 Mar 2026",
    "reason": "Left organisation",
    "status": "Released"
  },
  {
    "contractor": "Vizag Power Solutions",
    "code": "EMP-23640",
    "name": "V. Srinivasa Rao",
    "cancelDate": "09 Feb 2026",
    "reason": "Pass expired — not renewed",
    "status": "Released"
  },
  {
    "contractor": "SVR Engineering Works",
    "code": "EMP-22981",
    "name": "S. Ganesh",
    "cancelDate": "28 Jan 2026",
    "reason": "Contract completed",
    "status": "Released"
  },
  {
    "contractor": "Godavari Mech Pvt Ltd",
    "code": "EMP-22874",
    "name": "B. Ramana",
    "cancelDate": "12 Dec 2025",
    "reason": "Medical grounds",
    "status": "Released"
  },
  {
    "contractor": "Sai Teja Enterprises",
    "code": "EMP-22610",
    "name": "M. Kondala Rao",
    "cancelDate": "30 Nov 2025",
    "reason": "Disciplinary",
    "status": "Released"
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
