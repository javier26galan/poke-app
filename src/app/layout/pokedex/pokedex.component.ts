import { Component, OnInit, } from '@angular/core';
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

  pokemonDetails: PokeDetail[] = []; // have all the pokemon details
  pokeArr: CardDex[] = []; // have all the names and urls to get the details
  pokemonDetail?: PokeDetail;  //single pokemon detail to send to the pokemon detail component
  pokeList: CardDex[] = this.pokeArr // pokemons to display in de search

  // get the data of all the pokemon
  showAllPokemons() {
    this.pokemonsService.getAllPokemon().subscribe((data: any) => {
      this.pokeArr = data;
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
    let detail = document.getElementById('poke-detail');
    this.pokemonDetail = this.pokemonDetails.find(
      (pokemon) => pokemon.name == name.id
    );
    detail?.classList.remove('hidden')
  }

  searchPokemon(){
    const pokeSearch = (document.getElementById('search') as HTMLInputElement).value;
    const pokeFind = document.getElementsByClassName('poke-list__item')
    for (let i = 0; i < pokeFind.length; i++) {
      const pokemon = pokeFind[i];
      console.log(pokemon.id.includes(pokeSearch));
      if (!pokemon.id.includes(pokeSearch)){
        pokeFind[i].classList.add("ocult")
      }else{
        pokeFind[i].classList.remove('ocult');
      }
    }
  }

  ngOnInit(): void {
    this.showAllPokemons();
  }
}
