import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FullBackgroundComponent } from './components/full-background/full-background.component';
import { BlockComponent } from './components/block/block.component';

/*
SharedModule contains common:
  1. components
  2. pipes
  3. directives
  4. export commonly used Angular modules (like CommonModule).
SharedModule can be imported by any feature module.
*/

@NgModule({
  declarations: [FullBackgroundComponent, BlockComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FullBackgroundComponent,
    BlockComponent
  ],
  providers: [
  ]
})
export class SharedModule {
}
