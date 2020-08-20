// Default Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Generated Guards
import { AuthGuard } from '../_guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../src/app/modules/layout/layout.module').then(
        (m) => m.LayoutModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../../src/app/modules/auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
  { path: '**', redirectTo: '/' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
