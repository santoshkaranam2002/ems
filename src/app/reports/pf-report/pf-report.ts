import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-pf-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pf-report.html',
  styleUrl: './pf-report.scss'
})
export class PfReport {
  title = 'PF Report';

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
    key: "month",
    label: "Month"
  },
  {
    key: "wages",
    label: "Wages (₹)"
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
    key: "total",
    label: "Total (₹)"
  }
];

  rows: Row[] = [
  {
    "pf": "AP/VSP/48213/104",
    "name": "K. Ramesh Naidu",
    "contractor": "SVR Engineering Works",
    "month": "Jun 2026",
    "wages": "19,290",
    "ee": "2,315",
    "er": "2,315",
    "total": "4,630"
  },
  {
    "pf": "AP/VSP/48213/167",
    "name": "S. Anil Kumar",
    "contractor": "SVR Engineering Works",
    "month": "Jun 2026",
    "wages": "18,245",
    "ee": "2,189",
    "er": "2,189",
    "total": "4,378"
  },
  {
    "pf": "AP/VSP/50122/089",
    "name": "P. Suresh Kumar",
    "contractor": "Coastal Infra Services",
    "month": "Jun 2026",
    "wages": "16,527",
    "ee": "1,983",
    "er": "1,983",
    "total": "3,966"
  },
  {
    "pf": "AP/VSP/51240/045",
    "name": "M. Lakshmi Devi",
    "contractor": "Godavari Mech Pvt Ltd",
    "month": "Jun 2026",
    "wages": "14,555",
    "ee": "1,747",
    "er": "1,747",
    "total": "3,494"
  },
  {
    "pf": "AP/VSP/52310/031",
    "name": "B. Venkata Rao",
    "contractor": "Sai Teja Enterprises",
    "month": "Jun 2026",
    "wages": "17,010",
    "ee": "2,041",
    "er": "2,041",
    "total": "4,082"
  },
  {
    "pf": "AP/VSP/53100/078",
    "name": "G. Padma Priya",
    "contractor": "Vizag Power Solutions",
    "month": "Jun 2026",
    "wages": "15,795",
    "ee": "1,895",
    "er": "1,895",
    "total": "3,790"
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
