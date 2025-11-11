import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupTutorPage } from './signup-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: SignupTutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupTutorPageRoutingModule {}
