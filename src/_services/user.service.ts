// Default Modules
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

// Generated Services
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })

export class UserService {

  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(
    private router: Router,
    private httpService: HttpService,
  ) {
    // Assign User details to access any where
    this.userSubject = new BehaviorSubject<any>(
      /**
       * Get logged in user data from local storage
       */
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }
  /**
   * Get logged in user value
   */
  public get userValue(): any {
    return this.userSubject.value;
  }
  /**
   * @description User login with email
   * @param email 
   * @param password 
   */
  async login(email, password): Promise<object> {
    try {
      const user = await this.httpService.post(`user/login`, { email, password });
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  /**
   * @description Logout the current logged in user
   */
  logout(): any {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  /**
   * @description New User Sign-Up
   * @param user 
   */
  async register(user): Promise<object> {
    try {
      const userDetails = this.httpService.post(`user/sign-up`, user);
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(userDetails));
      this.userSubject.next(userDetails);
      return Promise.resolve(userDetails);
    } catch (error) {
      return Promise.reject(error);
    }

  }
  /**
   * @description Sign-up social media login user and get token 
   * @param body 
   */
  async loginWithSocial(body): Promise<object> {
    try {
      const userDetails = await this.httpService.post(`user/social-login`, body);
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(userDetails));
      this.userSubject.next(userDetails);
      return Promise.resolve(userDetails);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
