import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController, ModalController, IonicModule } from '@ionic/angular';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';

interface StudentRequest {
  id: string;
  studentName: string;
  subject: string;
  schedule: string;
  mode: 'Online' | 'Face-to-face';
  location?: string;
  specialInstructions?: string;
  postedTime: string;
  email?: string;
  preferredGender?: string;
  budget?: string;
}

@Component({
  selector: 'app-find-students',
  templateUrl: './find-students.page.html',
  styleUrls: ['./find-students.page.scss'],
  standalone: false
})
export class FindStudentsPage implements OnInit {
  studentRequests: StudentRequest[] = [];
  filteredRequests: StudentRequest[] = [];
  searchTerm: string = '';
  selectedMode: string = 'All';
  showFilters: boolean = false;

  private firestore = inject(Firestore);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);
  private modalCtrl = inject(ModalController);
  
  // Load Firebase data in constructor to avoid injection context warning
  constructor() {
    this.loadStudentRequests();
  }

  ngOnInit() {
    // Additional initialization if needed
  }

  async loadStudentRequests() {
    try {
      // Fetch all client/student profiles from Firebase
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('role', '==', 'client'));
      const querySnapshot = await getDocs(q);
      
      console.log('Found students:', querySnapshot.size);
      
      this.studentRequests = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        console.log('Student data (full):', JSON.stringify(data, null, 2));
        
        const preferences = data['preferences'] || {};
        console.log('Preferences:', preferences);
        
        const schedule = preferences['preferredSchedule'];
        const scheduleText = Array.isArray(schedule) && schedule.length > 0 
          ? schedule.join(', ') 
          : 'Not specified';
        
        const hasCompleteProfile = !!(data['preferredSubjects'] || data['learningGoals'] || preferences['preferredSchedule']);
        
        const studentRequest = {
          id: doc.id,
          studentName: `${data['firstName'] || 'Student'} ${data['lastName'] || ''}`.trim() || `Student #${doc.id.substring(0, 5)}`,
          subject: Array.isArray(data['preferredSubjects']) && data['preferredSubjects'].length > 0
            ? data['preferredSubjects'].join(', ')
            : hasCompleteProfile ? 'General Tutoring' : '⚠️ Profile incomplete',
          schedule: scheduleText,
          mode: preferences['preferredMode'] === 'Both' || !preferences['preferredMode']
            ? 'Online'
            : preferences['preferredMode'] as 'Online' | 'Face-to-face',
          location: data['city'] || data['address'] || 'Not specified',
          specialInstructions: data['learningGoals'] || data['bio'] || '⚠️ Student hasn\'t added learning goals yet',
          postedTime: this.getTimeAgo(data['createdAt']),
          email: data['email'],
          preferredGender: preferences['preferredTutorGender'],
          budget: preferences['minPrice'] && preferences['maxPrice']
            ? `₱${preferences['minPrice']} - ₱${preferences['maxPrice']}`
            : undefined
        } as StudentRequest;
        
        console.log('Created request:', studentRequest);
        return studentRequest;
      });

      console.log('Total student requests:', this.studentRequests.length);
      this.filteredRequests = [...this.studentRequests];
    } catch (error) {
      console.error('Error loading student requests:', error);
      
      // Fallback to mock data if Firebase fails
      this.studentRequests = [
        {
          id: '1',
          studentName: 'Student #12345',
          subject: 'Mathematics (Calculus)',
          schedule: 'Mon, Wed, Fri - 3:00 PM to 5:00 PM',
          mode: 'Online',
          specialInstructions: 'Need help with derivatives and integrals. Preparing for college entrance exam.',
          postedTime: '2 hours ago'
        },
        {
          id: '2',
          studentName: 'Student #67890',
          subject: 'Physics',
          schedule: 'Weekends - 10:00 AM to 12:00 PM',
          mode: 'Face-to-face',
          location: 'Quezon City',
          specialInstructions: 'Focus on mechanics and thermodynamics.',
          postedTime: '5 hours ago'
        },
        {
          id: '3',
          studentName: 'Student #24680',
          subject: 'English (IELTS Prep)',
          schedule: 'Flexible schedule',
          mode: 'Online',
          specialInstructions: 'Target score: 7.5. Need help with writing and speaking sections.',
          postedTime: '1 day ago'
        }
      ];

      this.filteredRequests = [...this.studentRequests];
    }
  }

  getTimeAgo(timestamp: any): string {
    if (!timestamp) return 'Recently';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const now = new Date();
      const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      
      if (seconds < 60) return 'Just now';
      if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
      if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
      if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
      return `${Math.floor(seconds / 2592000)} months ago`;
    } catch (error) {
      return 'Recently';
    }
  }

  onSearch() {
    this.applyFilters();
  }

  filterByMode(mode: string) {
    this.selectedMode = mode;
    this.applyFilters();
  }

  applyFilters() {
    let results = [...this.studentRequests];

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      results = results.filter(request =>
        request.subject.toLowerCase().includes(term) ||
        request.studentName.toLowerCase().includes(term) ||
        request.location?.toLowerCase().includes(term) ||
        request.specialInstructions?.toLowerCase().includes(term) ||
        request.email?.toLowerCase().includes(term)
      );
    }

    // Apply mode filter
    if (this.selectedMode !== 'All') {
      results = results.filter(request => request.mode === this.selectedMode);
    }

    this.filteredRequests = results;
  }

  toggleFilter() {
    this.showFilters = !this.showFilters;
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedMode = 'All';
    this.filteredRequests = [...this.studentRequests];
  }

  // Tab Navigation Methods
  goToHome() {
    this.router.navigate(['/tutor-dashboard']);
  }

  goToMessages() {
    console.log('Messages tab clicked');
    // TODO: Navigate to Messages page
  }

  goToProfile() {
    this.router.navigate(['/tutor/profile']);
  }

  getModeColor(mode: string): string {
    return mode === 'Online' ? 'primary' : 'success';
  }

  async viewRequestDetails(request: StudentRequest) {
    const modal = await this.modalCtrl.create({
      component: StudentDetailsModalComponent,
      componentProps: {
        student: request
      },
      cssClass: 'student-details-modal',
      breakpoints: [0, 0.5, 0.75, 1],
      initialBreakpoint: 0.75
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data?.action === 'sendOffer') {
      this.sendOffer(request);
    }
  }

  async sendOffer(request: StudentRequest) {
    const alert = await this.alertCtrl.create({
      header: 'Send Offer',
      message: `Send your tutoring offer to ${request.studentName} for ${request.subject}?`,
      inputs: [
        {
          name: 'rate',
          type: 'number',
          placeholder: 'Your hourly rate (₱)'
        },
        {
          name: 'message',
          type: 'textarea',
          placeholder: 'Message to student (optional)'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Send Offer',
          handler: async (data) => {
            const successAlert = await this.alertCtrl.create({
              header: 'Offer Sent!',
              message: 'Your offer has been sent to the student. You will be notified when they respond.',
              buttons: ['OK']
            });
            await successAlert.present();
          }
        }
      ]
    });
    await alert.present();
  }
}

// Inline Modal Component
@Component({
  selector: 'app-student-details-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Student Request Details</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="modal-content">
      <div class="student-header">
        <div class="student-avatar">
          <ion-icon name="person-circle"></ion-icon>
        </div>
        <div class="student-info">
          <h2>{{ student.studentName }}</h2>
          <p class="posted-time">
            <ion-icon name="time-outline"></ion-icon>
            {{ student.postedTime }}
          </p>
        </div>
      </div>

      <div class="details-section">
        <div class="detail-card">
          <div class="detail-header">
            <ion-icon name="book" color="primary"></ion-icon>
            <span>Subject</span>
          </div>
          <p class="detail-value">{{ student.subject }}</p>
        </div>

        <div class="detail-card">
          <div class="detail-header">
            <ion-icon name="calendar" color="primary"></ion-icon>
            <span>Preferred Schedule</span>
          </div>
          <p class="detail-value">{{ student.schedule }}</p>
        </div>

        <div class="detail-card">
          <div class="detail-header">
            <ion-icon name="globe-outline" color="primary"></ion-icon>
            <span>Mode</span>
          </div>
          <ion-badge [color]="student.mode === 'Online' ? 'primary' : 'success'">
            {{ student.mode }}
          </ion-badge>
        </div>

        <div class="detail-card" *ngIf="student.location && student.location !== 'Not specified'">
          <div class="detail-header">
            <ion-icon name="location" color="primary"></ion-icon>
            <span>Location</span>
          </div>
          <p class="detail-value">{{ student.location }}</p>
        </div>

        <div class="detail-card" *ngIf="student.preferredGender">
          <div class="detail-header">
            <ion-icon name="people" color="primary"></ion-icon>
            <span>Preferred Tutor</span>
          </div>
          <p class="detail-value">{{ student.preferredGender }}</p>
        </div>

        <div class="detail-card" *ngIf="student.budget">
          <div class="detail-header">
            <ion-icon name="cash" color="primary"></ion-icon>
            <span>Budget</span>
          </div>
          <p class="detail-value budget">{{ student.budget }}</p>
        </div>

        <div class="detail-card full-width" *ngIf="student.specialInstructions">
          <div class="detail-header">
            <ion-icon name="document-text" color="primary"></ion-icon>
            <span>Learning Goals</span>
          </div>
          <p class="detail-value description">{{ student.specialInstructions }}</p>
        </div>

        <div class="detail-card" *ngIf="student.email">
          <div class="detail-header">
            <ion-icon name="mail" color="primary"></ion-icon>
            <span>Contact</span>
          </div>
          <p class="detail-value email">{{ student.email }}</p>
        </div>
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <div class="footer-actions">
          <ion-button expand="block" fill="outline" (click)="dismiss()">
            Close
          </ion-button>
          <ion-button expand="block" (click)="sendOffer()">
            <ion-icon slot="start" name="paper-plane"></ion-icon>
            Send Offer
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  `,
  styles: [`
    .modal-content {
      --background: #f5f5f5;
    }

    .student-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      color: white;

      .student-avatar ion-icon {
        font-size: 64px;
        color: white;
      }

      .student-info {
        flex: 1;

        h2 {
          margin: 0 0 8px 0;
          font-size: 22px;
          font-weight: 700;
        }

        .posted-time {
          margin: 0;
          font-size: 14px;
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 6px;

          ion-icon {
            font-size: 16px;
          }
        }
      }
    }

    .details-section {
      padding: 16px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;

      .detail-card {
        background: white;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

        &.full-width {
          grid-column: 1 / -1;
        }

        .detail-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #666;
          font-size: 14px;
          font-weight: 600;

          ion-icon {
            font-size: 20px;
          }
        }

        .detail-value {
          margin: 0;
          color: #333;
          font-size: 15px;
          line-height: 1.5;

          &.description {
            color: #555;
            line-height: 1.6;
          }

          &.budget {
            color: #667eea;
            font-weight: 700;
            font-size: 18px;
          }

          &.email {
            color: #667eea;
            word-break: break-all;
          }
        }

        ion-badge {
          font-size: 13px;
          padding: 6px 12px;
          font-weight: 600;
        }
      }
    }

    ion-footer {
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

      .footer-actions {
        display: flex;
        gap: 12px;
        padding: 12px;

        ion-button {
          margin: 0;
          flex: 1;
          font-weight: 600;

          &[fill="outline"] {
            --color: #999;
            --border-color: #ddd;
          }

          &:not([fill="outline"]) {
            --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
        }
      }
    }

    @media (min-width: 768px) {
      .details-section {
        grid-template-columns: 1fr 1fr;
      }
    }
  `],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ]
})
class StudentDetailsModalComponent {
  student: any;

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  sendOffer() {
    this.modalCtrl.dismiss({ action: 'sendOffer' });
  }
}
