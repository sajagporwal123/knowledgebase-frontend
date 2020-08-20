// Defaults Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Generated Components
import { CategoryComponent } from './category/category.component';
import { ContentComponent } from './content/content.component';

/**
 * Content Module Routes
 */
const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
  },
  {
    path: 'content',
    component: ContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ContentRoutingModule { }
