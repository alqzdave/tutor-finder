import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupClientPage } from './signup-client.page';

const routes: Routes = [
  {
    path: '',
    component: SignupClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupClientPageRoutingModule {}
