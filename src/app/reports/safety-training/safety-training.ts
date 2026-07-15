import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-safety-training',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './safety-training.html',
  styleUrl: './safety-training.scss'
})
export class SafetyTraining {
  title = 'Employee Safety Training';

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
    key: "trainingId",
    label: "Training ID"
  },
  {
    key: "trainingDate",
    label: "Training Date"
  },
  {
    key: "status",
    label: "Status"
  }
];

  rows: Row[] = [
  {
    "code": "EMP-24817",
    "name": "K. Ramesh Naidu",
    "contractor": "SVR Engineering Works",
    "trainingId": "ST-2026-104",
    "trainingDate": "05 Jan 2026",
    "status": "Completed"
  },
  {
    "code": "EMP-24813",
    "name": "S. Anil Kumar",
    "contractor": "SVR Engineering Works",
    "trainingId": "ST-2026-131",
    "trainingDate": "22 Jun 2026",
    "status": "Completed"
  },
  {
    "code": "EMP-24816",
    "name": "P. Suresh Kumar",
    "contractor": "Coastal Infra Services",
    "trainingId": "ST-2026-089",
    "trainingDate": "18 Jul 2026",
    "status": "Scheduled"
  },
  {
    "code": "EMP-24815",
    "name": "M. Lakshmi Devi",
    "contractor": "Godavari Mech Pvt Ltd",
    "trainingId": "ST-2025-412",
    "trainingDate": "28 Nov 2025",
    "status": "Completed"
  },
  {
    "code": "EMP-24814",
    "name": "B. Venkata Rao",
    "contractor": "Sai Teja Enterprises",
    "trainingId": "—",
    "trainingDate": "—",
    "status": "Not Done"
  },
  {
    "code": "EMP-24812",
    "name": "G. Padma Priya",
    "contractor": "Vizag Power Solutions",
    "trainingId": "ST-2026-097",
    "trainingDate": "08 May 2026",
    "status": "Completed"
  },
  {
    "code": "EMP-23871",
    "name": "T. Nagaraju",
    "contractor": "SVR Engineering Works",
    "trainingId": "ST-2026-140",
    "trainingDate": "25 Jul 2026",
    "status": "Scheduled"
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
