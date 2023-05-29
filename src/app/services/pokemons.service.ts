import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http:HttpClient) { }
  apiUrl = environment.pokeApiUrl;

  getAllPokemon(){
    return this.http.get<any>(`${this.apiUrl}?limit=151&offset=0`);
  }
}
