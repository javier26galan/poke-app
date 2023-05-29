import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'pokedex',
    loadChildren: () =>
      import('./layout/pokedex/pokedex.module').then((m) => m.PokedexModule),
  },
  {
    path: 'card-game',
    loadChildren: () =>
      import('./layout/card-game/card-game.module').then(
        (m) => m.CardGameModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
