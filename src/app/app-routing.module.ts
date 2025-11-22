import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup-selection',
    loadChildren: () => import('./pages/auth/signup-selection/signup-selection.module').then( m => m.SignupSelectionPageModule)
  },
  {
    path: 'signup-client',
    loadChildren: () => import('./pages/auth/signup-client/signup-client.module').then( m => m.SignupClientPageModule)
  },
  {
    path: 'signup-tutor',
    loadChildren: () => import('./pages/auth/signup-tutor/signup-tutor.module').then( m => m.SignupTutorPageModule)
  },
  {
    path: 'client-dashboard',
    loadChildren: () => import('./pages/client/client-dashboard/client-dashboard.module').then( m => m.ClientDashboardPageModule)
  },
  {
    path: 'tutor-dashboard',
    loadChildren: () => import('./pages/tutor/tutor-dashboard/tutor-dashboard.module').then( m => m.TutorDashboardPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'client/profile',
    loadChildren: () => import('./pages/client/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'find-tutor',
    loadChildren: () => import('./pages/client/find-tutor/find-tutor.module').then( m => m.FindTutorPageModule)
  },
  {
    path: 'find-students',
    loadChildren: () => import('./pages/tutor/find-students/find-students.module').then( m => m.FindStudentsPageModule)
  },
  {
    path: 'tutor/profile',
    loadChildren: () => import('./pages/tutor/profile/profile.module').then( m => m.ProfilePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
