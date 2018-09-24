import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor( private route: ActivatedRoute, private heroService: HeroService,
      private location: Location, private messageService: MessageService ) {
    this.hero = new Hero();
  }


  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.heroService.getHero( id )
    .subscribe(hero => this.hero = hero);
  }

  goBack() {
    this.location.back();
  }

  save( hero: Hero ): void {
    this.heroService.updateHero( hero )
    .subscribe(res =>
        this.messageService.add(`Hero updated name ${hero.name}`)
    );
  }

}
