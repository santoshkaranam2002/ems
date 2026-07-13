import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-safety-training',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './safety-training.html',
  styleUrl: './safety-training.scss'
})
export class SafetyTraining {
  contractors = ['All Contractors', 'SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd', 'Sai Teja Enterprises'];
  locations   = ['All Locations', '101 - KALAVALASA', '102 - Main Plant', '103 - Township'];
}
