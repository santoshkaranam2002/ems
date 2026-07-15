import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-employee-from-main-village',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-from-main-village.html',
  styleUrl: './employee-from-main-village.scss'
})
export class EmployeeFromMainVillage {
  title = 'Employee From Main Village';

  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises', 'Vizag Power Solutions'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];

  selContractor = 'All Contractors';
  selLocation   = 'All Locations';
  fromDate = '';
  toDate   = '';
  generatedAt: Date | null = null;

  columns = [
  {
    key: "village",
    label: "Village"
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
    key: "contractor",
    label: "Contractor"
  },
  {
    key: "designation",
    label: "Designation"
  },
  {
    key: "status",
    label: "Status"
  }
];

  rows: Row[] = [
  {
    "village": "Kalavalasa",
    "code": "EMP-24817",
    "name": "K. Ramesh Naidu",
    "contractor": "SVR Engineering Works",
    "designation": "Fitter",
    "status": "Active"
  },
  {
    "village": "Kalavalasa",
    "code": "EMP-24102",
    "name": "A. Simhachalam",
    "contractor": "Godavari Mech Pvt Ltd",
    "designation": "Fitter",
    "status": "Active"
  },
  {
    "village": "Kalavalasa",
    "code": "EMP-23902",
    "name": "K. Simhadri",
    "contractor": "Vizag Power Solutions",
    "designation": "Helper",
    "status": "Active"
  },
  {
    "village": "Kalavalasa",
    "code": "EMP-23640",
    "name": "V. Srinivasa Rao",
    "contractor": "Vizag Power Solutions",
    "designation": "Fitter",
    "status": "Released"
  },
  {
    "village": "Kalavalasa",
    "code": "EMP-24705",
    "name": "P. Yerraiah",
    "contractor": "Coastal Infra Services",
    "designation": "Khalasi",
    "status": "Active"
  },
  {
    "village": "Kalavalasa",
    "code": "EMP-24688",
    "name": "L. Satyavati",
    "contractor": "Godavari Mech Pvt Ltd",
    "designation": "Helper",
    "status": "Active"
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
