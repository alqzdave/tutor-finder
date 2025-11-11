import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupSelectionPageRoutingModule } from './signup-selection-routing.module';

import { SignupSelectionPage } from './signup-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupSelectionPageRoutingModule
  ],
  declarations: [SignupSelectionPage]
})
export class SignupSelectionPageModule {}
