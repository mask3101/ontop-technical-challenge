import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import {of} from 'rxjs'

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let pokeService: any;

  beforeEach(async () => {

    pokeService = {
      getPokemonData: () => of({id: 1, name: 'bulbasaur', img: 'img'})
    }

    await TestBed.configureTestingModule({
      declarations: [ PokemonCardComponent ],
      providers: [{provide: PokeapiService, useValue: pokeService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
