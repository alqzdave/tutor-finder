import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupClientPageRoutingModule } from './signup-client-routing.module';

import { SignupClientPage } from './signup-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupClientPageRoutingModule
  ],
  declarations: [SignupClientPage]
})
export class SignupClientPageModule {}
