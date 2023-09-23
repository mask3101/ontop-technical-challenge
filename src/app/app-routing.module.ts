import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: PokemonListComponent},
  {path: 'pokemon-list', component: PokemonListComponent},
  {path: 'pokemon/:pokeId', component: PokemonDetailsComponent},
  {path: 'not-found', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
