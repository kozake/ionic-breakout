import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import * as PIXI from 'pixi.js';

// スクリーン横幅
const SCREEN_WIDTH = 600;
// スクリーン縦幅
const SCREEN_HEIGHT = 1000;

@Component({
  selector: 'app-breakout',
  templateUrl: './breakout.page.html',
  styleUrls: ['./breakout.page.scss']
})
export class BreakoutPage implements OnInit, AfterViewChecked {
  @ViewChild('screen', { static: true })
  screen: ElementRef;

  app: PIXI.Application = null;

  // 画面のスケール率
  scale: number;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    // フレーム処理ごとに変更検知を起こさないよう、Pixi.jsはAngularのZone処理外で実施
    this.zone.runOutsideAngular(() => {
      this.app = new PIXI.Application({
        backgroundColor: 0x1099bb,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
      });
      this.screen.nativeElement.appendChild(this.app.view);
      this.app.ticker.add(delta => {
        this.onFrame(delta);
      });
    });
  }

  ngAfterViewChecked() {
    if (this.app != null) {
      this.resize();
    }
  }

  /**
   * 変更検知の際に画面のスケール率を再計算する.
   */
  resize() {
    const ratio = Math.min(
      this.screen.nativeElement.clientWidth / SCREEN_WIDTH,
      this.screen.nativeElement.clientHeight / SCREEN_HEIGHT
    );
    if (ratio > 0) {
      this.scale = ratio;
      this.app.renderer.resize(
        SCREEN_WIDTH * this.scale,
        SCREEN_HEIGHT * this.scale
      );
      this.app.stage.scale.x = this.app.stage.scale.y = this.scale;
    }
  }

  onFrame(delta: number) {}
}
