import { NgModule } from '@angular/core';
import {FiltroPipe} from './filtro.pipe'
import { DomseguroPipe } from './domseguro.pipe';

@NgModule({
  declarations: [	
    FiltroPipe,
    DomseguroPipe
  ],
  exports: [
    FiltroPipe,
    DomseguroPipe
  ]
})
export class PipesModule { }
