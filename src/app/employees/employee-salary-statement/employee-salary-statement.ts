import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-employee-salary-statement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-salary-statement.html',
  styleUrl: './employee-salary-statement.scss'
})
export class EmployeeSalaryStatement {
  title = 'Employee Salary Statement';

  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises', 'Vizag Power Solutions'];
  selContractor = 'All Contractors';
  searchTerm = '';

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
    key: "month",
    label: "Month"
  },
  {
    key: "days",
    label: "Days"
  },
  {
    key: "net",
    label: "Net Pay (₹)"
  },
  {
    key: "status",
    label: "Status"
  }
];
  popupFields = [
  {
    key: "mode",
    label: "Payment Mode",
    type: "select",
    options: [
      "Bank Transfer",
      "Cheque",
      "Cash"
    ]
  },
  {
    key: "refNo",
    label: "Reference No.",
    type: "text"
  }
];

  rows: Row[] = [
  {
    "code": "EMP-24817",
    "name": "K. Ramesh Naidu",
    "contractor": "SVR Engineering Works",
    "month": "Jun 2026",
    "days": "26",
    "net": "19,290",
    "status": "Pending"
  },
  {
    "code": "EMP-24813",
    "name": "S. Anil Kumar",
    "contractor": "SVR Engineering Works",
    "month": "Jun 2026",
    "days": "25",
    "net": "18,245",
    "status": "Paid"
  },
  {
    "code": "EMP-24816",
    "name": "P. Suresh Kumar",
    "contractor": "Coastal Infra Services",
    "month": "Jun 2026",
    "days": "24",
    "net": "16,527",
    "status": "Pending"
  },
  {
    "code": "EMP-24815",
    "name": "M. Lakshmi Devi",
    "contractor": "Godavari Mech Pvt Ltd",
    "month": "Jun 2026",
    "days": "26",
    "net": "14,555",
    "status": "Paid"
  },
  {
    "code": "EMP-24814",
    "name": "B. Venkata Rao",
    "contractor": "Sai Teja Enterprises",
    "month": "Jun 2026",
    "days": "23",
    "net": "17,010",
    "status": "Pending"
  },
  {
    "code": "EMP-24812",
    "name": "G. Padma Priya",
    "contractor": "Vizag Power Solutions",
    "month": "Jun 2026",
    "days": "25",
    "net": "15,795",
    "status": "Paid"
  },
  {
    "code": "EMP-24390",
    "name": "D. Krishna Murthy",
    "contractor": "Godavari Mech Pvt Ltd",
    "month": "Jun 2026",
    "days": "26",
    "net": "21,140",
    "status": "Pending"
  }
];

  page = 1;
  pageSize = 5;

  get filtered(): Row[] {
    let list = this.rows;
    if (this.selContractor !== 'All Contractors') list = list.filter(r => r['contractor'] === this.selContractor);
    const t = this.searchTerm.trim().toLowerCase();
    if (t) list = list.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(t)));
    return list;
  }
  get totalPages(): number { return Math.max(1, Math.ceil(this.filtered.length / this.pageSize)); }
  get pages(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }
  get paged(): Row[] {
    const p = Math.min(this.page, this.totalPages);
    return this.filtered.slice((p - 1) * this.pageSize, p * this.pageSize);
  }
  onSearch() { this.page = 1; }
  setPage(p: number) { if (p >= 1 && p <= this.totalPages) this.page = p; }

  pill = pillClass;
  isDisabled(r: Row): boolean { return r['status'] === 'Paid'; }

  // ── action popup ──
  showModal = false;
  target: Row | null = null;
  form: Row = {};

  openAction(row: Row) {
    this.target = row;
    this.form = {};
    for (const f of this.popupFields) this.form[f.key] = f.type === 'select' ? (f.options?.[0] ?? '') : '';
    this.showModal = true;
  }
  closeModal() { this.showModal = false; this.target = null; }

  confirmAction() {
    if (!this.target) return;
    this.target['status'] = 'Paid';
    this.showModal = false;
    this.target = null;
  }

  private matrix(): string[][] {
    return this.filtered.map(r => this.columns.map(c => r[c.key] ?? ''));
  }
  doExport() { exportCsv(this.title, this.columns.map(c => c.label), this.matrix()); }
  doPrint() { printTable(this.title, this.columns.map(c => c.label), this.matrix()); }
}
