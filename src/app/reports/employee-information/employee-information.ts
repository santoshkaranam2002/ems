import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EmployeeRow {
  code: string;
  name: string;
  contractor: string;
  workArea: string;
  designation: string;
  passIssue: string;
  passExpiry: string;
  status: 'Active' | 'Expiring' | 'Expired' | 'Cancelled';
}

@Component({
  selector: 'app-employee-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-information.html',
  styleUrl: './employee-information.scss'
})
export class EmployeeInformation {
  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];

  rows: EmployeeRow[] = [
    { code: 'EMP-24817', name: 'K. Ramesh Naidu',    contractor: 'SVR Engineering Works',  workArea: 'Boiler Maintenance',  designation: 'Fitter',        passIssue: '08 Jan 2026', passExpiry: '08 Jan 2027', status: 'Active' },
    { code: 'EMP-24816', name: 'P. Suresh Kumar',    contractor: 'Coastal Infra Services', workArea: 'Coal Handling Plant', designation: 'Rigger',        passIssue: '21 Jul 2025', passExpiry: '21 Jul 2026', status: 'Expiring' },
    { code: 'EMP-24815', name: 'M. Lakshmi Devi',    contractor: 'Godavari Mech Pvt Ltd',  workArea: 'Ash Handling',        designation: 'Helper',        passIssue: '02 Dec 2025', passExpiry: '02 Dec 2026', status: 'Active' },
    { code: 'EMP-24814', name: 'B. Venkata Rao',     contractor: 'Sai Teja Enterprises',   workArea: 'Turbine Section',     designation: 'Welder',        passIssue: '15 Jul 2025', passExpiry: '15 Jul 2026', status: 'Expiring' },
    { code: 'EMP-24813', name: 'S. Anil Kumar',      contractor: 'SVR Engineering Works',  workArea: 'Switch Yard',         designation: 'Electrician',   passIssue: '30 Jun 2026', passExpiry: '30 Jun 2027', status: 'Active' },
    { code: 'EMP-24812', name: 'G. Padma Priya',     contractor: 'Vizag Power Solutions',  workArea: 'Water Treatment',     designation: 'Operator',      passIssue: '11 May 2026', passExpiry: '11 May 2027', status: 'Active' },
    { code: 'EMP-24390', name: 'D. Krishna Murthy',  contractor: 'Godavari Mech Pvt Ltd',  workArea: 'Boiler Maintenance',  designation: 'Supervisor',    passIssue: '27 Jul 2025', passExpiry: '27 Jul 2026', status: 'Expiring' },
    { code: 'EMP-23871', name: 'T. Nagaraju',        contractor: 'SVR Engineering Works',  workArea: 'Coal Handling Plant', designation: 'Khalasi',       passIssue: '01 Aug 2025', passExpiry: '01 Aug 2026', status: 'Active' },
    { code: 'EMP-23640', name: 'V. Srinivasa Rao',   contractor: 'Vizag Power Solutions',  workArea: 'Ash Handling',        designation: 'Fitter',        passIssue: '09 Feb 2025', passExpiry: '09 Feb 2026', status: 'Expired' },
    { code: 'EMP-23112', name: 'G. Mahesh',          contractor: 'Coastal Infra Services', workArea: 'Turbine Section',     designation: 'Helper',        passIssue: '14 Mar 2025', passExpiry: '14 Mar 2026', status: 'Cancelled' },
  ];

  statusClass(status: string): string {
    switch (status) {
      case 'Active':    return 'pill-green';
      case 'Expiring':  return 'pill-orange';
      case 'Expired':   return 'pill-red';
      case 'Cancelled': return 'pill-gray';
      default:          return 'pill-gray';
    }
  }
}