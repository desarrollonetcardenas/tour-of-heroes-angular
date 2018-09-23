 import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(public messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('Hero Service: fetched heroes');
    return of(HEROES);
  }

  getHero( id: number ): Observable<Hero> {
    this.messageService.add( `Hero id [${id}] selected` );
    const hero = HEROES.find(e => e.id === id);

    return of(hero);
  }
}
