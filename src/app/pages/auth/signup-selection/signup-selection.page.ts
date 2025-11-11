import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-selection',
  templateUrl: './signup-selection.page.html',
  styleUrls: ['./signup-selection.page.scss'],
  standalone: false
})
export class SignupSelectionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectRole(role: 'client' | 'tutor') {
    if (role === 'client') {
      this.router.navigate(['/signup-client']);
    } else {
      this.router.navigate(['/signup-tutor']);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
