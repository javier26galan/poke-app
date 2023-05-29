import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardGameComponent } from './card-game.component';

const routes: Routes = [
  {
    path: '',
    component: CardGameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardGameRoutingModule { }
