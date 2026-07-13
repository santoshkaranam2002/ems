import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-general-pass-expiry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-pass-expiry.html',
  styleUrl: './general-pass-expiry.scss'
})
export class GeneralPassExpiry {
  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];
}
