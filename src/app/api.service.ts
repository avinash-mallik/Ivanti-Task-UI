import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coordinate } from './Model/Coordinate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  GetRowAndColumn(coordinates: Coordinate[]): Observable<string>
  {
    return this.http.post('http://localhost:5000/api/triangle/GetRowAndColumn/', coordinates, { responseType : 'text' });
  }

  GetCoordinates(rowColumn: string): Observable<Coordinate[]>
  {
    return this.http.get<Coordinate[]>('http://localhost:5000/api/triangle/GetCoordinates/' + rowColumn);
  }
}
