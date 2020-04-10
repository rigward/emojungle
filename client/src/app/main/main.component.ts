import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  canvasWidth = 20;
  canvasHeight = 20;
  backgroundSymbol = '🌕'
  currentBrush = '🌚'
  canvas: Array<Array<string>>;

  isMouseDown: Boolean = false;

  constructor(private _clipboardService: ClipboardService) {
    this.setCanvasBackground();
  }

  setCanvasBackground(){
    let canvas = [];
    const line = Array(this.canvasWidth).fill(this.backgroundSymbol);
    for (let x = 0; x < this.canvasHeight; x++) {
      canvas.push([...line]);
    }
    this.canvas = canvas;
  }

  drawImage($event){
    if(!this.isMouseDown){
      return;
    }
    const getAttr = (attrName) => parseInt($event.target.getAttribute(attrName));
    const y = getAttr('y');
    const x = getAttr('x');
    this.setCanvasItem(y, x);
  }

  setCanvasItem(y: number, x: number){
    this.canvas[y][x] = this.currentBrush;
  }
   
  setFlag($event){
     this.isMouseDown = true;
     this.drawImage($event);
  }
  
  removeFlag(){
     this.isMouseDown = false;
  }

  newBrushSelected($event){
    this.currentBrush = $event.emoji.native;
  }

  copyResult(){
    const lines: Array<string> = this.canvas.map(line => line.join(''));
    const res = lines.join('\n');
    this._clipboardService.copyFromContent(res);
  }

  ngOnInit(): void {}
}
