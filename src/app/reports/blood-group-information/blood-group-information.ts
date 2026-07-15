import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-blood-group-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blood-group-information.html',
  styleUrl: './blood-group-information.scss'
})
export class BloodGroupInformation {
  title = 'Employee Blood Group Information';

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
    key: "bloodGroup",
    label: "Blood Group"
  },
  {
    key: "mobile",
    label: "Mobile"
  },
  {
    key: "workArea",
    label: "Work Area"
  }
];

  rows: Row[] = [
  {
    "code": "EMP-24817",
    "name": "K. Ramesh Naidu",
    "contractor": "SVR Engineering Works",
    "bloodGroup": "B+",
    "mobile": "98481 22014",
    "workArea": "Boiler Maintenance"
  },
  {
    "code": "EMP-24816",
    "name": "P. Suresh Kumar",
    "contractor": "Coastal Infra Services",
    "bloodGroup": "O+",
    "mobile": "96521 88710",
    "workArea": "Coal Handling Plant"
  },
  {
    "code": "EMP-24815",
    "name": "M. Lakshmi Devi",
    "contractor": "Godavari Mech Pvt Ltd",
    "bloodGroup": "A+",
    "mobile": "90104 55621",
    "workArea": "Ash Handling"
  },
  {
    "code": "EMP-24814",
    "name": "B. Venkata Rao",
    "contractor": "Sai Teja Enterprises",
    "bloodGroup": "AB+",
    "mobile": "97015 33240",
    "workArea": "Turbine Section"
  },
  {
    "code": "EMP-24813",
    "name": "S. Anil Kumar",
    "contractor": "SVR Engineering Works",
    "bloodGroup": "O-",
    "mobile": "93985 10457",
    "workArea": "Switch Yard"
  },
  {
    "code": "EMP-24812",
    "name": "G. Padma Priya",
    "contractor": "Vizag Power Solutions",
    "bloodGroup": "B-",
    "mobile": "91829 66103",
    "workArea": "Water Treatment"
  },
  {
    "code": "EMP-24390",
    "name": "D. Krishna Murthy",
    "contractor": "Godavari Mech Pvt Ltd",
    "bloodGroup": "A-",
    "mobile": "98668 74392",
    "workArea": "Boiler Maintenance"
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
