import { Component } from '@angular/core';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent {
  educationOptions = ['Secondary', 'Higher Secondary', 'Diploma', 'Graduation', 'Post Graduation', 'Phd']
}