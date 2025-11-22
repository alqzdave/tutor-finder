import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tutor-profile-modal',
  templateUrl: './tutor-profile-modal.component.html',
  styleUrls: ['./tutor-profile-modal.component.scss'],
  standalone: false
})
export class TutorProfileModalComponent {
  @Input() tutor: any;

  // Extended tutor data for the full profile
  tutorProfile = {
    experience: '8 years of teaching experience',
    subjects: ['Mathematics', 'Physics', 'Statistics', 'Calculus'],
    education: 'Master of Science in Mathematics Education',
    teachingStyle: 'I focus on building strong foundational understanding through interactive problem-solving and real-world applications. My approach is student-centered and adaptable to different learning styles.',
    schedule: [
      { day: 'Monday', time: '2:00 PM - 6:00 PM', available: true },
      { day: 'Tuesday', time: '2:00 PM - 6:00 PM', available: true },
      { day: 'Wednesday', time: '2:00 PM - 6:00 PM', available: true },
      { day: 'Thursday', time: '2:00 PM - 6:00 PM', available: true },
      { day: 'Friday', time: '2:00 PM - 6:00 PM', available: true },
      { day: 'Saturday', time: '9:00 AM - 5:00 PM', available: true },
      { day: 'Sunday', time: 'Not Available', available: false }
    ],
    reviews: [
      {
        studentName: 'Juan Dela Cruz',
        rating: 5,
        comment: 'Excellent tutor! Very patient and explains concepts clearly. Highly recommended!',
        date: '2 weeks ago'
      },
      {
        studentName: 'Maria Santos',
        rating: 5,
        comment: 'Best math tutor I\'ve ever had. Made difficult topics easy to understand.',
        date: '1 month ago'
      },
      {
        studentName: 'Pedro Reyes',
        rating: 4,
        comment: 'Great teaching style and very knowledgeable. Would book again.',
        date: '2 months ago'
      }
    ]
  };

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  messageTutor() {
    console.log('Message tutor:', this.tutor?.name);
    // TODO: Navigate to messages or open chat
    this.modalController.dismiss({ action: 'message' });
  }

  bookNow() {
    console.log('Book tutor:', this.tutor?.name);
    // TODO: Navigate to booking page
    this.modalController.dismiss({ action: 'book' });
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}
