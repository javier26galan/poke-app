import { Component, Input, OnInit } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { CardDex } from '../../models/cardDex.model';
import { PokeDetail } from 'src/app/models/pokeDetail.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent implements OnInit {
  constructor(private pokemonsService: PokemonsService) {}

  pokemonDetails: PokeDetail[] = [];
  pokeArr: CardDex[] = [];
  pokemonDetail?: PokeDetail;

  // get the data of all the pokemon
  showAllPokemons() {
    this.pokemonsService.getAllPokemon().subscribe((data: any) => {
      this.pokeArr = data;
      console.log(this.pokeArr);
      this.pokeArr.forEach((pokemon) => {
        // transform the data to the model
        this.pokemonsService.getPokemon(pokemon.url).subscribe((data: any) => {
          // transfor the data-types to a array of strings
          const types = [];
          for (let i = 0; i < data.types.length; i++) {
            const element = data.types[i].type.name;
            types.push(element)
          }
          let transformedData = {
            name: data.name,
            sprite: data.sprites.front_default,
            type: types,
            weight: data.weight,
            height: data.height,
          };
          this.pokemonDetails.push(transformedData);
        });
      });
    });
  }

  // click to display the pokemon detail
  onClickDetail(e: any) {
    let name = e.target;
    this.pokemonDetail = this.pokemonDetails.find(
      (pokemon) => pokemon.name == name.id
    );
    console.log(this.pokemonDetail);
    // console.log(name.id);
  }

  ngOnInit(): void {
    this.showAllPokemons();
  }
}
