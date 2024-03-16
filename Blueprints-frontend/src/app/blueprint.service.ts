import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { Blueprint } from './blueprint';
import { HttpClient} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlueprintService {

  //Base URL
  private URL = "http://localhost:8080/blueprints";

  constructor(private httpClient: HttpClient) { }

  //Service to Get all the blueprints by author
  getBlueprintsByAuthor(author: string): Observable<Blueprint[]> {
    return this.httpClient.get<Blueprint[]>(`${this.URL}/${author}`).pipe(
      catchError(error => {
        console.log('Error al obtener los blueprints del autor:', error);
        return throwError(error);
      })
    );
  }

  //Service to Get a blueprint with the name of this and author's name
  getBlueprintsByNameAndAuthor(author: string,nameBlueprint:string): Observable<Blueprint> {
    return this.httpClient.get<Blueprint>(`${this.URL}/${author}/${nameBlueprint}`).pipe(
      catchError(error => {
        console.log('Error al obtener el blueprint del autor:', error);
        return throwError(error);
      })
    );
  }
  
  
}
