import { Component, Input, OnInit } from '@angular/core';
import { PokeDetail } from 'src/app/models/pokeDetail.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  constructor() {}
  @Input() pokemon?: PokeDetail;

  //  the event to close the modal
  closeModal(){
    const modal = document.getElementById("poke-detail");
    const close = document.getElementById('close');
    modal?.classList.add("hidden")
  }

  ngOnInit(): void {

  }
}
