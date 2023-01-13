import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { LuckyWheelComponent } from '../app/lucky-wheel/lucky-wheel.component';
import { HomeComponent } from '../app/home/home.component';
import { RegisterComponent } from '../app/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'luckyWheel', component: LuckyWheelComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
