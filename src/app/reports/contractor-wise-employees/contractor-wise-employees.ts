import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-contractor-wise-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contractor-wise-employees.html',
  styleUrl: './contractor-wise-employees.scss'
})
export class ContractorWiseEmployees {
  title = 'Contractor wise Employees';

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
    key: "designation",
    label: "Designation"
  },
  {
    key: "workArea",
    label: "Work Area"
  },
  {
    key: "passExpiry",
    label: "Pass Expiry"
  },
  {
    key: "status",
    label: "Status"
  }
];

  rows: Row[] = [
  {
    "contractor": "SVR Engineering Works",
    "code": "EMP-24817",
    "name": "K. Ramesh Naidu",
    "designation": "Fitter",
    "workArea": "Boiler Maintenance",
    "passExpiry": "08 Jan 2027",
    "status": "Active"
  },
  {
    "contractor": "SVR Engineering Works",
    "code": "EMP-24813",
    "name": "S. Anil Kumar",
    "designation": "Electrician",
    "workArea": "Switch Yard",
    "passExpiry": "30 Jun 2027",
    "status": "Active"
  },
  {
    "contractor": "SVR Engineering Works",
    "code": "EMP-23755",
    "name": "R. Appala Raju",
    "designation": "Welder",
    "workArea": "Boiler Maintenance",
    "passExpiry": "19 Jul 2026",
    "status": "Expiring"
  },
  {
    "contractor": "Coastal Infra Services",
    "code": "EMP-24816",
    "name": "P. Suresh Kumar",
    "designation": "Rigger",
    "workArea": "Coal Handling Plant",
    "passExpiry": "21 Jul 2026",
    "status": "Expiring"
  },
  {
    "contractor": "Coastal Infra Services",
    "code": "EMP-24518",
    "name": "N. Ravi Teja",
    "designation": "Operator",
    "workArea": "Coal Handling Plant",
    "passExpiry": "12 Oct 2026",
    "status": "Active"
  },
  {
    "contractor": "Godavari Mech Pvt Ltd",
    "code": "EMP-24815",
    "name": "M. Lakshmi Devi",
    "designation": "Helper",
    "workArea": "Ash Handling",
    "passExpiry": "02 Dec 2026",
    "status": "Active"
  },
  {
    "contractor": "Godavari Mech Pvt Ltd",
    "code": "EMP-24390",
    "name": "D. Krishna Murthy",
    "designation": "Supervisor",
    "workArea": "Boiler Maintenance",
    "passExpiry": "27 Jul 2026",
    "status": "Expiring"
  },
  {
    "contractor": "Sai Teja Enterprises",
    "code": "EMP-24814",
    "name": "B. Venkata Rao",
    "designation": "Welder",
    "workArea": "Turbine Section",
    "passExpiry": "15 Jul 2026",
    "status": "Expiring"
  },
  {
    "contractor": "Sai Teja Enterprises",
    "code": "EMP-24211",
    "name": "CH. Durga Prasad",
    "designation": "Mason",
    "workArea": "Civil Works",
    "passExpiry": "22 Sep 2026",
    "status": "Active"
  },
  {
    "contractor": "Vizag Power Solutions",
    "code": "EMP-24812",
    "name": "G. Padma Priya",
    "designation": "Operator",
    "workArea": "Water Treatment",
    "passExpiry": "11 May 2027",
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
