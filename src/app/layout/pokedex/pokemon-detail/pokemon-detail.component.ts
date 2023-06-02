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

  ngOnInit(): void {

  }
}
