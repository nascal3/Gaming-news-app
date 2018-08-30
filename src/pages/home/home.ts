import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import {DataProvider} from "../../providers/data/data";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  games = [];
  genre: any = 5;
  genreName: string = "Upcoming Games";
  favorites:any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _data: DataProvider,
              private _storage: Storage,
              public loading: LoadingController) {
    let loader = this.loading.create({
      content: 'Getting Games',
    });
    loader.present().then( () => {
      this._storage.get('genre').then((val) => {

        if (val.id) {
          this.genre = val.id;
          this.genreName = val.name;
        } else {
          this.genre = 5;
          this.genreName = 'Shooter';
          this._storage.set('genre', this.genre);
        }

        this._data.getGames(this.genre, 0).subscribe( res=> {

          let jsonData: string = JSON.stringify(res);
          this.games = JSON.parse(jsonData);
          console.log(this.games);
        });

        this._storage.get('favorites').then(() => {
          if (!val) {
            this._storage.set('favorites', this.favorites);
          }else {
            this.favorites = val;
          }
        });

        loader.dismiss();
      });
    })
  }


  ionViewDidLoad() {


  }

}
