import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupTutorPageRoutingModule } from './signup-tutor-routing.module';

import { SignupTutorPage } from './signup-tutor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupTutorPageRoutingModule
  ],
  declarations: [SignupTutorPage]
})
export class SignupTutorPageModule {}
