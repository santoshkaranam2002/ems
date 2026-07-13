import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-from-main-village',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-from-main-village.html',
  styleUrl: './employee-from-main-village.scss'
})
export class EmployeeFromMainVillage {
  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];
}
