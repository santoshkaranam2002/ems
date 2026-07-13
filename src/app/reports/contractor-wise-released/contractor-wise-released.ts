import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contractor-wise-released',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contractor-wise-released.html',
  styleUrl: './contractor-wise-released.scss'
})
export class ContractorWiseReleased {
  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];
}
