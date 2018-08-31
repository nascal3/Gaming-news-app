import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  baseUrl:string = 'https://api-endpoint.igdb.com';
  limit: number = 50;

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }


  getGames(genre, offset_num) {
    return this.http.get(`${this.baseUrl}/games/?fields=name,release_dates,screenshots&limit=${this.limit}&offset=${offset_num}&order=release_dates.date:desc&filter[genres][eq]=${genre}&filter[screenshots][exists]`);
  }

  getFavorites (favs) {
    let favorites = favs;
    favorites = favorites.join();
    return this.http.get(`${this.baseUrl}/games/${favorites}?fields=name,release_dates,screenshots&order=release_dates.date:desc&filter[screenshots][exists]`);

  }

  getGenres() {
    return this.http.get(`${this.baseUrl}/genres/?fields=*`);
  }

  searchGames(kw) {
    let keyWord = kw;
    return this.http.get(`${this.baseUrl}/games/?fields=name,release_dates,screenshots&limit=50&offset=0&order=release_dates.date:desc&search=${keyWord}`);

  }
}
