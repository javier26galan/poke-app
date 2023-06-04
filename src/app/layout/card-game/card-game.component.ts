import { Component, OnInit } from '@angular/core';
import { CardDex } from 'src/app/models/cardDex.model';
import { CardGame } from 'src/app/models/cardGame.model';
import { PokeDetail } from 'src/app/models/pokeDetail.model';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css'],
})
export class CardGameComponent implements OnInit {
  constructor(private pokemonsService: PokemonsService) {}

  pokemonDetails: PokeDetail[] = []; // have all the pokemon details
  pokeArr: CardDex[] = []; // have all the names and urls to get the details
  gameArr: CardGame[] = []; // the cards in the game
  chosenArr: CardGame[] = []; // picked cards
  life!: number; // number of trys
  GAMEOVER: boolean = true; // true to finish the game
  POINTS: number = 0; // to check wen the game is won

  // game loop
  cardGameLoop() {
    this.POINTS = 0;
    this.GAMEOVER = false;
    this.life = 3;
    this.getDataCards();
  }

  // change the side of the card if false or continue if true
  handleSelection(checked: boolean, arr: CardGame[]) {
      if (!checked) {
        this.life--;
        // in timeout to delay the turn of the card
        setTimeout(() => {
          for (let i = 0; i < arr.length; i++) {
            arr[i].side = false;
            document.getElementById(`${arr[i].name}`)?.classList.add("back");
          }
        }, 500);
      } else {
        this.POINTS++;
      }

  }

  // check the chosen cards
  checkPokemon(arr: CardGame[]) {
    return arr[0].id == arr[1].id;
  }

  // select a card and change side
  pickCard($event: any) {
    let name = $event.target.id;
    let img = $event.target.childNodes[0];
    const gameContainer = document.getElementById("game");
    gameContainer?.classList.add('disabled');
    $event.target.classList.remove('back');
    img.classList.add('animation');
    // take the selected card a put it in the chosen array
    for (let i = 0; i < this.gameArr.length; i++) {
      if (this.gameArr[i].name == name) {
        this.gameArr[i].side = true;
        this.chosenArr.push(this.gameArr[i]);
      }
    }
    // check the chosen cards if there are 2 in the chosenArr and empty it
    if (this.chosenArr.length == 2) {
      let check = this.checkPokemon(this.chosenArr);
      this.handleSelection(check, this.chosenArr);
      this.chosenArr = [];
    }
    // eliminate the animation class
    setTimeout(() => {
      img.classList.remove('animation');
      gameContainer?.classList.remove('disabled');
    }, 1000);
    if (this.life == 0) {
      alert('Game over');
      this.GAMEOVER = true;
    }
    if (this.POINTS == this.gameArr.length / 2) {
      alert('You won');
      this.GAMEOVER = true;
    }
  }

  // randomize the content of an array
  randomArr() {
    return Math.floor(Math.random() - 0.5);
  }

  // get 6 CardGame into array gameArr
  getDataCards() {
    if (this.gameArr.length > 0) {
      this.gameArr = [];
    }
    let pokemons = [
      this.pokemonDetails[Math.floor(Math.random() * 151)],
      this.pokemonDetails[Math.floor(Math.random() * 151)],
      this.pokemonDetails[Math.floor(Math.random() * 151)],
    ];
    // add id to check later
    let id_num = 0;
    pokemons.forEach((pokemon) => {
      let poke = {
        name: pokemon.name,
        sprite: pokemon.sprite,
        side: false,
        id: id_num,
      };
      let pokeCopy = {
        name: pokemon.name + '0',
        sprite: pokemon.sprite,
        side: false,
        id: id_num,
      };
      id_num++;
      this.gameArr.push(poke);
      this.gameArr.push(pokeCopy);
    });
    this.gameArr.sort(this.randomArr);
  }

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
            types.push(element);
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

  ngOnInit(): void {
    this.showAllPokemons();
  }
}
