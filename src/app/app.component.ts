import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'exp',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private apiSrevice: ApiService) { }

  ngOnInit(): void {
    this.getAllEmployees()
  }

  openAddEditForm() {
    // For auto refresh
    const dialogRef = this.dialog.open(AddEditEmployeeComponent)
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getAllEmployees()
        }
      },
    })
  }

  getAllEmployees() {
    this.apiSrevice.getAllEmployees().subscribe({
      next: (value) => {
        this.dataSource = new MatTableDataSource(value)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleDelete(id: number | string) {
    this.apiSrevice.deleteEmployee(Number(id)).subscribe({
      next: (value) => {
        alert('Deleted')
        this.getAllEmployees()
      },
    })
  }
}
