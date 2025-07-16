
export type UserRole = 'patient' | 'doctor' | 'assistant' | 'pathology';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  phone?: string;
  username?: string;
}

export interface Patient extends User {
  role: 'patient';
  occupation: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  chronicDiseases: string[];
  allergies: string[];
  medicalHistory: string;
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  department: string;
  gender: string;
  dateOfBirth: string;
  licenseNo: string;
  profileNo: string;
  qualification: string;
  idProof?: File;
}

export interface Assistant extends User {
  role: 'assistant';
  assignedDoctor: string;
  department: string;
}

export interface Pathologist extends User {
  role: 'pathology';
  department: string;
  licenseNo: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  type: 'consultation' | 'pathology';
  symptoms?: string;
}
