import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-employee-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-information.html',
  styleUrl: './employee-information.scss'
})
export class EmployeeInformation {
  title = 'Employee Information';

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
    label: "Code"
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
    key: "workArea",
    label: "Work Area"
  },
  {
    key: "designation",
    label: "Designation"
  },
  {
    key: "passIssue",
    label: "Pass Issue"
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
    "code": "EMP-24817",
    "name": "K. Ramesh Naidu",
    "contractor": "SVR Engineering Works",
    "workArea": "Boiler Maintenance",
    "designation": "Fitter",
    "passIssue": "08 Jan 2026",
    "passExpiry": "08 Jan 2027",
    "status": "Active"
  },
  {
    "code": "EMP-24816",
    "name": "P. Suresh Kumar",
    "contractor": "Coastal Infra Services",
    "workArea": "Coal Handling Plant",
    "designation": "Rigger",
    "passIssue": "21 Jul 2025",
    "passExpiry": "21 Jul 2026",
    "status": "Expiring"
  },
  {
    "code": "EMP-24815",
    "name": "M. Lakshmi Devi",
    "contractor": "Godavari Mech Pvt Ltd",
    "workArea": "Ash Handling",
    "designation": "Helper",
    "passIssue": "02 Dec 2025",
    "passExpiry": "02 Dec 2026",
    "status": "Active"
  },
  {
    "code": "EMP-24814",
    "name": "B. Venkata Rao",
    "contractor": "Sai Teja Enterprises",
    "workArea": "Turbine Section",
    "designation": "Welder",
    "passIssue": "15 Jul 2025",
    "passExpiry": "15 Jul 2026",
    "status": "Expiring"
  },
  {
    "code": "EMP-24813",
    "name": "S. Anil Kumar",
    "contractor": "SVR Engineering Works",
    "workArea": "Switch Yard",
    "designation": "Electrician",
    "passIssue": "30 Jun 2026",
    "passExpiry": "30 Jun 2027",
    "status": "Active"
  },
  {
    "code": "EMP-24812",
    "name": "G. Padma Priya",
    "contractor": "Vizag Power Solutions",
    "workArea": "Water Treatment",
    "designation": "Operator",
    "passIssue": "11 May 2026",
    "passExpiry": "11 May 2027",
    "status": "Active"
  },
  {
    "code": "EMP-24390",
    "name": "D. Krishna Murthy",
    "contractor": "Godavari Mech Pvt Ltd",
    "workArea": "Boiler Maintenance",
    "designation": "Supervisor",
    "passIssue": "27 Jul 2025",
    "passExpiry": "27 Jul 2026",
    "status": "Expiring"
  },
  {
    "code": "EMP-23871",
    "name": "T. Nagaraju",
    "contractor": "SVR Engineering Works",
    "workArea": "Coal Handling Plant",
    "designation": "Khalasi",
    "passIssue": "01 Aug 2025",
    "passExpiry": "01 Aug 2026",
    "status": "Active"
  },
  {
    "code": "EMP-23640",
    "name": "V. Srinivasa Rao",
    "contractor": "Vizag Power Solutions",
    "workArea": "Ash Handling",
    "designation": "Fitter",
    "passIssue": "09 Feb 2025",
    "passExpiry": "09 Feb 2026",
    "status": "Expired"
  },
  {
    "code": "EMP-23112",
    "name": "G. Mahesh",
    "contractor": "Coastal Infra Services",
    "workArea": "Turbine Section",
    "designation": "Helper",
    "passIssue": "14 Mar 2025",
    "passExpiry": "14 Mar 2026",
    "status": "Cancelled"
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
