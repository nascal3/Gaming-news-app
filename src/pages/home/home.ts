import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Content } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import {DataProvider} from "../../providers/data/data";
import {GenresPage} from "../genres/genres";
import {Keyboard} from "@ionic-native/keyboard";

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

  @ViewChild(Content) content: Content;
  showSearch = false;
  games: any = [];
  genre: any;
  genreName: string = "Upcoming Games";
  favorites: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _data: DataProvider,
              private _storage: Storage,
              public loading: LoadingController,
              public modalctrl: ModalController,
              public keyboard: Keyboard) {
    let loader = this.loading.create({
      content: 'Getting Games',
    });
    loader.present().then( () => {
      this._storage.get('genre').then((val) => {

        if (val && val.id) {
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

        this._storage.get('favorites').then((val) => {
          if (!val) {
            this._storage.set('favorites', this.favorites);
          }else {
            this.favorites = val;
          }
        });

        setTimeout(() => {
          loader.dismiss();
        }, 2000)
      });
    })
  }

  favorite(game) {
    this.favorites.push(game);
    this.favorites = this.favorites.filter((item, i ,ar)=> {
      return ar.indexOf(item) === i;
    });
    this._storage.set('favorites', this.favorites);
    console.log(this.favorites);
  }

  removeFavorites(game) {
    this.favorites = this.favorites.filter((item) => {
      return item !== game;
    });
    this._storage.set('favorites', this.favorites);
  }

  openFavorites() {
    this._storage.get('favorites').then((val) => {
      this.genreName = 'Favorites';

      if (val.length !=0 ) {
        this._data.getFavorites(val)
          .subscribe(res => this.games = res);
      }else {
          this.games.length = 0;
      }
    });
  }

  openGenres() {
    let myModal = this.modalctrl.create(GenresPage);
    myModal.onDidDismiss(genre => {

      let loader = this.loading.create({
        content: 'Getting Genres'
      });

      if (genre) {
        loader.present().then(() => {
          this._storage.get('genre').then((val) => {
            this.genre = val.id;
            this.genreName= val.name;

            this._data.getGames(this.genre,0)
              .subscribe(res => this.games = res);
          });
        });
      }

      setTimeout(() => {
        loader.dismiss();
      }, 2000)

    });

    myModal.present();
  }

  showSearchBox() {
    this.showSearch = !this.showSearch;
    this.content.scrollToTop();
  }

  search(term) {
    let search_term = term;
    this.keyboard.close();

    this.genreName = search_term;
    this.showSearch = false;
    this._data.searchGames(search_term).subscribe((res) => {
      this.games = res;
    });
  }

  ionViewDidLoad() {
    console.log('Home page loaded');
  }

}
