import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent {
  employeeForm: FormGroup
  educationOptions = ['Secondary', 'Higher Secondary', 'Diploma', 'Graduation', 'Post Graduation', 'Phd']

  constructor(private fb: FormBuilder, private apiService: ApiService, private dialogRef: DialogRef<AddEditEmployeeComponent>) {
    this.employeeForm = fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      exp: '',
      package: '',
    })
  }

  handleSubmit() {
    if (this.employeeForm.valid) {
      this.apiService.addEmployee(this.employeeForm.value)
        .subscribe({
          next: (value) => {
            alert('Employee saved! 😊');
            this.dialogRef.close()
            this.apiService.getAllEmployees()
          },
          error: (err) => {
            alert('Could not save!')
            this.dialogRef.close()
          },
        });
    }
  }
}
