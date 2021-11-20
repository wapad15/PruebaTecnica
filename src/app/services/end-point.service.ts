import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EndPointService {
  private apiUrl: string;

  constructor(private http: HttpClient,) { 

    this.apiUrl = "http://hp-api.herokuapp.com/api/characters/"

  }

  getStudentsd(): Observable<any> {
    const url = `${this.apiUrl}students`;
    return this.http.get(url);
  }

  getteachers(): Observable<any> {
    const url = `${this.apiUrl}staff`;
    return this.http.get(url);
  }

  getPersonajes(Casa:string): Observable<any> {
    const url = `${this.apiUrl}house/${Casa}`;
    return this.http.get(url);
  }

}
