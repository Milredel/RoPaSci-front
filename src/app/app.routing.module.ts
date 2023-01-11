import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/core/login/login.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'main/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'main',
    loadChildren: () => import('./views/pages/main/main.module')
      .then(mod => mod.MainModule),
    canActivate: [AuthGuardService]
  },
  {path: '**', redirectTo: 'main/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
