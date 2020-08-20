// Default Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custome Pipes
import { ListFilterPipe } from './list-filter.pipe';
@NgModule({
  declarations: [
    ListFilterPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ListFilterPipe,
  ],
})

export class PipeModule {}
