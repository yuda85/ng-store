import { Injectable } from '@angular/core';
import { IUser } from 'src/app/shared/models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}

  public login(user: IUser): void {
    if (user) {
      this.storageService.setData('user', user);
    }
  }

  public getUser(): IUser {
    const user: IUser = this.storageService.getData('user');
    return user;
  }
}
