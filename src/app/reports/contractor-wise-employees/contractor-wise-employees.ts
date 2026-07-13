import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CweEmployee {
  code: string;
  name: string;
  designation: string;
  workArea: string;
  passExpiry: string;
  status: 'Active' | 'Expiring' | 'Expired';
}

interface ContractorGroup {
  name: string;
  licence: string;
  total: number;
  active: number;
  employees: CweEmployee[];
}

@Component({
  selector: 'app-contractor-wise-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contractor-wise-employees.html',
  styleUrl: './contractor-wise-employees.scss'
})
export class ContractorWiseEmployees {
  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];

  groups: ContractorGroup[] = [
    {
      name: 'SVR Engineering Works', licence: 'CLA/VSP/2024/118', total: 486, active: 471,
      employees: [
        { code: 'EMP-24817', name: 'K. Ramesh Naidu',  designation: 'Fitter',      workArea: 'Boiler Maintenance',  passExpiry: '08 Jan 2027', status: 'Active' },
        { code: 'EMP-24813', name: 'S. Anil Kumar',    designation: 'Electrician', workArea: 'Switch Yard',         passExpiry: '30 Jun 2027', status: 'Active' },
        { code: 'EMP-23871', name: 'T. Nagaraju',      designation: 'Khalasi',     workArea: 'Coal Handling Plant', passExpiry: '01 Aug 2026', status: 'Active' },
        { code: 'EMP-23755', name: 'R. Appala Raju',   designation: 'Welder',      workArea: 'Boiler Maintenance',  passExpiry: '19 Jul 2026', status: 'Expiring' },
      ]
    },
    {
      name: 'Coastal Infra Services', licence: 'CLA/VSP/2023/094', total: 402, active: 388,
      employees: [
        { code: 'EMP-24816', name: 'P. Suresh Kumar',  designation: 'Rigger',      workArea: 'Coal Handling Plant', passExpiry: '21 Jul 2026', status: 'Expiring' },
        { code: 'EMP-24518', name: 'N. Ravi Teja',     designation: 'Operator',    workArea: 'Coal Handling Plant', passExpiry: '12 Oct 2026', status: 'Active' },
        { code: 'EMP-23112', name: 'G. Mahesh',        designation: 'Helper',      workArea: 'Turbine Section',     passExpiry: '14 Mar 2026', status: 'Expired' },
      ]
    },
    {
      name: 'Godavari Mech Pvt Ltd', licence: 'CLA/VSP/2025/031', total: 331, active: 322,
      employees: [
        { code: 'EMP-24815', name: 'M. Lakshmi Devi',   designation: 'Helper',     workArea: 'Ash Handling',       passExpiry: '02 Dec 2026', status: 'Active' },
        { code: 'EMP-24390', name: 'D. Krishna Murthy', designation: 'Supervisor', workArea: 'Boiler Maintenance', passExpiry: '27 Jul 2026', status: 'Expiring' },
        { code: 'EMP-24102', name: 'A. Simhachalam',    designation: 'Fitter',     workArea: 'Ash Handling',       passExpiry: '05 Nov 2026', status: 'Active' },
      ]
    },
    {
      name: 'Sai Teja Enterprises', licence: 'CLA/VSP/2024/207', total: 264, active: 251,
      employees: [
        { code: 'EMP-24814', name: 'B. Venkata Rao',  designation: 'Welder',   workArea: 'Turbine Section', passExpiry: '15 Jul 2026', status: 'Expiring' },
        { code: 'EMP-24211', name: 'CH. Durga Prasad', designation: 'Mason',   workArea: 'Civil Works',     passExpiry: '22 Sep 2026', status: 'Active' },
      ]
    },
  ];

  get grandTotal(): number {
    return this.groups.reduce((a, g) => a + g.total, 0);
  }

  get grandActive(): number {
    return this.groups.reduce((a, g) => a + g.active, 0);
  }

  statusClass(status: string): string {
    switch (status) {
      case 'Active':   return 'pill-green';
      case 'Expiring': return 'pill-orange';
      case 'Expired':  return 'pill-red';
      default:         return 'pill-gray';
    }
  }
}