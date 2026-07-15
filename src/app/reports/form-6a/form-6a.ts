import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-form-6a',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-6a.html',
  styleUrl: './form-6a.scss'
})
export class Form6A {
  title = 'Form 6A';

  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises', 'Vizag Power Solutions'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];

  selContractor = 'All Contractors';
  selLocation   = 'All Locations';
  fromDate = '';
  toDate   = '';
  generatedAt: Date | null = null;

  columns = [
  {
    key: "pf",
    label: "PF No."
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
    key: "wages",
    label: "Annual Wages (₹)"
  },
  {
    key: "ee",
    label: "EE Share (₹)"
  },
  {
    key: "er",
    label: "ER Share (₹)"
  },
  {
    key: "period",
    label: "Period"
  }
];

  rows: Row[] = [
  {
    "pf": "AP/VSP/48213/104",
    "name": "K. Ramesh Naidu",
    "contractor": "SVR Engineering Works",
    "wages": "2,31,480",
    "ee": "27,778",
    "er": "27,778",
    "period": "2025-26"
  },
  {
    "pf": "AP/VSP/48213/167",
    "name": "S. Anil Kumar",
    "contractor": "SVR Engineering Works",
    "wages": "2,18,940",
    "ee": "26,273",
    "er": "26,273",
    "period": "2025-26"
  },
  {
    "pf": "AP/VSP/50122/089",
    "name": "P. Suresh Kumar",
    "contractor": "Coastal Infra Services",
    "wages": "1,98,320",
    "ee": "23,798",
    "er": "23,798",
    "period": "2025-26"
  },
  {
    "pf": "AP/VSP/51240/045",
    "name": "M. Lakshmi Devi",
    "contractor": "Godavari Mech Pvt Ltd",
    "wages": "1,74,660",
    "ee": "20,959",
    "er": "20,959",
    "period": "2025-26"
  },
  {
    "pf": "AP/VSP/52310/031",
    "name": "B. Venkata Rao",
    "contractor": "Sai Teja Enterprises",
    "wages": "2,04,120",
    "ee": "24,494",
    "er": "24,494",
    "period": "2025-26"
  },
  {
    "pf": "AP/VSP/53100/078",
    "name": "G. Padma Priya",
    "contractor": "Vizag Power Solutions",
    "wages": "1,89,540",
    "ee": "22,745",
    "er": "22,745",
    "period": "2025-26"
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
