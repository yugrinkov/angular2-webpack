import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  template: `<h1>{{ title }}</h1>
             <ul class="heroes">
                <li *ngFor="let hero of heroes"
                  (click)="onSelect(hero)"
                  [class.selected] = "hero === selectedHero">
                  <span class="badge">{{ hero.id }}</span> {{ hero.name }}
                </li>
             </ul>
             <my-hero-detail [hero]="selectedHero"></my-hero-detail>
             `,
  styles: [require('./app.component.css')],
  providers: [HeroService],
})
export class AppComponent implements OnInit {
  selectedHero: Hero;
  title = 'Tour of Heroes';
  heroes: Hero[];

  constructor (private heroService: HeroService) {

  }

  ngOnInit(): void {
      this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero):void {
    this.selectedHero = hero;
  }
}
