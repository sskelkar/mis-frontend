export interface Employee {
  employeeId: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  sex: string;
  panNumber?: string;
  passportNumber?: string;
  passportValidTill?: Date;
  emergencyContactPerson?: string;
  emergencyContactPhoneNumber?: string;
  bloodGroup?: string;
  birthDate: Date;
  joiningDate: Date;
  probationPeriodMonths: number;
  
}