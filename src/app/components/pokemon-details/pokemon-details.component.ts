import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonDescription, PokemonDetails, PokemonEvoData, PokemonSpeciesData } from 'src/app/interfaces/pokemon.interface';
import { LoaderService } from 'src/app/services/loader.service';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit{

  id = ''
  pokemonData:PokemonDetails | undefined = undefined
  evochain = ''
  evoinfo = {}
  descriptions: PokemonDescription[] = []
  pokemonFirstPhase: PokemonEvoData[] = []
  pokemonSecondPhase: PokemonEvoData[] = []
  pokemonThirdPhase: PokemonEvoData[] = []
  isShowDescription = true

  constructor(private pokeAPI: PokeapiService, private route: ActivatedRoute, private router: Router, private loadService: LoaderService) {}

  async ngOnInit() {
    this.loadService.updateLoadingStatus(true)
    this.id = this.route.snapshot.paramMap.get('pokeId') || '1'
    await this.pokemonDetails()
    
    this.pokeAPI.getPokemonData(this.id).subscribe((data) => {
      this.pokemonData = data;
      setTimeout(() => {
        this.loadService.updateLoadingStatus(false)
      }, 2000);
    }, () => {
      this.loadService.updateLoadingStatus(false)
      this.router.navigate(['not-found'])
    })
  }

  async pokemonDetails() {
    this.pokeAPI.getPokemonDetails(this.id).subscribe((evodata) => {
      this.descriptions = evodata.flavor_text_entries.filter((description: PokemonDescription) => {
        return description.language.name === 'en'
      }).map(desc => {
        desc.flavor_text = desc.flavor_text.replace(/\f/g, '');
        return desc
      })
      
      this.evochain = evodata.evolution_chain.url;
      this.pokeAPI.getEvolutionChain(this.evochain).subscribe((info) => {
        const splitURL = info.chain.species.url.split('/')
        const imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${splitURL[splitURL.length-2]}.png`
        this.pokemonFirstPhase.push({...info.chain.species, imgURL, id: splitURL[splitURL.length-2]});
        if (info.chain.evolves_to.length) {
          info.chain.evolves_to.map((evolveinfo: PokemonSpeciesData) => {
            const splitURL2 = evolveinfo.species.url.split('/')
            const imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${splitURL2[splitURL2.length-2]}.png`
            this.pokemonSecondPhase.push({...evolveinfo.species, imgURL, id: splitURL2[splitURL2.length-2]})
          });
          info.chain.evolves_to[0].evolves_to.map((lastEvolveInfo:PokemonSpeciesData) => {
            const splitURL3 = lastEvolveInfo.species.url.split('/')
            const imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${splitURL3[splitURL3.length-2]}.png`
            this.pokemonThirdPhase.push({...lastEvolveInfo.species, imgURL, id: splitURL3[splitURL3.length-2]})
          })
        }
      });
    })
  }

  goToPokemonDetail(id: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/pokemon', id]);
    });
  }

  returnToList() {
    this.router.navigate(['pokemon-list'])
  }

  showDescriptions() {
    this.isShowDescription = !this.isShowDescription
  }
}
