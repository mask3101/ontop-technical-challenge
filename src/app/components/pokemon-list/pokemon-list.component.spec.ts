import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { PokemonListComponent } from './pokemon-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NumberGeneratorPipe } from 'src/app/pipes/number-generator.pipe';
import { FormsModule } from '@angular/forms';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let router: Router;
  let location: Location;
  let routes = [
    {path: '', component: PokemonListComponent},
    {path: 'pokemon-list', component: PokemonListComponent},
    {path: 'pokemon/:pokeId', component: PokemonDetailsComponent},
  ];
  
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonListComponent, NumberGeneratorPipe ],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();

    router = TestBed.get(Router)
    location = TestBed.get(Location)
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test pagination with page 1', () => {
    spyOn(component, 'getPokemonList')
    component.goToPage(1)
    expect(component.pagination).toEqual([1,2,3])
  })

  it('test pagination with page different to 1', () => {
    component.maxOffset = 5
    spyOn(component, 'getPokemonList')
    component.goToPage(3)
    expect(component.pagination).toEqual([2,3,4])
  })

  it('test pagination with page equal to maxoffset', () => {
    component.maxOffset = 4
    spyOn(component, 'getPokemonList')
    component.goToPage(5)
    expect(component.pagination).toEqual([3,4,5])
  })

  it('firstpage function test', () => {
    component.firstPage()
    expect(component.pagination).toEqual([1,2,3])
  })

  it('lastPage function test', () => {
    component.maxOffset = 4
    component.lastPage()
    expect(component.pagination).toEqual([3,4,5])
  })

  it('on change function', () => {
    spyOn(component, 'goToPage')
    component.onChange('1')
    expect(component.goToPage).toHaveBeenCalled()
  })

  it('show pokemon function', () => {
      component.showPokemon(1)
      router.navigate(['pokemon', '1']).then(() => {
        expect(location.path()).toBe('/pokemon/1')
      })
  })
});
