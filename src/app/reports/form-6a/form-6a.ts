import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-6a',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-6a.html',
  styleUrl: './form-6a.scss'
})
export class Form6A {
  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];
}
