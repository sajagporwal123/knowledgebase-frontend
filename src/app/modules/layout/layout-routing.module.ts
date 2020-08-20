// Generated Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Generated Components
import { LayoutComponent } from './layout.component';

/**
 * Layout Module Routes
 */
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../content/content.module').then((m) => m.ContentModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LayoutRoutingModule {}
