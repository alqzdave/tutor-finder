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
  fullName?: string;
  username?: string;
  phone?: string;
  mobileNumber?: string;
  gender?: string;
  birthday?: string;
  address?: string;
  city?: string;
  province?: string;
  location?: string;
  gradeLevel?: string;
  bio?: string;
  interests?: string[];
  learningGoals?: string;
  preferences?: {
    subjects?: string[];
    budget?: number;
    availability?: string[];
    preferredTutorGender?: string;
    minPrice?: number;
    maxPrice?: number;
    preferredSchedule?: string[];
    preferredMode?: string;
  };
  preferredSubjects?: string[];
  budget?: number;
}

export interface TutorProfile extends User {
  role: 'tutor';
  firstName: string;
  lastName: string;
  fullName?: string;
  username?: string;
  phone?: string;
  mobileNumber?: string;
  gender?: string;
  birthday?: string;
  address?: string;
  city?: string;
  province?: string;
  location?: string;
  bio?: string;
  subjects: string[];
  subjectsTaught?: string[];
  hourlyRate?: number;
  education?: string;
  experience?: string;
  experienceYears?: number;
  experienceDescription?: string;
  teachingStyle?: string;
  availability?: string[];
  preferences?: {
    preferredMode?: string;
    availableSchedule?: string[];
  };
  rating?: number;
  totalReviews?: number;
  certifications?: string[];
  specialization?: string;
}
