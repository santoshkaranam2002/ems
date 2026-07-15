import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-contractors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contractors.html',
  styleUrl: './contractors.scss'
})
export class Contractors {
  title = 'Contractors';

  columns = [
  {
    key: "name",
    label: "Contractor"
  },
  {
    key: "licence",
    label: "Licence No."
  },
  {
    key: "employees",
    label: "Employees"
  },
  {
    key: "validTill",
    label: "Valid Till"
  },
  {
    key: "status",
    label: "Status"
  }
];

  fields = [
  {
    key: "name",
    label: "Contractor Name",
    type: "text"
  },
  {
    key: "licence",
    label: "Licence No.",
    type: "text"
  },
  {
    key: "employees",
    label: "Employees",
    type: "text"
  },
  {
    key: "validTill",
    label: "Licence Valid Till",
    type: "text"
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      "Active",
      "Expiring",
      "Inactive"
    ]
  }
];

  rows: Row[] = [
  {
    "name": "SVR Engineering Works",
    "licence": "CLA/VSP/2024/118",
    "employees": "486",
    "validTill": "31 Mar 2027",
    "status": "Active"
  },
  {
    "name": "Coastal Infra Services",
    "licence": "CLA/VSP/2023/094",
    "employees": "402",
    "validTill": "30 Sep 2026",
    "status": "Expiring"
  },
  {
    "name": "Godavari Mech Pvt Ltd",
    "licence": "CLA/VSP/2025/031",
    "employees": "331",
    "validTill": "14 Feb 2028",
    "status": "Active"
  },
  {
    "name": "Sai Teja Enterprises",
    "licence": "CLA/VSP/2024/207",
    "employees": "264",
    "validTill": "22 Nov 2026",
    "status": "Active"
  },
  {
    "name": "Vizag Power Solutions",
    "licence": "CLA/VSP/2022/145",
    "employees": "197",
    "validTill": "05 Aug 2026",
    "status": "Expiring"
  },
  {
    "name": "Sri Lakshmi Fabricators",
    "licence": "CLA/VSP/2023/162",
    "employees": "156",
    "validTill": "19 Dec 2026",
    "status": "Active"
  },
  {
    "name": "Bharat Industrial Services",
    "licence": "CLA/VSP/2024/088",
    "employees": "143",
    "validTill": "02 Apr 2027",
    "status": "Active"
  },
  {
    "name": "Annapurna Manpower Agency",
    "licence": "CLA/VSP/2021/240",
    "employees": "118",
    "validTill": "11 Jul 2026",
    "status": "Expiring"
  },
  {
    "name": "Gayatri Engineering Co.",
    "licence": "CLA/VSP/2025/012",
    "employees": "96",
    "validTill": "28 Jan 2028",
    "status": "Active"
  },
  {
    "name": "Nagarjuna Constructions",
    "licence": "CLA/VSP/2022/301",
    "employees": "71",
    "validTill": "15 Mar 2026",
    "status": "Inactive"
  }
];

  // ── search / pagination ──
  searchTerm = '';
  page = 1;
  pageSize = 5;

  get filtered(): Row[] {
    const t = this.searchTerm.trim().toLowerCase();
    if (!t) return this.rows;
    return this.rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(t)));
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

  // ── add / edit popup ──
  showModal = false;
  editIndex = -1;
  form: Row = {};

  openAdd() {
    this.editIndex = -1;
    this.form = {};
    for (const f of this.fields) this.form[f.key] = f.type === 'select' ? (f.options?.[0] ?? '') : '';
    this.showModal = true;
  }

  openEdit(row: Row) {
    this.editIndex = this.rows.indexOf(row);
    this.form = { ...row };
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  save() {
    const first = this.fields[0].key;
    if (!String(this.form[first] ?? '').trim()) return;
    if (this.editIndex >= 0) {
      this.rows[this.editIndex] = { ...this.form };
    } else {
      this.rows = [{ ...this.form }, ...this.rows];
      this.page = 1;
    }
    this.showModal = false;
  }

  // ── print / export ──
  private matrix(): string[][] {
    return this.filtered.map(r => this.columns.map(c => r[c.key] ?? ''));
  }
  doExport() { exportCsv(this.title, this.columns.map(c => c.label), this.matrix()); }
  doPrint() { printTable(this.title, this.columns.map(c => c.label), this.matrix()); }
}
