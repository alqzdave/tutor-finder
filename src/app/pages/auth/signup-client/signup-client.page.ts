import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.page.html',
  styleUrls: ['./signup-client.page.scss'],
  standalone: false
})
export class SignupClientPage implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onSignup() {
    // Validation
    if (!this.firstName || !this.lastName || !this.email || !this.phone || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Creating your account...',
    });
    await loading.present();

    try {
      await this.authService.register(
        this.email,
        this.password,
        'client',
        {
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone
        }
      );
      await loading.dismiss();
      
      const alert = await this.alertCtrl.create({
        header: 'Success!',
        message: 'Your account has been created successfully',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/client-dashboard']);
          }
        }]
      });
      await alert.present();
    } catch (error: any) {
      await loading.dismiss();
      this.errorMessage = error.message;
      
      const alert = await this.alertCtrl.create({
        header: 'Registration Failed',
        message: this.errorMessage,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
