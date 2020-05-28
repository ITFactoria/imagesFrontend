import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './domsanitizer.pipe';



@NgModule({
  declarations: [DomSanitizerPipe],
  imports: [
    CommonModule
  ],
  exports:[DomSanitizerPipe]
})
export class PipesModule { }

