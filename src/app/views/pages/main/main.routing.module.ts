import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'game/:id', component: GameComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
