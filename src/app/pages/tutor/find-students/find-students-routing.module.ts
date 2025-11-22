import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindStudentsPage } from './find-students.page';

const routes: Routes = [
  {
    path: '',
    component: FindStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindStudentsPageRoutingModule {}
