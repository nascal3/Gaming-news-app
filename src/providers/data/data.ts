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

    return this.http.get(`https://api-endpoint.igdb.com/games/?fields=name,release_dates,screenshots&limit=${this.limit}&offset=${offset_num}&order=release_dates.date:desc&filter[genres][eq]=${genre}&filter[screenshots][exists]`);
  }
}
