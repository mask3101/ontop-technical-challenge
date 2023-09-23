import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PokeapiService } from './pokeapi.service';
import {of} from 'rxjs'

describe('PokeapiService', () => {
  let service: PokeapiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] 
    });
    service = TestBed.inject(PokeapiService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get offset', () => {
    service.getOffset().subscribe(val => {
      expect(val).toBe(0)
    })
  })

  it('get pokemon data', () => {
    const result = {
      count: 5,
      next: '',
      previous: '',
      results: [{name: 'bulbasaur', url: 'http://123/'}, {name: 'bulbasaur', url: 'http://1/'}]
    }
    service.getPokemonData('http://pokemon/1').subscribe( val => {
      expect(val).toBeTruthy()
    })
  })

  it('get poke evolutions', () => {
    service.getEvolutionChain('http://pokemon/1').subscribe(val => {
      expect(val).toBeTruthy()
    })
  })

  it('getPokemonDetails function', () => {
    service.getPokemonDetails('1').subscribe( val => {
      expect(val).toBeTruthy()
    })
  })
});
