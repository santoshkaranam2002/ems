import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-contractor-wise-work-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contractor-wise-work-orders.html',
  styleUrl: './contractor-wise-work-orders.scss'
})
export class ContractorWiseWorkOrders {
  title = 'Contractor Wise Work Orders';

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
    key: "wo",
    label: "Work Order"
  },
  {
    key: "area",
    label: "Work Area"
  },
  {
    key: "validTill",
    label: "Valid Till"
  },
  {
    key: "employees",
    label: "Employees"
  },
  {
    key: "status",
    label: "Status"
  }
];

  rows: Row[] = [
  {
    "contractor": "SVR Engineering Works",
    "wo": "WO/2026/0141",
    "area": "Boiler Maintenance",
    "validTill": "31 Dec 2026",
    "employees": "214",
    "status": "Open"
  },
  {
    "contractor": "SVR Engineering Works",
    "wo": "WO/2026/0076",
    "area": "Civil Works",
    "validTill": "14 Aug 2026",
    "employees": "88",
    "status": "Closing"
  },
  {
    "contractor": "Coastal Infra Services",
    "wo": "WO/2026/0134",
    "area": "Coal Handling Plant",
    "validTill": "30 Sep 2026",
    "employees": "196",
    "status": "Open"
  },
  {
    "contractor": "Godavari Mech Pvt Ltd",
    "wo": "WO/2025/0512",
    "area": "Ash Handling",
    "validTill": "31 Jul 2026",
    "employees": "121",
    "status": "Closing"
  },
  {
    "contractor": "Godavari Mech Pvt Ltd",
    "wo": "WO/2026/0052",
    "area": "Boiler Maintenance",
    "validTill": "09 Nov 2026",
    "employees": "104",
    "status": "Open"
  },
  {
    "contractor": "Sai Teja Enterprises",
    "wo": "WO/2025/0488",
    "area": "Turbine Section",
    "validTill": "15 Mar 2026",
    "employees": "0",
    "status": "Closed"
  },
  {
    "contractor": "Vizag Power Solutions",
    "wo": "WO/2026/0098",
    "area": "Switch Yard",
    "validTill": "20 Oct 2026",
    "employees": "92",
    "status": "Open"
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
