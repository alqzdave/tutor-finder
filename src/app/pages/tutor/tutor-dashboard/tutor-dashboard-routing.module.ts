import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorDashboardPage } from './tutor-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: TutorDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorDashboardPageRoutingModule {}
