import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { LoaderService } from 'src/app/services/loader.service';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokelist:Pokemon[] = []
  offset = 0
  count = 0
  pagination:number[] = [1,2,3]
  maxOffset = 0;
  selectedPage = 1

  constructor(private pokeService: PokeapiService, private router: Router, private loadService: LoaderService) {}

  ngOnInit(): void {
    this.loadService.updateLoadingStatus(true)
    this.pokeService.offset$.subscribe(offset => {
      this.offset = offset
      this.getPokemonList(this.offset)
    })
  }
  
  getPokemonList(offset: number) {
    this.pokeService.getPokeList(offset).subscribe(pokes => {
      this.count = pokes.count
      this.pokelist = pokes.results;
      this.maxOffset = Math.floor(this.count / 20)
      setTimeout(() => {
        this.loadService.updateLoadingStatus(false)
      }, 2000);
    })
  }

  showPokemon(idx: number) {
    const currentIdx = idx + 1
    this.router.navigate(['/pokemon', currentIdx.toString()])
  }

  lastPage() {
    this.loadService.updateLoadingStatus(true)
    this.pagination = [this.maxOffset - 1, this.maxOffset, this.maxOffset + 1]
    this.pokeService.updateOffset(this.maxOffset * 20);
  }

  firstPage() {
    this.loadService.updateLoadingStatus(true)
    this.pagination = [1,2,3]
    this.pokeService.updateOffset(0)
  }

  goToPage(idx: number) {
    this.loadService.updateLoadingStatus(true)
    this.pagination = idx === 1 ? [1,2,3] : idx === (this.maxOffset + 1) ? [this.maxOffset - 1, this.maxOffset, this.maxOffset + 1] : [idx-1, idx, idx+1]
    this.pokeService.updateOffset((idx - 1) * 20)
    this.getPokemonList(this.offset)
  }

  onChange(pageNumber: string) {
    this.goToPage(parseInt(pageNumber))
  }
}
