import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PokemonDetails, PokemonDetailsFull, PokemonEvolutionChain, PokemonEvolutionInfo } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private pokeApiURL: string
  private offset: BehaviorSubject<number> = new BehaviorSubject(0)
  offset$ = this.offset.asObservable();

  constructor(private http: HttpClient) { 
    this.pokeApiURL = 'https://pokeapi.co/api/v2/';
  }


  getPokeList(offset = 0) {
    const pokemonList = this.http.get<PokemonDetailsFull>(`${this.pokeApiURL}pokemon/?limit=20&offset=${offset}`)
    return pokemonList
  }

  getPokemonData(pokemonURL: string) {
    const url = pokemonURL.search('http') === -1 ? `${this.pokeApiURL}pokemon/${pokemonURL}` : pokemonURL
    const pokemonFullInfo = this.http.get<PokemonDetails>(`${url}`)
    return pokemonFullInfo
  }

  getEvolutionChain(evochainURL: string) {
    return this.http.get<PokemonEvolutionInfo>(`${evochainURL}`)
  }

  getPokemonDetails(id:string) {
    const pokemonEvos$ = this.http.get<PokemonEvolutionChain>(`${this.pokeApiURL}pokemon-species/${id}`)
    return pokemonEvos$
  }

  getOffset() {
    return this.offset$
  }

  updateOffset(val: number) {
    this.offset.next(val)
  }

}
