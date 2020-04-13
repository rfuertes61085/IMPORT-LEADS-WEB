import { QueryParam } from './../models/generic..model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

export abstract class BaseService<T> {
  protected baseUrl: string;

  constructor(
    public http: HttpClient,
    private entity: string = '') {
    this.baseUrl = environment.apiUrl;
  }

  private getToken(): string {
    return JSON.parse(localStorage.getItem('token') || null) ?
      JSON.parse(localStorage.getItem('token')).token : null;
  }

  protected commonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  private removeNullProps(obj: T | T[]): T | T[] {
    const ret = Object.assign({}, typeof (obj) === 'object'
    ? _.pickBy(obj, _.identity)
    : _.pickBy(obj, o => o !== null && o !== undefined))
    return ret;
  }

  public post(object?: T | T[]): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${this.entity}`, this.removeNullProps(object), { headers: this.commonHeaders() });
  }

  public patch(object: T, url?: string): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${this.entity}${url ? '/' + url : ''}`, this.removeNullProps(object), { headers: this.commonHeaders() }
    );
  }

  public getAll(param?: QueryParam): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}${this.entity}${param && param.query ? '/' + param.query : ''}`, { headers: this.commonHeaders() });
  }

  public upload(object?: any, additionalParam?: string): Observable<T> {
    const formatParam = additionalParam ? `/${additionalParam}` : '';
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      Accept: "application/json"
    });
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<T>(`${this.baseUrl}${this.entity}${formatParam}`, this.removeNullProps(object), { headers: headers });
  }
}
