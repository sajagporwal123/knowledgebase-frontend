// Defaults Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

// Generated Components
import { CategoryComponent } from './category/category.component';
import { ContentComponent } from './content/content.component';

// Generated Routing
import { ContentRoutingModule } from './content-routing.module';

// Generated Pipe
import { PipeModule } from '../../../_pipe/pipe.module';
@NgModule({
  declarations: [
    CategoryComponent,
    ContentComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    PipeModule,
  ]
})

export class ContentModule { }
