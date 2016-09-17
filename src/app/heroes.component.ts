import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

import '../../public/css/styles.css';

@Component({
  selector: 'my-heroes',
  template: `<h1>{{ title }}</h1>
             <ul class="heroes">
                <li *ngFor="let hero of heroes"
                  (click)="onSelect(hero)"
                  [class.selected] = "hero === selectedHero">
                  <span class="badge">{{ hero.id }}</span> {{ hero.name }}
                </li>
             </ul>
             <div *ngIf="selectedHero">
               <h2>
                  {{selectedHero.name | uppercase}} is my hero
               </h2>
              <button (click)="gotoDetail()">View Details</button>
            </div>
             `,
  styles: [require('./app.component.css')],
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor (
    private heroService: HeroService,
    private router: Router,
  ) {

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

  gotoDetail(): void {
    this.router.navigate(['detail/', this.selectedHero.id ]);
  }
}
