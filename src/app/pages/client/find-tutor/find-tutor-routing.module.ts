import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindTutorPage } from './find-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: FindTutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindTutorPageRoutingModule {}
