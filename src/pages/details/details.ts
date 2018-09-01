import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";


/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  game_id: number;
  game: object = {};
  perspective: object = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _data: DataProvider) {
    this.game_id = navParams.get('game');
  }

  ionViewDidLoad() {
    this._data.getGame(this.game_id).subscribe((res) => {
      let data = res;

      if ( data[0].player_perspectives && data[0].player_perspectives.length > 0 ) {
        let pers = res[0].player_perspectives[0];

        this._data.getPerspective(pers).subscribe((res) => {
          this.perspective = res[0]
        });
      }  else {
          this.perspective ={ name: 'N/A' };
      }

      this.game = res[0];
    })
  }

}
