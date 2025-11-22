import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { TutorProfile } from '../../../models/user.model';
import { AlertController, ActionSheetController, ModalController } from '@ionic/angular';

interface UpcomingSession {
  id: string;
  studentName: string;
  studentAvatar?: string;
  subject: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
}

interface StudentRequest {
  id: string;
  studentName: string;
  subject: string;
  schedule: string;
  mode: 'Online' | 'Face-to-face';
  location?: string;
  specialInstructions?: string;
  postedTime: string;
}

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.page.html',
  styleUrls: ['./tutor-dashboard.page.scss'],
  standalone: false
})
export class TutorDashboardPage implements OnInit {
  profile: TutorProfile | null = null;
  isDarkMode: boolean = false;
  currentAnnouncement = '';
  announcements = [
    '3 new student requests available today!',
    'Improve your profile to get more bookings.',
    'Complete your profile verification to unlock premium features!',
    'Check out the new student requests in your area!'
  ];
  upcomingSessions: UpcomingSession[] = [];
  studentRequests: StudentRequest[] = [];
  
  // Dashboard stats
  stats = {
    totalStudents: 12,
    activeRequests: 3,
    completedSessions: 45,
    monthlyEarnings: 15000,
    averageRating: 4.8,
    totalReviews: 28
  };

  // Recent activity
  recentActivity = [
    {
      type: 'request',
      icon: 'mail-outline',
      color: 'primary',
      title: 'New tutoring request',
      description: 'John wants help with Mathematics',
      time: '2 hours ago'
    },
    {
      type: 'session',
      icon: 'checkmark-circle-outline',
      color: 'success',
      title: 'Session completed',
      description: 'English session with Sarah',
      time: '1 day ago'
    },
    {
      type: 'review',
      icon: 'star-outline',
      color: 'warning',
      title: 'New review',
      description: '5 stars from Mike Johnson',
      time: '2 days ago'
    },
    {
      type: 'payment',
      icon: 'cash-outline',
      color: 'tertiary',
      title: 'Payment received',
      description: '₱500 for Physics session',
      time: '3 days ago'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private renderer: Renderer2
  ) { }

  async ngOnInit() {
    await this.loadProfile();
    this.loadThemePreference();
    this.rotateAnnouncement();
    this.loadUpcomingSessions();
    this.loadStudentRequests();
  }

  loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
      localStorage.setItem('theme', 'light');
    }
  }

  async findStudents() {
    // Navigate to student requests page
    this.router.navigate(['/find-students']);
  }

  async openMessages() {
    const alert = await this.alertCtrl.create({
      header: 'Messages',
      message: 'This feature will show your conversations with students.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async viewBookings() {
    const alert = await this.alertCtrl.create({
      header: 'My Bookings',
      message: 'View and manage your upcoming tutoring sessions.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async loadProfile() {
    try {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser && currentUser.uid) {
        const user = await this.authService.getUserProfile(currentUser.uid);
        if (user && user.role === 'tutor') {
          this.profile = user as TutorProfile;
          // Update stats from profile if available
          if (this.profile.rating) {
            this.stats.averageRating = this.profile.rating;
          }
          if (this.profile.totalReviews) {
            this.stats.totalReviews = this.profile.totalReviews;
          }
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  async viewStudents() {
    const alert = await this.alertCtrl.create({
      header: 'My Students',
      message: 'This feature will show your list of current students.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async viewRequests() {
    const alert = await this.alertCtrl.create({
      header: `You have ${this.stats.activeRequests} pending requests`,
      message: 'This feature will show all tutoring requests.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async manageSchedule() {
    const alert = await this.alertCtrl.create({
      header: 'Manage Schedule',
      message: 'Set your availability and manage your tutoring sessions.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async viewEarnings() {
    const alert = await this.alertCtrl.create({
      header: 'Earnings Report',
      message: `This month: ₱${this.stats.monthlyEarnings.toLocaleString()}\nTotal sessions: ${this.stats.completedSessions}`,
      buttons: ['OK']
    });
    await alert.present();
  }

  async editProfile() {
    // Navigate to dedicated profile page
    this.router.navigate(['/tutor/profile']);
  }

  rotateAnnouncement() {
    // Set initial announcement
    this.currentAnnouncement = this.announcements[0];
    
    // Rotate announcements every 5 seconds
    let index = 0;
    setInterval(() => {
      index = (index + 1) % this.announcements.length;
      this.currentAnnouncement = this.announcements[index];
    }, 5000);
  }

  loadUpcomingSessions() {
    // Mock data - replace with actual API call
    this.upcomingSessions = [
      {
        id: '1',
        studentName: 'Maria Santos',
        studentAvatar: '',
        subject: 'Mathematics',
        date: 'Nov 23, 2025',
        time: '2:00 PM',
        status: 'Confirmed'
      },
      {
        id: '2',
        studentName: 'Juan Dela Cruz',
        subject: 'Physics',
        date: 'Nov 24, 2025',
        time: '4:30 PM',
        status: 'Pending'
      },
      {
        id: '3',
        studentName: 'Anna Reyes',
        studentAvatar: '',
        subject: 'English',
        date: 'Nov 25, 2025',
        time: '10:00 AM',
        status: 'Confirmed'
      }
    ];
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Confirmed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Completed':
        return 'medium';
      default:
        return 'primary';
    }
  }

  viewAllSessions() {
    this.router.navigate(['/tutor/sessions']);
  }

  viewSessionDetails(session: UpcomingSession) {
    console.log('View session details:', session);
    // Navigate to session details page
    this.router.navigate(['/tutor/sessions', session.id]);
  }

  loadStudentRequests() {
    // Mock data - replace with actual API call
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
  }

  getModeColor(mode: string): string {
    return mode === 'Online' ? 'primary' : 'success';
  }

  viewAllRequests() {
    this.router.navigate(['/tutor/requests']);
  }

  async viewRequestDetails(request: StudentRequest) {
    const alert = await this.alertCtrl.create({
      header: request.studentName,
      message: `
        <strong>Subject:</strong> ${request.subject}<br>
        <strong>Schedule:</strong> ${request.schedule}<br>
        <strong>Mode:</strong> ${request.mode}<br>
        ${request.location ? `<strong>Location:</strong> ${request.location}<br>` : ''}
        ${request.specialInstructions ? `<strong>Notes:</strong> ${request.specialInstructions}` : ''}
      `,
      buttons: ['Close']
    });
    await alert.present();
  }

  async sendOffer(request: StudentRequest) {
    const alert = await this.alertCtrl.create({
      header: 'Send Offer',
      message: `Send your tutoring offer to ${request.studentName} for ${request.subject}?`,
      inputs: [
        {
          name: 'rate',
          type: 'number',
          placeholder: 'Your hourly rate (₱)',
          value: this.profile?.hourlyRate || 0
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

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/landing']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

}
