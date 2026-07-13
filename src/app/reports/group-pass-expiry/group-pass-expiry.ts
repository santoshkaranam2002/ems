import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-pass-expiry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-pass-expiry.html',
  styleUrl: './group-pass-expiry.scss'
})
export class GroupPassExpiry {
  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];
}
