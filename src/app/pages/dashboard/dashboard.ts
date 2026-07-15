import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface KpiItem {
  label: string;
  value: string;
  trend: string;
  up: boolean;
}

interface PassSlice {
  label: string;
  value: number;
  color: string;
}

interface Gauge {
  label: string;
  pct: number;
  tone: string;
  sub: string;
}

interface ActivityItem {
  time: string;
  title: string;
  desc: string;
  tone: 'green' | 'blue' | 'orange' | 'red' | 'gold';
}

interface LeaderRow {
  rank: number;
  name: string;
  employees: number;
  workOrders: number;
  compliance: number;
}

interface RecentEmployee {
  name: string;
  code: string;
  contractor: string;
  passExpiry: string;
  status: 'Active' | 'Expiring' | 'Renewed' | 'Pending';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  today = new Date();

  // ── Command strip KPIs ──
  kpis: KpiItem[] = [
    { label: 'Total Employees', value: '2,847', trend: '+128 this month', up: true },
    { label: 'Active Passes',   value: '2,412', trend: '84.7% coverage',  up: true },
    { label: 'Contractors',     value: '46',    trend: '39 engaged',      up: true },
    { label: 'Passes Expiring', value: '93',    trend: 'next 30 days',    up: false },
  ];

  // ── Donut: pass status ──
  passSlices: PassSlice[] = [
    { label: 'Active',    value: 2412, color: '#16a34a' },
    { label: 'Expiring',  value: 93,   color: '#ea8a0c' },
    { label: 'Expired',   value: 187,  color: '#dc2626' },
    { label: 'Cancelled', value: 155,  color: '#c9bfc3' },
  ];

  get passTotal(): number {
    return this.passSlices.reduce((a, s) => a + s.value, 0);
  }

  get donutGradient(): string {
    const total = this.passTotal;
    let acc = 0;
    const stops = this.passSlices.map(s => {
      const from = (acc / total) * 360;
      acc += s.value;
      const to = (acc / total) * 360;
      return `${s.color} ${from}deg ${to}deg`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }

  slicePct(s: PassSlice): string {
    return ((s.value / this.passTotal) * 100).toFixed(1) + '%';
  }

  // ── Compliance gauges ──
  gauges: Gauge[] = [
    { label: 'Safety Training', pct: 91, tone: '#16a34a', sub: '2,203 of 2,412 trained' },
    { label: 'PF Enrollment',   pct: 96, tone: '#2563eb', sub: '2,733 accounts linked' },
    { label: 'ESIC Coverage',   pct: 88, tone: '#b8862e', sub: '2,505 employees covered' },
  ];

  gaugeStyle(g: Gauge): string {
    return `conic-gradient(${g.tone} ${g.pct * 3.6}deg, #e9e4e2 0deg)`;
  }

  // ── Area chart: registrations Feb–Jul ──
  trendValues = [96, 132, 118, 171, 149, 128];
  trendMonths = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  get trendPoints(): string {
    const max = Math.max(...this.trendValues) * 1.15;
    const stepX = 600 / (this.trendValues.length - 1);
    return this.trendValues
      .map((v, i) => `${i * stepX},${180 - (v / max) * 180}`)
      .join(' ');
  }

  get trendArea(): string {
    return `0,180 ${this.trendPoints} 600,180`;
  }

  trendX(i: number): number {
    return i * (600 / (this.trendValues.length - 1));
  }

  trendY(i: number): number {
    const max = Math.max(...this.trendValues) * 1.15;
    return 180 - (this.trendValues[i] / max) * 180;
  }

  // ── Activity timeline ──
  activities: ActivityItem[] = [
    { time: '09:42', title: 'New registration approved',  desc: 'K. Ramesh Naidu · SVR Engineering Works', tone: 'green' },
    { time: '09:10', title: 'Group pass issued',          desc: '14 members · WO/2026/0141 · Boiler Maint.', tone: 'gold' },
    { time: '08:47', title: 'Pass renewed',               desc: 'S. Anil Kumar · valid till 30 Jun 2027', tone: 'blue' },
    { time: '08:15', title: 'Pass expiring alert',        desc: 'B. Venkata Rao · 4 days remaining', tone: 'orange' },
    { time: 'Yest.', title: 'Salary statement imported',  desc: 'Coastal Infra Services · June 2026', tone: 'blue' },
    { time: 'Yest.', title: 'Pass cancelled',             desc: 'G. Mahesh · left organisation', tone: 'red' },
  ];

  // ── Contractor leaderboard ──
  leaders: LeaderRow[] = [
    { rank: 1, name: 'SVR Engineering Works',  employees: 486, workOrders: 14, compliance: 97 },
    { rank: 2, name: 'Coastal Infra Services', employees: 402, workOrders: 11, compliance: 93 },
    { rank: 3, name: 'Godavari Mech Pvt Ltd',  employees: 331, workOrders: 9,  compliance: 91 },
    { rank: 4, name: 'Sai Teja Enterprises',   employees: 264, workOrders: 7,  compliance: 88 },
    { rank: 5, name: 'Vizag Power Solutions',  employees: 197, workOrders: 6,  compliance: 84 },
  ];

  // ── Recent registrations ──
  recentEmployees: RecentEmployee[] = [
    { name: 'K. Ramesh Naidu', code: 'EMP-24817', contractor: 'SVR Engineering Works',  passExpiry: '08 Jan 2027', status: 'Active' },
    { name: 'P. Suresh Kumar', code: 'EMP-24816', contractor: 'Coastal Infra Services', passExpiry: '21 Jul 2026', status: 'Expiring' },
    { name: 'M. Lakshmi Devi', code: 'EMP-24815', contractor: 'Godavari Mech Pvt Ltd',  passExpiry: '02 Dec 2026', status: 'Active' },
    { name: 'B. Venkata Rao',  code: 'EMP-24814', contractor: 'Sai Teja Enterprises',   passExpiry: '15 Jul 2026', status: 'Expiring' },
    { name: 'G. Padma Priya',  code: 'EMP-24812', contractor: 'Vizag Power Solutions',  passExpiry: '—',           status: 'Pending' },
  ];

  statusClass(status: string): string {
    switch (status) {
      case 'Active':   return 'pill-green';
      case 'Expiring': return 'pill-orange';
      case 'Renewed':  return 'pill-blue';
      case 'Pending':  return 'pill-gold';
      default:         return 'pill-gray';
    }
  }
}
