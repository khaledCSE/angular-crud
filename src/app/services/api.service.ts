import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee, IEmployeeResponse } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:3000/employees'

  constructor(private http: HttpClient) { }

  addEmployee(data: IEmployee): Observable<IEmployeeResponse[]> {
    return this.http.post<IEmployeeResponse[]>(this.baseUrl, data)
  }

  getAllEmployees(): Observable<IEmployeeResponse[]> {
    return this.http.get<IEmployeeResponse[]>(this.baseUrl)
  }

  updateEmployee(employeeId: number, data: IEmployeeResponse) {
    return this.http.put(`${this.baseUrl}/${employeeId}`, data)
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete(`${this.baseUrl}/${employeeId}`)
  }
}
