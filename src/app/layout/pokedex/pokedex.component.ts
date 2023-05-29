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

  pokeArr!:cardDex[]

  showAllPokemons(){
    this.pokemonsService.getAllPokemon()
      .subscribe((data) => {
        console.log(data.results.length);
        return data.result;
      });
  }

  ngOnInit(): void {
    // this.pokeArr = this.showAllPokemons();
    this.showAllPokemons();

  }

}
