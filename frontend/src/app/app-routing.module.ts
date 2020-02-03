import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/components/home/home.component';
import { QuestionComponent } from '../app/components/question/question.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { QuestionAddComponent } from './components/question-add/question-add.component';
import { AboutComponent } from './components/about/about.component';
import { RulesComponent } from './components/rules/rules.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'question/:id', component: QuestionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'question-add', component: QuestionAddComponent, canActivate: [AuthGuard] },
  { path: 'about', component:  AboutComponent},
  { path: 'rules', component: RulesComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
