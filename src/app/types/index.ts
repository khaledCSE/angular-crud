export interface IEmployee {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  gender: string;
  education: string;
  company: string;
  exp: string;
  package: string;
}

export interface IEmployeeResponse extends IEmployee {
  id: number
}