import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NumberGeneratorPipe } from './pipes/number-generator.pipe';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailsComponent,
    MenuHeaderComponent,
    PokemonCardComponent,
    NotFoundComponent,
    LoadingComponent,
    NumberGeneratorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
