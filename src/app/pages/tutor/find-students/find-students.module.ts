import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindStudentsPageRoutingModule } from './find-students-routing.module';

import { FindStudentsPage } from './find-students.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindStudentsPageRoutingModule
  ],
  declarations: [FindStudentsPage]
})
export class FindStudentsPageModule {}
