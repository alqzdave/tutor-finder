import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { TutorProfile } from '../../../models/user.model';
import { AlertController, ActionSheetController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.page.html',
  styleUrls: ['./tutor-dashboard.page.scss'],
  standalone: false
})
export class TutorDashboardPage implements OnInit {
  profile: TutorProfile | null = null;
  
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
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    await this.loadProfile();
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
    if (!this.profile) return;

    const alert = await this.alertCtrl.create({
      header: 'Edit Profile',
      inputs: [
        {
          name: 'firstName',
          type: 'text',
          placeholder: 'First Name',
          value: this.profile.firstName || ''
        },
        {
          name: 'lastName',
          type: 'text',
          placeholder: 'Last Name',
          value: this.profile.lastName || ''
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: 'Phone Number',
          value: this.profile.phone || ''
        },
        {
          name: 'bio',
          type: 'textarea',
          placeholder: 'Bio',
          value: this.profile.bio || ''
        },
        {
          name: 'subjects',
          type: 'text',
          placeholder: 'Subjects (comma-separated)',
          value: this.profile.subjects?.join(', ') || ''
        },
        {
          name: 'hourlyRate',
          type: 'number',
          placeholder: 'Hourly Rate',
          value: this.profile.hourlyRate || 0
        },
        {
          name: 'education',
          type: 'text',
          placeholder: 'Education',
          value: this.profile.education || ''
        },
        {
          name: 'experience',
          type: 'textarea',
          placeholder: 'Experience',
          value: this.profile.experience || ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: async (data) => {
            try {
              const currentUser = this.authService.getCurrentUser();
              if (!currentUser || !currentUser.uid) return false;

              const subjects = data.subjects.split(',').map((s: string) => s.trim()).filter((s: string) => s);
              await this.authService.updateUserProfile(currentUser.uid, {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                bio: data.bio,
                subjects: subjects,
                hourlyRate: parseFloat(data.hourlyRate),
                education: data.education,
                experience: data.experience
              });
              await this.loadProfile();
              
              const successAlert = await this.alertCtrl.create({
                header: 'Success',
                message: 'Profile updated successfully!',
                buttons: ['OK']
              });
              await successAlert.present();
              return true;
            } catch (error) {
              console.error('Error updating profile:', error);
              const errorAlert = await this.alertCtrl.create({
                header: 'Error',
                message: 'Failed to update profile',
                buttons: ['OK']
              });
              await errorAlert.present();
              return false;
            }
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
