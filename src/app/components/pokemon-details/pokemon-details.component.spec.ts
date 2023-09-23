import { ComponentFixture, TestBed } from '@angular/core/testing';
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
        types: [{name:'plant'}]})
      
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
});
