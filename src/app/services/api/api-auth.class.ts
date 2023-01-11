import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiClass } from './api.class';
import { UserModel } from '../../models/user.model';


export class ApiAuthClass extends ApiClass {
  public userData: any = null;
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(public http: HttpClient) {
    super(http);

    this.userData = this.getParsedUserData();
  }

  logout(): void {
    this.purgeStorage();
    this.userData = null;
  }

  getUserData(key = null): any {
    const userData = this.getStorage();

    if (userData && userData.hasOwnProperty(key) && key) {
      return userData[key];
    }

    return userData;
  }

  isUserConnectedSameFrom(id: number): boolean {
    return this.authenticated() && this.userData && this.userData.id === id;
  }

  storeDataFromUserModel(userModel: UserModel): void {
    this.userData = userModel;
    this.setStorage('userData', JSON.stringify(this.userData));
  }

  authenticated(): boolean {
    const jwtToken = this.getLocalStorage().getItem('jwt');

    return !!jwtToken && !this.jwtHelper.isTokenExpired(jwtToken);
  }

  public getParsedUserData(): any {
    return JSON.parse(this.getLocalStorage().getItem('userData'));
  }

  public setStorage(key: string, value: string): void {
    this.getLocalStorage().setItem(key, value);
  }

  protected getStorageKey(key: string): any {
    return this.getLocalStorage().getItem(key);
  }

  protected purgeStorage(): void {
    this.getLocalStorage().removeItem('jwt');
    this.getLocalStorage().removeItem('userData');
  }

  protected getStorage(): any {
    return JSON.parse(localStorage.getItem('userData'));
  }

  protected getLocalStorage(): any {
    return localStorage;
  }
}
