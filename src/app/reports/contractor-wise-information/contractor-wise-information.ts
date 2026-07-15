import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-contractor-wise-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contractor-wise-information.html',
  styleUrl: './contractor-wise-information.scss'
})
export class ContractorWiseInformation {
  title = 'Contractor Wise Information';

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
    key: "licence",
    label: "Licence No."
  },
  {
    key: "validTill",
    label: "Licence Valid Till"
  },
  {
    key: "employees",
    label: "Employees"
  },
  {
    key: "workOrders",
    label: "Work Orders"
  },
  {
    key: "compliance",
    label: "Compliance %"
  },
  {
    key: "status",
    label: "Status"
  }
];

  rows: Row[] = [
  {
    "contractor": "SVR Engineering Works",
    "licence": "CLA/VSP/2024/118",
    "validTill": "31 Mar 2027",
    "employees": "486",
    "workOrders": "14",
    "compliance": "97%",
    "status": "Active"
  },
  {
    "contractor": "Coastal Infra Services",
    "licence": "CLA/VSP/2023/094",
    "validTill": "30 Sep 2026",
    "employees": "402",
    "workOrders": "11",
    "compliance": "93%",
    "status": "Expiring"
  },
  {
    "contractor": "Godavari Mech Pvt Ltd",
    "licence": "CLA/VSP/2025/031",
    "validTill": "14 Feb 2028",
    "employees": "331",
    "workOrders": "9",
    "compliance": "91%",
    "status": "Active"
  },
  {
    "contractor": "Sai Teja Enterprises",
    "licence": "CLA/VSP/2024/207",
    "validTill": "22 Nov 2026",
    "employees": "264",
    "workOrders": "7",
    "compliance": "88%",
    "status": "Active"
  },
  {
    "contractor": "Vizag Power Solutions",
    "licence": "CLA/VSP/2022/145",
    "validTill": "05 Aug 2026",
    "employees": "197",
    "workOrders": "6",
    "compliance": "84%",
    "status": "Expiring"
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
