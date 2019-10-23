import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterpriseComponent } from './Enterprise/Enterprise.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { EnterpriseEditComponent } from './EnterpriseEdit/EnterpriseEdit.component';


const routes: Routes = [
  /*{path: 'user', component: UserComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'login2', component: Login2Component},
      {path: 'registration', component: RegistrationComponent}
    ]
  */

  {path: 'enterprise', component: EnterpriseComponent},
  {path: 'enterprise/id/edit', component: EnterpriseEditComponent},
  // {path: 'enterprise/:id/edit', component: EnterpriseEditComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
