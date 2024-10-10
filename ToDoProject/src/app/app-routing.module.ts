import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TaskboardPickerComponent } from './components/taskboard-picker/taskboard-picker.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { TaskboardCreatorComponent } from './components/taskboard-creator/taskboard-creator.component';
import { TaskboardComponent } from './components/taskboard/taskboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'taskboard',
    component: TaskboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'taskboard-creator',
    component: TaskboardCreatorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'taskboard-picker',
    component: TaskboardPickerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: '',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
