import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../../../services/auth';
import { ClientProfile } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  profile: ClientProfile = {
    uid: '',
    email: '',
    role: 'client',
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
    gradeLevel: '',
    bio: '',
    interests: [],
    learningGoals: '',
    preferredSubjects: [],
    budget: 0,
    createdAt: new Date()
  };

  isEditMode = false;
  isEditingBio = false;
  isEditingPreferences = false;

  // Temporary variables for editing
  editedProfile: any = {};
  editedBio: string = '';
  editedInterests: string = '';
  editedGoals: string = '';
  editedPreferences: any = {};

  genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  tutorGenderOptions = ['Any', 'Male', 'Female'];
  scheduleOptions = ['Morning', 'Afternoon', 'Evening'];

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
          this.profile = userProfile as ClientProfile;
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

  toggleEditMode() {
    if (!this.isEditMode) {
      // Entering edit mode - copy current values
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
      // Update profile with edited values
      Object.assign(this.profile, this.editedProfile);
      
      // TODO: Save to Firebase
      // await this.authService.updateUserProfile(this.profile);
      
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

  toggleEditBio() {
    if (!this.isEditingBio) {
      // Entering edit mode - copy current values
      this.editedBio = this.profile.bio || '';
      this.editedInterests = this.profile.interests?.join(', ') || '';
      this.editedGoals = this.profile.learningGoals || '';
    }
    this.isEditingBio = !this.isEditingBio;
  }

  cancelEditBio() {
    this.isEditingBio = false;
    this.editedBio = '';
    this.editedInterests = '';
    this.editedGoals = '';
  }

  async saveBio() {
    try {
      // Update bio information
      this.profile.bio = this.editedBio;
      this.profile.interests = this.editedInterests.split(',').map(i => i.trim()).filter(i => i);
      this.profile.learningGoals = this.editedGoals;
      
      // TODO: Save to Firebase
      // await this.authService.updateUserProfile(this.profile);
      
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Bio updated successfully!',
        buttons: ['OK']
      });
      await alert.present();
      
      this.isEditingBio = false;
      this.editedBio = '';
      this.editedInterests = '';
      this.editedGoals = '';
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

  goBack() {
    this.router.navigate(['/client-dashboard']);
  }

  toggleEditPreferences() {
    if (!this.isEditingPreferences) {
      // Entering edit mode - copy current values
      this.editedPreferences = {
        preferredTutorGender: this.profile.preferences?.preferredTutorGender || 'Any',
        minPrice: this.profile.preferences?.minPrice || 100,
        maxPrice: this.profile.preferences?.maxPrice || 1000,
        preferredSchedule: this.profile.preferences?.preferredSchedule || []
      };
    }
    this.isEditingPreferences = !this.isEditingPreferences;
  }

  cancelEditPreferences() {
    this.isEditingPreferences = false;
    this.editedPreferences = {};
  }

  async savePreferences() {
    try {
      // Update preferences
      if (!this.profile.preferences) {
        this.profile.preferences = {};
      }
      this.profile.preferences.preferredTutorGender = this.editedPreferences.preferredTutorGender;
      this.profile.preferences.minPrice = this.editedPreferences.minPrice;
      this.profile.preferences.maxPrice = this.editedPreferences.maxPrice;
      this.profile.preferences.preferredSchedule = this.editedPreferences.preferredSchedule;
      
      // TODO: Save to Firebase
      // await this.authService.updateUserProfile(this.profile);
      
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Preferences updated successfully!',
        buttons: ['OK']
      });
      await alert.present();
      
      this.isEditingPreferences = false;
      this.editedPreferences = {};
    } catch (error) {
      console.error('Error saving preferences:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to update preferences. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  isScheduleSelected(schedule: string): boolean {
    return this.editedPreferences.preferredSchedule?.includes(schedule) || false;
  }

  toggleSchedule(schedule: string) {
    if (!this.editedPreferences.preferredSchedule) {
      this.editedPreferences.preferredSchedule = [];
    }
    const index = this.editedPreferences.preferredSchedule.indexOf(schedule);
    if (index > -1) {
      this.editedPreferences.preferredSchedule.splice(index, 1);
    } else {
      this.editedPreferences.preferredSchedule.push(schedule);
    }
  }

  async onChangePassword() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      message: 'This feature will be available soon.',
      buttons: ['OK']
    });
    await alert.present();
    console.log('Change Password clicked');
  }

  async onAccountSecurity() {
    const alert = await this.alertController.create({
      header: 'Account Security',
      message: 'This feature will be available soon.',
      buttons: ['OK']
    });
    await alert.present();
    console.log('Account Security clicked');
  }

  async onNotificationSettings() {
    const alert = await this.alertController.create({
      header: 'Notification Settings',
      message: 'This feature will be available soon.',
      buttons: ['OK']
    });
    await alert.present();
    console.log('Notification Settings clicked');
  }

  async onPrivacySettings() {
    const alert = await this.alertController.create({
      header: 'Privacy Settings',
      message: 'This feature will be available soon.',
      buttons: ['OK']
    });
    await alert.present();
    console.log('Privacy Settings clicked');
  }

  // Tab Navigation Methods
  onTabHome() {
    this.router.navigate(['/client-dashboard']);
  }

  onTabFindTutor() {
    this.router.navigate(['/find-tutor']);
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
