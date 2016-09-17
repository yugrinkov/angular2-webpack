import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
   private heroesUrl = 'https://jsonplaceholder.typicode.com/users'
   constructor(private http: Http){ }

    getHeroes(): Promise<Hero[]> {
      return this.http.get(this.heroesUrl)
                 .toPromise()
                 .then(response => response.json() as Hero[])
                 .catch(this.handleError);
    }

    private handleError(error:any): Promise<any>{
      console.error('An error occured', error);
      return Promise.reject(error.message || error);
    }

    getHero(id: number): Promise<Hero>{
      return this.getHeroes().then(heroes => heroes.find(
        hero => hero.id === id
      ));
    }
}
