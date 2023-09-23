import { Component, Input, OnInit } from '@angular/core';
import { PokemonCard, PokemonDetails } from 'src/app/interfaces/pokemon.interface';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit{
  @Input() pokemon = '';
  pokemonDisplayData: PokemonCard = {id: 0, name: '', img: ''}

  constructor(private pokeService: PokeapiService) {}

  ngOnInit(): void {
    this.pokeService.getPokemonData(this.pokemon).subscribe((data: PokemonDetails) => {
      this.pokemonDisplayData = {
        id: data.id,
        name: data.name,
        img: data.sprites.front_default
      }
    })
  }

}
