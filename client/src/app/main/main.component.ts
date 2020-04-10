import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  canvasWidth = 20;
  canvasHeight = 20;
  backgroundSymbol = '🌕'
  currentSymbol = '🌚'
  canvas: Array<Array<string>>;

  isMouseDown: Boolean = false;

  constructor() {
    this.setCanvasBackground();
  }

  setCanvasBackground(){
    let canvas = [];
    const line = Array(this.canvasHeight).fill(this.backgroundSymbol);
    for (let x = 0; x <= this.canvasWidth; x++) {
      canvas.push([...line]);
    }
    this.canvas = canvas;
  }

  drawImage($event){
    if(!this.isMouseDown){
      return;
    }
    console.log($event);
    const getAttr = (attrName) => parseInt($event.target.getAttribute(attrName));
    const y = getAttr('y');
    const x = getAttr('x');
    this.setCanvasItem(y, x);
  }

  setCanvasItem(y: number, x: number){
    this.canvas[y][x] = this.currentSymbol;
  }
   
  setFlag($event){
     this.isMouseDown = true;
     this.drawImage($event);
  }
  
  removeFlag(){
     this.isMouseDown = false;
  }

  ngOnInit(): void {}
}
