import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardGameRoutingModule } from './card-game-routing.module';
import { CardGameComponent } from './card-game.component';


@NgModule({
  declarations: [
    CardGameComponent
  ],
  imports: [
    CommonModule,
    CardGameRoutingModule
  ]
})
export class CardGameModule { }
