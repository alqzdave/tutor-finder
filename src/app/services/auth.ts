import { Injectable } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  user,
  User as FirebaseUser,
  updateProfile
} from '@angular/fire/auth';
import { 
  Firestore, 
  doc, 
  setDoc, 
  getDoc,
  collection,
  query,
  where,
  getDocs
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, ClientProfile, TutorProfile } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    // Listen to auth state changes
    user(this.auth).subscribe(async (firebaseUser) => {
      if (firebaseUser) {
        const userProfile = await this.getUserProfile(firebaseUser.uid);
        this.currentUserSubject.next(userProfile);
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  // Register new user with role
  async register(
    email: string, 
    password: string, 
    role: 'client' | 'tutor',
    additionalData: any
  ): Promise<void> {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = credential.user;

      // Update display name
      if (additionalData.firstName && additionalData.lastName) {
        await updateProfile(user, {
          displayName: `${additionalData.firstName} ${additionalData.lastName}`
        });
      }

      // Create user profile in Firestore
      const userProfile: Partial<User> = {
        uid: user.uid,
        email: email,
        displayName: `${additionalData.firstName} ${additionalData.lastName}`,
        role: role,
        createdAt: new Date(),
        ...additionalData
      };

      await setDoc(doc(this.firestore, 'users', user.uid), userProfile);

      this.currentUserSubject.next(userProfile as User);
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  async login(email: string, password: string): Promise<void> {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      const userProfile = await this.getUserProfile(credential.user.uid);
      
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      this.currentUserSubject.next(userProfile);

      // Navigate based on role
      if (userProfile.role === 'client') {
        this.router.navigate(['/client-dashboard']);
      } else {
        this.router.navigate(['/tutor-dashboard']);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.currentUserSubject.next(null);
      this.router.navigate(['/landing']);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Get user profile from Firestore
  async getUserProfile(uid: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(this.firestore, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as User;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  // Update user profile
  async updateUserProfile(uid: string, data: Partial<User | ClientProfile | TutorProfile>): Promise<void> {
    try {
      await setDoc(doc(this.firestore, 'users', uid), data, { merge: true });
      const updatedProfile = await this.getUserProfile(uid);
      this.currentUserSubject.next(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  // Get current user value
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Get all tutors (for client browsing)
  async getAllTutors(): Promise<TutorProfile[]> {
    try {
      const tutorsQuery = query(
        collection(this.firestore, 'users'),
        where('role', '==', 'tutor')
      );
      const querySnapshot = await getDocs(tutorsQuery);
      return querySnapshot.docs.map(doc => doc.data() as TutorProfile);
    } catch (error) {
      console.error('Error fetching tutors:', error);
      return [];
    }
  }
}
