export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: 'client' | 'tutor';
  photoURL?: string;
  createdAt: Date;
}

export interface ClientProfile extends User {
  role: 'client';
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  preferences?: {
    subjects?: string[];
    budget?: number;
    availability?: string[];
  };
}

export interface TutorProfile extends User {
  role: 'tutor';
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  bio?: string;
  subjects: string[];
  hourlyRate?: number;
  education?: string;
  experience?: string;
  availability?: string[];
  rating?: number;
  totalReviews?: number;
}
