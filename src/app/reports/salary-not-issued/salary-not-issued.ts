import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salary-not-issued',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salary-not-issued.html',
  styleUrl: './salary-not-issued.scss'
})
export class SalaryNotIssued {
  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];
}
