import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { cardDex } from '../../models/cardDex.model';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  constructor(private pokemonsService: PokemonsService) { }

  pokeArr:cardDex[] = []

  showAllPokemons(){
    this.pokemonsService.getAllPokemon()
      .subscribe((data:any) => {
        data.results.forEach((pokemon: any) => {
          this.pokeArr.push(pokemon)
        });
      });
  }

  ngOnInit(): void {
    this.showAllPokemons();
    console.log(this.pokeArr);
  }

}
