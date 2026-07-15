import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportCsv, printTable, pillClass } from '../../shared/table-utils';

interface Row { [key: string]: string; }

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-information.html',
  styleUrl: './personal-information.scss'
})
export class PersonalInformation {
  title = 'Employee Personal Information';

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
    key: "father",
    label: "Father/Spouse"
  },
  {
    key: "birth",
    label: "Birth Date"
  },
  {
    key: "sex",
    label: "Sex"
  },
  {
    key: "village",
    label: "Village"
  },
  {
    key: "idProof",
    label: "ID Proof"
  },
  {
    key: "category",
    label: "Category"
  }
];

  rows: Row[] = [
  {
    "code": "EMP-24817",
    "name": "K. Ramesh Naidu",
    "father": "K. Appa Rao",
    "birth": "12 Apr 1991",
    "sex": "Male",
    "village": "Kalavalasa",
    "idProof": "Aadhaar",
    "category": "Skilled"
  },
  {
    "code": "EMP-24816",
    "name": "P. Suresh Kumar",
    "father": "P. Satyam",
    "birth": "03 Sep 1988",
    "sex": "Male",
    "village": "Devada",
    "idProof": "Aadhaar",
    "category": "Semi-Skilled"
  },
  {
    "code": "EMP-24815",
    "name": "M. Lakshmi Devi",
    "father": "M. Ramulu",
    "birth": "27 Jan 1995",
    "sex": "Female",
    "village": "Tagarapuvalasa",
    "idProof": "Voter ID",
    "category": "Unskilled"
  },
  {
    "code": "EMP-24814",
    "name": "B. Venkata Rao",
    "father": "B. Kondaiah",
    "birth": "19 Jun 1985",
    "sex": "Male",
    "village": "Chittivalasa",
    "idProof": "Aadhaar",
    "category": "Skilled"
  },
  {
    "code": "EMP-24813",
    "name": "S. Anil Kumar",
    "father": "S. Prasad",
    "birth": "08 Dec 1992",
    "sex": "Male",
    "village": "Annavaram",
    "idProof": "Driving License",
    "category": "Highly Skilled"
  },
  {
    "code": "EMP-24812",
    "name": "G. Padma Priya",
    "father": "G. Ravi (Spouse)",
    "birth": "15 Aug 1996",
    "sex": "Female",
    "village": "Gudilova",
    "idProof": "Aadhaar",
    "category": "Semi-Skilled"
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
