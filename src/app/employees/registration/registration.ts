import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class Registration {
  // Demo dropdown data (design only)
  locations    = ['101 - KALAVALASA', '102 - Main Plant', '103 - Township'];
  companies    = ['1001 - Hinduja National Power Corporation Ltd.'];
  consignees   = ['Consignee 1', 'Consignee 2'];
  contractors  = ['SVR Engineering Works', 'Coastal Infra Services', 'Godavari Mech Pvt Ltd'];
  titles       = ['Mr.', 'Ms.', 'Mrs.'];
  sexes        = ['Male', 'Female', 'Other'];
  yesNo        = ['Yes', 'No'];
  religions    = ['Hindu', 'Muslim', 'Christian', 'Other'];
  idProofs     = ['Aadhaar Card', 'Voter ID', 'Driving License', 'PAN Card'];
  categories   = ['Skilled', 'Semi-Skilled', 'Unskilled', 'Highly Skilled'];
  salaryBases  = ['Daily', 'Monthly', 'Piece Rate'];
  workAreas    = ['Boiler Maintenance', 'Coal Handling Plant', 'Ash Handling', 'Turbine Section', 'Switch Yard'];
  bloodGroups  = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  states       = ['Andhra Pradesh', 'Telangana', 'Odisha', 'Tamil Nadu'];
  heightPermits = ['Permitted', 'Not Permitted'];
  safetyTrainings = ['Completed', 'Scheduled', 'Not Done'];
}
