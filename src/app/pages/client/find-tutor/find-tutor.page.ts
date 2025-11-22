import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TutorProfileModalComponent } from '../tutor-profile-modal/tutor-profile-modal.component';
import { AuthService } from '../../../services/auth';
import { TutorProfile } from '../../../models/user.model';

@Component({
  selector: 'app-find-tutor',
  templateUrl: './find-tutor.page.html',
  styleUrls: ['./find-tutor.page.scss'],
  standalone: false
})
export class FindTutorPage implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = '';
  filteredTutors: any[] = [];

  categories = [
    { id: 'math', name: 'Math', icon: 'calculator-outline' },
    { id: 'english', name: 'English', icon: 'book-outline' },
    { id: 'science', name: 'Science', icon: 'flask-outline' },
    { id: 'filipino', name: 'Filipino', icon: 'flag-outline' },
    { id: 'computer', name: 'Computer', icon: 'code-slash-outline' },
    { id: 'accounting', name: 'Accounting', icon: 'calculator-outline' },
    { id: 'more', name: 'More', icon: 'ellipsis-horizontal-outline' }
  ];

  // Mock tutor data
  tutors: any[] = [
    {
      id: 1,
      name: 'Maria Santos',
      subject: 'Mathematics Tutor',
      rating: 4.9,
      reviews: 128,
      priceRange: '400-500/hr',
      bio: 'Experienced math tutor specializing in high school and college-level mathematics. Patient and dedicated to student success.',
      photoURL: '',
      type: 'Online',
      isFavorite: false
    },
    {
      id: 2,
      name: 'John Rodriguez',
      subject: 'English & Literature Tutor',
      rating: 4.8,
      reviews: 95,
      priceRange: '350-450/hr',
      bio: 'Passionate English teacher with 8 years experience. Specializing in grammar, writing, and literature analysis.',
      photoURL: '',
      type: 'Face-to-Face',
      isFavorite: false
    },
    {
      id: 3,
      name: 'Sarah Chen',
      subject: 'Programming & Web Development',
      rating: 5.0,
      reviews: 156,
      priceRange: '600-800/hr',
      bio: 'Full-stack developer and coding instructor. Expert in JavaScript, Python, and web technologies.',
      photoURL: '',
      type: 'Online',
      isFavorite: false
    },
    {
      id: 4,
      name: 'Miguel Torres',
      subject: 'Science & Chemistry Tutor',
      rating: 4.7,
      reviews: 82,
      priceRange: '380-480/hr',
      bio: 'Chemistry professor with a passion for teaching. Making complex concepts easy to understand.',
      photoURL: '',
      type: 'Both',
      isFavorite: true
    }
  ];

  constructor(
    private modalController: ModalController,
    private router: Router,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    await this.loadTutors();
  }

  async ionViewWillEnter() {
    // Reload tutors every time the page is entered
    await this.loadTutors();
  }

  async loadTutors() {
    try {
      const tutorsFromDb = await this.authService.getAllTutors();
      
      // Map Firebase tutor data to display format - keep all original data
      this.tutors = tutorsFromDb.map((tutor: TutorProfile) => {
        const fullName = tutor.fullName || tutor.displayName || `${tutor.firstName || ''} ${tutor.lastName || ''}`.trim();
        const subjects = tutor.subjectsTaught || tutor.subjects || [];
        const preferredMode = tutor.preferences?.preferredMode || 'Both';
        
        return {
          // Keep ALL original tutor data for the modal
          ...tutor,
          // Add display-friendly properties
          id: tutor.uid,
          name: fullName,
          subject: tutor.specialization || subjects.join(', ') || 'General Tutor',
          rating: tutor.rating || 4.5,
          reviews: tutor.totalReviews || 0,
          priceRange: `₱${tutor.hourlyRate || 0}/hr`,
          bio: tutor.bio || 'No bio available',
          photoURL: tutor.photoURL || '',
          type: preferredMode, // Use actual preferred mode
          isFavorite: false
        };
      });
      
      this.filteredTutors = [...this.tutors];
    } catch (error) {
      console.error('Error loading tutors:', error);
      // Keep mock data as fallback
      this.filteredTutors = [...this.tutors];
    }
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchQuery = query;
    this.applyFilters();
  }

  selectCategory(categoryId: string) {
    if (this.selectedCategory === categoryId) {
      this.selectedCategory = '';
    } else {
      this.selectedCategory = categoryId;
    }
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.tutors];

    // Filter by search query
    if (this.searchQuery.trim()) {
      filtered = filtered.filter(tutor => 
        tutor.name.toLowerCase().includes(this.searchQuery) ||
        tutor.subject.toLowerCase().includes(this.searchQuery) ||
        tutor.bio.toLowerCase().includes(this.searchQuery)
      );
    }

    // Filter by category
    if (this.selectedCategory && this.selectedCategory !== 'more') {
      filtered = filtered.filter(tutor => 
        tutor.subject.toLowerCase().includes(this.selectedCategory)
      );
    }

    this.filteredTutors = filtered;
  }

  async openFilters() {
    console.log('Opening filters modal');
    // TODO: Open filter modal with all filter options
  }

  toggleFavorite(tutor: any, event: Event) {
    event.stopPropagation();
    tutor.isFavorite = !tutor.isFavorite;
    console.log('Toggled favorite for:', tutor.name);
  }

  async viewTutorProfile(tutor: any) {
    const modal = await this.modalController.create({
      component: TutorProfileModalComponent,
      componentProps: { tutor }
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data?.action === 'message') {
      console.log('Navigate to messages');
      // TODO: Navigate to messages page
    } else if (data?.action === 'book') {
      console.log('Navigate to booking');
      // TODO: Navigate to booking page
    }
  }

  // Bottom Tab Navigation
  onTabHome() {
    this.router.navigate(['/client-dashboard']);
  }

  onTabMessages() {
    console.log('Navigate to messages');
    // TODO: Create messages page and navigate
  }

  onTabProfile() {
    this.router.navigate(['/client/profile']);
  }
}
