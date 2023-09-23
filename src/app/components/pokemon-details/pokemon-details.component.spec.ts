import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import {of} from 'rxjs';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let router: Router;
  let location: Location;
  let routes = [
    {path: '', component: PokemonListComponent},
    {path: 'pokemon-list', component: PokemonListComponent},
    {path: 'pokemon/:pokeId', component: PokemonDetailsComponent},
    {path: 'not-found', component: NotFoundComponent}
  ];
  let pokeService: any;
  let loadservice: any;


  beforeEach(async () => {
    loadservice = {
      updateLoadingStatus: (status:boolean) => {
      }
    }
    pokeService = {
      getPokemonData: () => of({id: 1,
        name: 'bulbasaur',
        sprites: {
            front_default: 'http://frontimage.png',
        },
        types: [{name:'plant'}]}
      ),
      getPokemonDetails: () => of(
        {flavor_text_entries: [{
          flavor_text: 'description',
          language: {
            name: 'en'
          },
          version: {name: 'red'}
        }],
        evolution_chain: {url: 'http'}},
      ),
      getEvolutionChain: () => of(
        {chain: {
          "evolves_to": [
              {
                  "evolves_to": [
                      { "species": {
                              "name": "venusaur",
                              "url": "https://pokeapi.co/api/v2/pokemon-species/3/"
                          }
                      }
                  ],
                  
                  "species": {
                      "name": "ivysaur",
                      "url": "https://pokeapi.co/api/v2/pokemon-species/2/"
                  }
              }
          ],
          "species": {
              "name": "bulbasaur",
              "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
          }
      }}
      )

    }
    await TestBed.configureTestingModule({
      declarations: [ PokemonDetailsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [{provide: PokeapiService, useValue: pokeService}]
    })
    .compileComponents();

    router = TestBed.get(Router)
    location = TestBed.get(Location)
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('show description', () => {
    component.showDescriptions()
    expect(component.isShowDescription).toBe(false)
  })

  it('return to list', () => {
    component.returnToList()
      router.navigate(['pokemon-list']).then(() => {
        expect(location.path()).toBe('/pokemon-list')
      })
  })

  it('return to list', () => {
    component.goToPokemonDetail('1')
      router.navigate(['pokemon', '1']).then(() => {
        expect(location.path()).toBe('/pokemon/1')
      })
  })

  it('pokemon details func', () => {
    component.pokemonDetails()
    //tick(1500)
  })
});
