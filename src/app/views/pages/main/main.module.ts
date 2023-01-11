import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main.routing.module';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { GameService } from '../../../services/game/game.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { LayoutComponent } from './components/layout/layout.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValdemortModule } from 'ngx-valdemort';
import { MessageComponent } from '../../core/message/message.component';
import { UserService } from '../../../services/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    MDBBootstrapModule.forRoot(),
    AutocompleteLibModule,
    BsDatepickerModule.forRoot(),
    ValdemortModule
  ],
  exports: [
    MessageComponent,
    LayoutComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  declarations: [
    MessageComponent,
    LayoutComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  providers: [
    GameService,
    UserService
  ]
})
export class MainModule {
}
