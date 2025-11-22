import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindTutorPageRoutingModule } from './find-tutor-routing.module';

import { FindTutorPage } from './find-tutor.page';
import { TutorProfileModalComponent } from '../tutor-profile-modal/tutor-profile-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindTutorPageRoutingModule
  ],
  declarations: [FindTutorPage, TutorProfileModalComponent]
})
export class FindTutorPageModule {}
