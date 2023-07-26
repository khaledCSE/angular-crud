import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee, IEmployeeResponse } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addEmployee(data: IEmployee): Observable<IEmployeeResponse[]> {
    return this.http.post<IEmployeeResponse[]>('http://localhost:3000/employees', data)
  }
}
