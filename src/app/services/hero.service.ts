 import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../hero';
import { InMemoryDataService } from './in-memory-data.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private messageService: MessageService, private http: HttpClient) { }

  deleteHero(hero: Hero): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const deleteUrl = `${this.heroesUrl}/${id}`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete(deleteUrl, httpOptions)
    .pipe(
      tap(_ => this.log(`Hero deleted [${hero.name}]`)),
      catchError(this.handleError<any>(`deleteHero`))
    );
  }

  updateHero( hero: Hero ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`Hero updated id=${hero.id}`)),
        catchError(this.handleError<any>(`updateHero`))
      );
  }


  getHeroes(): Observable<Hero[]> {
    this.messageService.add('Hero Service: fetched heroes');

    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError( this.handleError('getHeroes', []) )
      );
  }

  private handleError<T>( operation = 'operation', result?: T ) {
    return (error: any): Observable<T> => {
      console.error( error );

      this.log( `${operation} failed: ${error.message}` );

      return of(result as T);
    };
  }

  getHero( id: number ): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  log( message: string ) {
    this.messageService.add( `HeroService: ${ message }` );
  }

  /** POST: add a new hero to the server */
addHero (hero: Hero): Observable<Hero> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
  .pipe(
    tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
  }
}
