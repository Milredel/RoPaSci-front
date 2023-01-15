import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { JwtDecoded } from 'src/app/interfaces/JwtDecoded.interface';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username = '';

  constructor(public apiAuthSrv: ApiAuthService,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    const decoded: JwtDecoded = this.apiAuthSrv.getJwtTokenDecoded();
    this.username = decoded?.username || 'guest';
  }

  logout(): void {
    this.apiAuthSrv.logout();
    this.router.navigate([`/login`]);
    this.toastService.success(`Congratulations`, `Logout succeeded.`, {showConfirmButton: false, timer: 1500});
  }

  goToStats(): void {
    this.router.navigate([`/main/stats`]);
  }

  goToGames(): void {
    this.router.navigate([`/main/home`]);
  }
}
