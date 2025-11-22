import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tutor-profile-modal',
  templateUrl: './tutor-profile-modal.component.html',
  styleUrls: ['./tutor-profile-modal.component.scss'],
  standalone: false
})
export class TutorProfileModalComponent implements OnInit {
  @Input() tutor: any;

  // This will be populated from the actual tutor data
  tutorProfile: any = {};

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    // Populate profile from actual tutor data
    this.tutorProfile = {
      experience: this.tutor?.experienceDescription || this.tutor?.experience || 'No experience information provided',
      experienceYears: this.tutor?.experienceYears || 0,
      subjects: this.tutor?.subjectsTaught || this.tutor?.subjects || [],
      education: this.tutor?.education || 'Not specified',
      teachingStyle: this.tutor?.teachingStyle || 'No teaching style description provided',
      bio: this.tutor?.bio || 'No bio provided',
      specialization: this.tutor?.specialization || this.tutor?.subject || 'General Tutor',
      hourlyRate: this.tutor?.hourlyRate || this.tutor?.priceRange || 'Contact for pricing',
      preferredMode: this.tutor?.preferences?.preferredMode || 'Both',
      availableSchedule: this.tutor?.preferences?.availableSchedule || [],
      schedule: this.generateScheduleFromAvailability(),
      reviews: this.tutor?.reviews || []
    };
  }

  generateScheduleFromAvailability() {
    const availableSchedule = this.tutor?.preferences?.availableSchedule || [];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Map schedule preferences to time slots
    const timeMap: any = {
      'Morning': '9:00 AM - 12:00 PM',
      'Afternoon': '2:00 PM - 6:00 PM',
      'Evening': '6:00 PM - 9:00 PM'
    };

    return days.map(day => {
      let times: string[] = [];
      availableSchedule.forEach((slot: string) => {
        if (timeMap[slot]) {
          times.push(timeMap[slot]);
        }
      });

      return {
        day: day,
        time: times.length > 0 ? times.join(', ') : 'Not Available',
        available: times.length > 0
      };
    });
  }

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
