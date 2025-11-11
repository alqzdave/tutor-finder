import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorDashboardPageRoutingModule } from './tutor-dashboard-routing.module';

import { TutorDashboardPage } from './tutor-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorDashboardPageRoutingModule
  ],
  declarations: [TutorDashboardPage]
})
export class TutorDashboardPageModule {}
