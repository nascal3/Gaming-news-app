import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  limit: number = 50;

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }


  getGames(genre, offset_num) {
    return this.http.get(`/games/?fields=name,release_dates,screenshots&limit=${this.limit}&offset=${offset_num}&order=release_dates.date:desc&filter[genres][eq]=${genre}&filter[screenshots][exists]`);
  }

  getFavorites (favs) {
    let favorites = favs;
    favorites = favorites.join();
    return this.http.get(`/games/${favorites}?fields=name,release_dates,screenshots&order=release_dates.date:desc&filter[screenshots][exists]`);

  }
}
