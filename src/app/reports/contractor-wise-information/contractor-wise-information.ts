import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contractor-wise-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contractor-wise-information.html',
  styleUrl: './contractor-wise-information.scss'
})
export class ContractorWiseInformation {
  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];
}
