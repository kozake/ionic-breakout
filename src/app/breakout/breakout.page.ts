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

  // ラケット
  racket: PIXI.Sprite;

  // ボール
  ball: PIXI.Sprite;

  // ブロック
  blocks: PIXI.Sprite[];

  // ゲームステージ
  gameStage: PIXI.Container;

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
      this.onInit();
      this.app.ticker.add(delta => {
        this.onFrame(delta);
      });
    });
  }

  onInit() {
    this.gameStage = new PIXI.Container();

    // 背景作成
    this.gameStage.addChild(this.createBackground());

    // ラケット作成
    this.racket = this.createRacket();
    this.racket.x = SCREEN_WIDTH / 2 - this.racket.width / 2;
    this.racket.y = 850;
    this.gameStage.addChild(this.racket);

    // ボール作成
    this.ball = this.createBall();
    this.ball.x = SCREEN_WIDTH / 2 - this.ball.width / 2;
    this.ball.y = this.racket.y - this.ball.height;
    this.gameStage.addChild(this.ball);

    // ブロック作成
    this.blocks = [];
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 6; col++) {
        const block = this.createBlock(row, col);
        block.x = col * (block.width + 5) + 30;
        block.y = row * (block.height + 5) + 100;
        this.blocks.push(block);
        this.gameStage.addChild(block);
      }
    }

    this.app.stage.addChild(this.gameStage);
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

  /**
   * 背景作成
   */
  private createBackground(): PIXI.Sprite {
    const t = PIXI.Texture.from('assets/image/ch-tree.jpg');
    const background = new PIXI.Sprite(t);
    background.width = SCREEN_WIDTH;
    background.height = SCREEN_HEIGHT;
    return background;
  }

  /**
   * ラケット作成
   */
  private createRacket(): PIXI.Sprite {
    const g = new PIXI.Graphics();
    // beginFill(塗りつぶしの色, 塗りつぶしのアルファ値)
    g.beginFill(0xffd700, 1);
    // drawRect(左上のX座標, 左上のY座標, 幅, 高さ)
    g.drawRect(0, 0, 100, 20);
    g.endFill();

    const t = PIXI.RenderTexture.create({ width: g.width, height: g.height });

    this.app.renderer.render(g, t);
    return new PIXI.Sprite(t);
  }

  /**
   * ボール作成
   */
  private createBall(): PIXI.Sprite {
    const g = new PIXI.Graphics();
    // beginFill(塗りつぶしの色, 塗りつぶしのアルファ値)
    g.beginFill(0xffffff, 1);
    // drawCircle(円の中心のX座標, 円の中心のY座標, 円の半径)
    g.drawCircle(10, 10, 10);
    g.endFill();

    const t = PIXI.RenderTexture.create({ width: g.width, height: g.height });

    this.app.renderer.render(g, t);
    return new PIXI.Sprite(t);
  }

  /**
   * ブロック作成
   */
  private createBlock(row: number, col: number): PIXI.Sprite {
    const g = new PIXI.Graphics();
    // beginFill(塗りつぶしの色, 塗りつぶしのアルファ値)
    g.beginFill(0xffffff, 1);
    // drawRect(左上のX座標, 左上のY座標, 幅, 高さ)
    g.drawRect(0, 0, 85, 25);
    g.endFill();

    const t = PIXI.RenderTexture.create({ width: g.width, height: g.height });

    this.app.renderer.render(g, t);
    return new PIXI.Sprite(t);
  }
}
