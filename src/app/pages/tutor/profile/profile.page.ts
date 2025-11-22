import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../../../services/auth';
import { TutorProfile } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  profile: TutorProfile = {
    uid: '',
    email: '',
    role: 'tutor',
    firstName: '',
    lastName: '',
    fullName: '',
    username: '',
    mobileNumber: '',
    gender: '',
    birthday: '',
    address: '',
    city: '',
    province: '',
    photoURL: '',
    bio: '',
    subjects: [],
    subjectsTaught: [],
    hourlyRate: 0,
    education: '',
    experienceYears: 0,
    experienceDescription: '',
    teachingStyle: '',
    specialization: '',
    createdAt: new Date()
  };

  isEditMode = false;
  isEditingBio = false;
  isEditingExperience = false;
  isEditingSubjects = false;

  // Temporary variables for editing
  editedProfile: any = {};
  editedBio: string = '';
  editedSpecialization: string = '';
  editedEducation: string = '';
  editedExperienceYears: number = 0;
  editedExperienceDescription: string = '';
  editedTeachingStyle: string = '';
  editedSubjects: string[] = [];
  editedHourlyRate: number = 0;
  editedPreferredMode: string = 'Both';
  editedAvailableSchedule: string[] = [];
  otherSubjects: string = '';

  genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  scheduleOptions = ['Morning', 'Afternoon', 'Evening'];
  modeOptions = ['Online', 'Face-to-face', 'Both'];

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {
    try {
      const currentUser = await this.authService.getCurrentUser();
      if (currentUser) {
        const userProfile = await this.authService.getUserProfile(currentUser.uid);
        if (userProfile) {
          this.profile = userProfile as TutorProfile;
          // Initialize preferences if not exists
          if (!this.profile.preferences) {
            this.profile.preferences = {
              preferredMode: 'Both',
              availableSchedule: []
            };
          }
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  async changePhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Change Profile Photo',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => {
            console.log('Take photo clicked');
            // TODO: Implement camera functionality
          }
        },
        {
          text: 'Choose from Gallery',
          icon: 'images',
          handler: () => {
            console.log('Choose from gallery clicked');
            // TODO: Implement gallery picker
          }
        },
        {
          text: 'Remove Photo',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.profile.photoURL = '';
            console.log('Photo removed');
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  // Personal Information Methods
  toggleEditMode() {
    if (!this.isEditMode) {
      this.editedProfile = { ...this.profile };
    }
    this.isEditMode = !this.isEditMode;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editedProfile = {};
  }

  async savePersonalInfo() {
    try {
      Object.assign(this.profile, this.editedProfile);
      
      await this.authService.updateUserProfile(this.profile.uid, this.profile);
      
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Personal information updated successfully!',
        buttons: ['OK']
      });
      await alert.present();
      
      this.isEditMode = false;
      this.editedProfile = {};
    } catch (error) {
      console.error('Error saving profile:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to update profile. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Bio Section Methods
  toggleEditBio() {
    if (!this.isEditingBio) {
      this.editedBio = this.profile.bio || '';
      this.editedSpecialization = this.profile.specialization || '';
      this.editedEducation = this.profile.education || '';
    }
    this.isEditingBio = !this.isEditingBio;
  }

  cancelEditBio() {
    this.isEditingBio = false;
    this.editedBio = '';
    this.editedSpecialization = '';
    this.editedEducation = '';
  }

  async saveBio() {
    try {
      this.profile.bio = this.editedBio;
      this.profile.specialization = this.editedSpecialization;
      this.profile.education = this.editedEducation;
      
      await this.authService.updateUserProfile(this.profile.uid, {
        bio: this.profile.bio,
        specialization: this.profile.specialization,
        education: this.profile.education
      });
      
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Bio updated successfully!',
        buttons: ['OK']
      });
      await alert.present();
      
      this.isEditingBio = false;
      this.editedBio = '';
      this.editedSpecialization = '';
      this.editedEducation = '';
    } catch (error) {
      console.error('Error saving bio:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to update bio. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Experience Section Methods
  toggleEditExperience() {
    if (!this.isEditingExperience) {
      this.editedExperienceYears = this.profile.experienceYears || 0;
      this.editedExperienceDescription = this.profile.experienceDescription || '';
      this.editedTeachingStyle = this.profile.teachingStyle || '';
    }
    this.isEditingExperience = !this.isEditingExperience;
  }

  cancelEditExperience() {
    this.isEditingExperience = false;
    this.editedExperienceYears = 0;
    this.editedExperienceDescription = '';
    this.editedTeachingStyle = '';
  }

  async saveExperience() {
    try {
      this.profile.experienceYears = this.editedExperienceYears;
      this.profile.experienceDescription = this.editedExperienceDescription;
      this.profile.teachingStyle = this.editedTeachingStyle;
      
      await this.authService.updateUserProfile(this.profile.uid, {
        experienceYears: this.profile.experienceYears,
        experienceDescription: this.profile.experienceDescription,
        teachingStyle: this.profile.teachingStyle
      });
      
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Experience updated successfully!',
        buttons: ['OK']
      });
      await alert.present();
      
      this.isEditingExperience = false;
      this.editedExperienceYears = 0;
      this.editedExperienceDescription = '';
      this.editedTeachingStyle = '';
    } catch (error) {
      console.error('Error saving experience:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to update experience. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Subjects & Preferences Methods
  toggleEditSubjects() {
    if (!this.isEditingSubjects) {
      this.editedSubjects = [...(this.profile.subjectsTaught || [])];
      this.editedHourlyRate = this.profile.hourlyRate || 0;
      this.editedPreferredMode = this.profile.preferences?.preferredMode || 'Both';
      this.editedAvailableSchedule = [...(this.profile.preferences?.availableSchedule || [])];
      
      // Extract "Other" subjects if any exist
      const predefinedSubjects = ['Mathematics', 'English', 'Science', 'Filipino', 'History', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Accounting', 'Economics', 'Music', 'Art'];
      const otherSubjects = this.editedSubjects.filter((s: string) => !predefinedSubjects.includes(s));
      
      if (otherSubjects.length > 0) {
        this.otherSubjects = otherSubjects.join(', ');
        if (!this.editedSubjects.includes('Other')) {
          this.editedSubjects.push('Other');
        }
      } else {
        this.otherSubjects = '';
      }
    }
    this.isEditingSubjects = !this.isEditingSubjects;
  }

  hasOtherSubject(): boolean {
    return this.editedSubjects?.includes('Other');
  }

  updateOtherSubjects() {
    // Called when user types in other subjects field
  }

  cancelEditSubjects() {
    this.isEditingSubjects = false;
    this.editedSubjects = [];
    this.editedHourlyRate = 0;
    this.editedPreferredMode = 'Both';
    this.editedAvailableSchedule = [];
    this.otherSubjects = '';
  }

  async saveSubjects() {
    try {
      // Process subjects - merge predefined and "Other"
      let finalSubjects = [...this.editedSubjects];
      finalSubjects = finalSubjects.filter(s => s !== 'Other');
      
      if (this.hasOtherSubject() && this.otherSubjects.trim()) {
        const customSubjects = this.otherSubjects.split(',').map(s => s.trim()).filter(s => s);
        finalSubjects = [...finalSubjects, ...customSubjects];
      }
      
      this.profile.subjectsTaught = finalSubjects;
      this.profile.subjects = finalSubjects; // Keep both for compatibility
      this.profile.hourlyRate = this.editedHourlyRate;
      
      if (!this.profile.preferences) {
        this.profile.preferences = {};
      }
      this.profile.preferences.preferredMode = this.editedPreferredMode;
      this.profile.preferences.availableSchedule = this.editedAvailableSchedule;
      
      await this.authService.updateUserProfile(this.profile.uid, {
        subjectsTaught: this.profile.subjectsTaught,
        subjects: this.profile.subjects,
        hourlyRate: this.profile.hourlyRate,
        preferences: this.profile.preferences
      });
      
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Subjects and preferences updated successfully!',
        buttons: ['OK']
      });
      await alert.present();
      
      this.isEditingSubjects = false;
      this.editedSubjects = [];
      this.editedHourlyRate = 0;
      this.editedPreferredMode = 'Both';
      this.editedAvailableSchedule = [];
      this.otherSubjects = '';
    } catch (error) {
      console.error('Error saving subjects:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to update subjects. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  isScheduleSelected(schedule: string): boolean {
    return this.editedAvailableSchedule?.includes(schedule) || false;
  }

  toggleSchedule(schedule: string) {
    if (!this.editedAvailableSchedule) {
      this.editedAvailableSchedule = [];
    }
    const index = this.editedAvailableSchedule.indexOf(schedule);
    if (index > -1) {
      this.editedAvailableSchedule.splice(index, 1);
    } else {
      this.editedAvailableSchedule.push(schedule);
    }
  }

  // Account Management Methods
  async onChangePassword() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      message: 'This feature will be available soon.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async onAccountSecurity() {
    const alert = await this.alertController.create({
      header: 'Account Security',
      message: 'This feature will be available soon.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async onNotificationSettings() {
    const alert = await this.alertController.create({
      header: 'Notification Settings',
      message: 'This feature will be available soon.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async onPrivacySettings() {
    const alert = await this.alertController.create({
      header: 'Privacy Settings',
      message: 'This feature will be available soon.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Tab Navigation Methods
  onTabHome() {
    this.router.navigate(['/tutor-dashboard']);
  }

  onTabFindStudents() {
    this.router.navigate(['/find-students']);
  }

  onTabMessages() {
    console.log('Messages tab clicked');
    // TODO: Navigate to Messages page
  }

  onTabProfile() {
    // Already on profile page
    console.log('Already on Profile page');
  }

}
