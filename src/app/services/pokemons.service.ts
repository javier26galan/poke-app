import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CardDex } from '../models/cardDex.model';
import { map } from 'rxjs/operators';
import { PokeDetail } from '../models/pokeDetail.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.pokeApiUrl;

  public getAllPokemon(): Observable<CardDex[]> {
    return this.http
      .get<CardDex[]>(`${this.apiUrl}?limit=151&offset=0`)
      .pipe(map((x: any) => x.results));
  }

  public getPokemon(url: string): Observable<PokeDetail> {
    return this.http.get<any>(`${url}`).pipe(map((x: any) => x));
  }
}
