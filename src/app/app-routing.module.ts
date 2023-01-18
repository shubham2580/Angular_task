import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { AuthGuard } from './services/auth.guard';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {path:'', component:LoginSignupComponent},
  {path:'task', component:TaskComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
