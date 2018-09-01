import { Component } from '@angular/core';
import {trigger, state, style, transition, animate, keyframes, query,stagger } from '@angular/animations';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  game_id: number;
  game: object = {};
  perspective: object = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _data: DataProvider,
              private iab: InAppBrowser,
              private youtube: YoutubeVideoPlayer
              ) {
    this.game_id = navParams.get('game');
  }

  ionViewDidLoad() {
    this._data.getGame(this.game_id).subscribe((res) => {

      if ( res[0].player_perspectives && res[0].player_perspectives.length > 0 ) {
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

  launchSite(url) {
    const browser = this.iab.create(url, '_system');
    browser.close();
  }

  playVideo(video_id) {
    this.youtube.openVideo(video_id);
  }

}
