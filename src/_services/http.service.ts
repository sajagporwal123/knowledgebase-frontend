// Default Modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';

// Environment
import { environment } from '../environments/environment';

import { InterceptorSkipContentTypeHeader } from '../_constant/http.constant';
@Injectable({
  providedIn: 'root',
})
export class HttpService {

  public BASE_URL: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * @description HttpClient Get Method
   * @param url 
   * @param params 
   */
  get(url, params = {}): Promise<any> {
    return this.httpClient
      .get(`${this.BASE_URL + url}`, {
        params,
      })
      .pipe(first())
      .toPromise();
  }

  /**
   * @description HttpClient Post Method
   * @param url 
   * @param body 
   * @param params 
   */

  post(url, body = {}, params = {}): Promise<any> {
    return this.httpClient
      .post(`${this.BASE_URL + url}`, body, {
        params,
        observe: 'body',
      })
      .pipe(first())
      .toPromise();
  }

  /**
   * @description HttpClient Post Method With Form Data
   * @param url 
   * @param body 
   * @param params 
   */

  postWithFormData(url, body = {}, params = {}): Promise<any> {
    const formData: any = new FormData();
    for (const key in body) {
      if (body[key] != null) {
        formData.append(key, body[key]);
      }
    }
    const headers = new HttpHeaders({
      [InterceptorSkipContentTypeHeader]: '',
    });
    return this.httpClient
      .post(`${this.BASE_URL + url}`, formData, {
        params,
        headers,
        observe: 'body',
      })
      .pipe(first())
      .toPromise();
  }
  /**
   * @description HttpClient Put Method
   * @param url 
   * @param body 
   * @param params 
   */
  put(url, body = {}, params = {}): Promise<any> {
    return this.httpClient
      .put(`${this.BASE_URL + url}`, body, {
        params,
        observe: 'body',
      })
      .pipe(first())
      .toPromise();
  }

  /**
  * @description HttpClient Delete Method
  * @param url 
  * @param body 
  * @param params 
  */
  delete(url, params = {}): Promise<any> {
    return this.httpClient
      .delete(`${this.BASE_URL + url}`, {
        params,
        observe: 'body',
      })
      .pipe(first())
      .toPromise();
  }
}
