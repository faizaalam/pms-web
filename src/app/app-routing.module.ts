import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NlmDataComponent } from './nlm-data/nlm-data.component';
import { PrescriptionManagementComponent } from './prescription-management/prescription-management.component';

const routes: Routes = [
  { path: 'prescription-management', component: PrescriptionManagementComponent },
  { path: 'nlm-data', component: NlmDataComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
