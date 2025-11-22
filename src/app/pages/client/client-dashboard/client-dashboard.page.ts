import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { ClientProfile } from '../../../models/user.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.page.html',
  styleUrls: ['./client-dashboard.page.scss'],
  standalone: false
})
export class ClientDashboardPage implements OnInit {
  profile: ClientProfile | null = null;
  currentTime: string = '';
  isDarkMode: boolean = false;

  popularSubjects = [
    { name: 'Mathematics', icon: 'calculator', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'English', icon: 'book', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { name: 'Science', icon: 'flask', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { name: 'Filipino', icon: 'flag', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { name: 'Programming', icon: 'code-slash', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { name: 'Accounting', icon: 'cash', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
    { name: 'History', icon: 'time', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { name: 'Music', icon: 'musical-notes', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }
  ];

  recommendedTutors = [
    {
      name: 'Maria Santos',
      subject: 'Mathematics & Physics',
      rating: 4.9,
      reviews: 128,
      hourlyRate: 450,
      photo: ''
    },
    {
      name: 'John Rodriguez',
      subject: 'English & Literature',
      rating: 4.8,
      reviews: 95,
      hourlyRate: 400,
      photo: ''
    },
    {
      name: 'Sarah Chen',
      subject: 'Programming & Web Dev',
      rating: 5.0,
      reviews: 156,
      hourlyRate: 600,
      photo: ''
    },
    {
      name: 'Miguel Torres',
      subject: 'Science & Chemistry',
      rating: 4.7,
      reviews: 82,
      hourlyRate: 380,
      photo: ''
    }
  ];

  recentActivities = [
    {
      type: 'viewed',
      icon: 'eye-outline',
      color: 'primary',
      title: 'Recently Viewed',
      description: 'Continue browsing tutors you viewed',
      action: 'View History'
    },
    {
      type: 'pending',
      icon: 'time-outline',
      color: 'warning',
      title: 'Pending Request',
      description: '2 tutoring requests waiting for response',
      action: 'Check Status'
    },
    {
      type: 'session',
      icon: 'calendar-outline',
      color: 'success',
      title: 'Upcoming Session',
      description: 'Math session with Maria - Tomorrow 3PM',
      action: 'View Details'
    }
  ];

  // Set to true if student has upcoming session
  hasUpcomingSession = true;
  upcomingSession = {
    tutorName: 'Maria Santos',
    subject: 'Mathematics',
    date: 'Tomorrow',
    time: '3:00 PM',
    countdown: 'Starts in 18 hours',
    photo: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private renderer: Renderer2
  ) { }

  async ngOnInit() {
    await this.loadProfile();
    this.updateGreeting();
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.renderer.addClass(document.body, 'dark');
    }
  }

  async loadProfile() {
    try {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser && currentUser.uid) {
        const user = await this.authService.getUserProfile(currentUser.uid);
        if (user && user.role === 'client') {
          this.profile = user as ClientProfile;
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  updateGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.currentTime = 'Good Morning';
    } else if (hour < 18) {
      this.currentTime = 'Good Afternoon';
    } else {
      this.currentTime = 'Good Evening';
    }
  }

  onNotificationClick() {
    // TODO: Implement notification functionality
    console.log('Notification clicked');
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
    
    console.log('Theme toggled:', this.isDarkMode ? 'Dark Mode ON' : 'Light Mode ON');
    console.log('Body classes:', document.body.className);
    
    // TODO: Save theme preference to local storage
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  async onFindTutor() {
    this.router.navigate(['/find-tutor']);
  }

  async onMessages() {
    // TODO: Navigate to Messages page
    console.log('Messages clicked');
  }

  async onBookings() {
    // TODO: Navigate to Bookings page
    console.log('Bookings clicked');
  }

  async onFavorites() {
    // TODO: Navigate to Favorites page
    console.log('Favorites clicked');
  }

  async onViewTutorProfile(tutor: any) {
    console.log('View tutor profile:', tutor.name);
    // TODO: Navigate to tutor profile page
  }

  async onActivityClick(activity: any) {
    console.log('Activity clicked:', activity.type);
    // TODO: Navigate to respective page
  }

  async onHelpCenter() {
    console.log('Help Center clicked');
    // TODO: Navigate to Help Center
  }

  async onReportTutor() {
    console.log('Report a Tutor clicked');
    // TODO: Navigate to Report form
  }

  async onSettings() {
    console.log('Settings clicked');
    // TODO: Navigate to Settings
  }

  async onProfile() {
    console.log('Profile clicked');
    this.router.navigate(['/client/profile']);
  }

  async onLogout() {
    const confirm = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: async () => {
            try {
              await this.authService.logout();
              this.router.navigate(['/landing']);
            } catch (error) {
              console.error('Logout error:', error);
            }
          }
        }
      ]
    });
    await confirm.present();
  }

}
