import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blood-group-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blood-group-information.html',
  styleUrl: './blood-group-information.scss'
})
export class BloodGroupInformation {
  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];
}
