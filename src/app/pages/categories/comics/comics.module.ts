import { PipesModule } from './../../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComicsPageRoutingModule } from './comics-routing.module';

import { ComicsPage } from './comics.page';
import { ComponentsModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComicsPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [ComicsPage]
})
export class ComicsPageModule {}
