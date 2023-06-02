import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexRoutingModule } from './pokedex-routing.module';
import { PokedexComponent } from './pokedex.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';


@NgModule({
  declarations: [
    PokedexComponent,
    PokemonDetailComponent
  ],
  imports: [
    CommonModule,
    PokedexRoutingModule,
  ]
})
export class PokedexModule { }
