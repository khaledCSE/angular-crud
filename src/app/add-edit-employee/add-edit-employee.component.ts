import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEmployeeResponse } from '../types';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent implements OnInit {
  employeeForm: FormGroup
  educationOptions = ['Secondary', 'Higher Secondary', 'Diploma', 'Graduation', 'Post Graduation', 'Phd']

  constructor(private fb: FormBuilder, private apiService: ApiService, private dialogRef: MatDialogRef<AddEditEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: IEmployeeResponse) {
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

  ngOnInit(): void {
    this.employeeForm.patchValue(this.data)
  }

  handleSubmit() {
    if (this.employeeForm.valid) {
      if (this.data) {
        this.apiService.updateEmployee(this.data.id, this.employeeForm.value)
          .subscribe({
            next: (value) => {
              alert('Employee updated! 😊');
              this.dialogRef.close(true)
              this.apiService.getAllEmployees()
            },
            error: (err) => {
              alert('Could not update!')
              this.dialogRef.close()
            },
          });
      } else {
        this.apiService.addEmployee(this.employeeForm.value)
          .subscribe({
            next: (value) => {
              alert('Employee saved! 😊');
              this.dialogRef.close(true)
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
}
