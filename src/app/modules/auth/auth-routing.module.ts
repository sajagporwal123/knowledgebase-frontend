// Default Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Generated Components
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

/**
 * User Module Routes
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: SignUpComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AuthRoutingModule {}
