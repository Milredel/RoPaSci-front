import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'game/:id', component: GameComponent},
      {path: 'stats', component: StatsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
