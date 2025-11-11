import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { TutorProfile } from '../../../models/user.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.page.html',
  styleUrls: ['./client-dashboard.page.scss'],
  standalone: false
})
export class ClientDashboardPage implements OnInit {
  tutors: TutorProfile[] = [];
  currentTutorIndex: number = 0;
  currentTutor: TutorProfile | null = null;
  currentCardStyle: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  async ngOnInit() {
    await this.loadTutors();
  }

  async loadTutors() {
    try {
      // Get real tutors from Firebase
      const realTutors = await this.authService.getAllTutors();
      
      // Use real tutors first, then add mock data if there are no real tutors
      if (realTutors.length > 0) {
        this.tutors = realTutors;
      } else {
        // Only use mock data if no real tutors exist
        this.tutors = this.getMockTutors();
      }
      
      if (this.tutors.length > 0) {
        this.currentTutor = this.tutors[0];
      }
    } catch (error) {
      console.error('Error loading tutors:', error);
      // Fallback to mock data
      this.tutors = this.getMockTutors();
      if (this.tutors.length > 0) {
        this.currentTutor = this.tutors[0];
      }
    }
  }

  getMockTutors(): TutorProfile[] {
    return [
      {
        uid: '1',
        email: 'syren.doe@example.com',
        role: 'tutor',
        firstName: 'Syren',
        lastName: 'Doe',
        phone: '+1234567890',
        bio: 'Experienced Mathematics tutor with 5 years of teaching experience. Passionate about making complex concepts easy to understand.',
        subjects: ['Mathematics', 'Physics', 'Chemistry'],
        hourlyRate: 50,
        education: 'PhD in Mathematics from MIT',
        createdAt: new Date()
      },
      {
        uid: '2',
        email: 'jhon.mark.smith@example.com',
        role: 'tutor',
        firstName: 'Jhon Mark',
        lastName: 'Smith',
        phone: '+1234567891',
        bio: 'Language enthusiast specializing in English and French. I believe in interactive and fun learning methods.',
        subjects: ['English', 'French', 'Literature'],
        hourlyRate: 40,
        education: 'Master\'s in Linguistics',
        createdAt: new Date()
      },
      {
        uid: '3',
        email: 'mike.johnson@example.com',
        role: 'tutor',
        firstName: 'Mike',
        lastName: 'Johnson',
        phone: '+1234567892',
        bio: 'Computer Science professional with expertise in programming and web development. Let\'s code together!',
        subjects: ['Computer Science', 'Programming', 'Web Development'],
        hourlyRate: 60,
        education: 'BS in Computer Science',
        createdAt: new Date()
      }
    ];
  }

  onPan(event: any) {
    const card = event.target.closest('.tutor-card');
    if (!card) return;

    const deltaX = event.deltaX;
    const rotation = deltaX * 0.03;
    
    this.currentCardStyle = {
      'transform': `translateX(${deltaX}px) rotate(${rotation}deg)`,
      'transition': 'none'
    };

    // Show like/reject indicators based on swipe direction
    if (deltaX > 50) {
      card.classList.add('swiping-right');
      card.classList.remove('swiping-left');
    } else if (deltaX < -50) {
      card.classList.add('swiping-left');
      card.classList.remove('swiping-right');
    } else {
      card.classList.remove('swiping-right', 'swiping-left');
    }
  }

  onPanEnd(event: any) {
    const card = event.target.closest('.tutor-card');
    if (!card) return;

    const deltaX = event.deltaX;
    const threshold = 100;

    if (Math.abs(deltaX) > threshold) {
      // Swipe accepted
      if (deltaX > 0) {
        this.onLike();
      } else {
        this.onReject();
      }
      this.animateSwipe(deltaX > 0 ? 'right' : 'left');
    } else {
      // Reset card position
      this.currentCardStyle = {
        'transform': 'translateX(0) rotate(0)',
        'transition': 'transform 0.3s ease'
      };
      card.classList.remove('swiping-right', 'swiping-left');
    }
  }

  animateSwipe(direction: 'left' | 'right') {
    const distance = direction === 'right' ? 1000 : -1000;
    this.currentCardStyle = {
      'transform': `translateX(${distance}px) rotate(${direction === 'right' ? 30 : -30}deg)`,
      'transition': 'transform 0.5s ease',
      'opacity': 0
    };

    setTimeout(() => {
      this.nextTutor();
    }, 500);
  }

  onLike() {
    if (this.currentTutor) {
      console.log('Liked tutor:', this.currentTutor.firstName);
      // TODO: Save liked tutor to Firebase
    }
  }

  onReject() {
    if (this.currentTutor) {
      console.log('Rejected tutor:', this.currentTutor.firstName);
      // TODO: Save rejected tutor to Firebase
    }
  }

  nextTutor() {
    this.currentTutorIndex++;
    if (this.currentTutorIndex < this.tutors.length) {
      this.currentTutor = this.tutors[this.currentTutorIndex];
      this.currentCardStyle = {};
    } else {
      this.currentTutor = null;
      this.showNoMoreTutors();
    }
  }

  async showNoMoreTutors() {
    const alert = await this.alertCtrl.create({
      header: 'No More Tutors',
      message: 'You\'ve reviewed all available tutors. Check back later for more!',
      buttons: ['OK']
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
