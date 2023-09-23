import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { Router, provideRouter } from '@angular/router';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let router: Router;
  let location: Location;
  let routes = [
    {path: '', component: PokemonListComponent},
    {path: 'pokemon-list', component: PokemonListComponent},
    {path: 'not-found', component: NotFoundComponent}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundComponent,  PokemonListComponent],
      imports: [RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();


    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router)
    location = TestBed.get(Location)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to other page', () => {
    component.goToList()
    router.navigate(['pokemon-list']).then(() => {
      expect(location.path()).toBe('/pokemon-list')
    })
  })
});
