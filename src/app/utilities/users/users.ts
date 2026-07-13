import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EmsUser {
  name: string;
  username: string;
  role: string;
  lastLogin: string;
  status: 'Active' | 'Disabled';
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
  users: EmsUser[] = [
    { name: 'Administrator',   username: 'admin',      role: 'Super Admin',   lastLogin: 'Today, 09:12 AM',     status: 'Active' },
    { name: 'K. Srinivas',     username: 'srinivas.k', role: 'HR Officer',    lastLogin: 'Today, 08:47 AM',     status: 'Active' },
    { name: 'P. Ramana Murthy',username: 'ramana.p',   role: 'Security Head', lastLogin: 'Yesterday, 06:31 PM', status: 'Active' },
    { name: 'M. Divya',        username: 'divya.m',    role: 'Wages Clerk',   lastLogin: '08 Jul 2026',         status: 'Active' },
    { name: 'B. Ajay Kumar',   username: 'ajay.b',     role: 'Gate Operator', lastLogin: '21 Jun 2026',         status: 'Disabled' },
  ];
}
