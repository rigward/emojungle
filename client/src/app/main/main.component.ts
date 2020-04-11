import { Component, OnInit, HostListener } from '@angular/core';
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
  maxDimension = 100;

  constructor(private _clipboardService: ClipboardService) {
    this.resetCanvas();
  }

  onBackgroundPickerChanged($event){
    console.log($event);
    this.backgroundSymbol = $event;
    this.resetCanvas();
  }

  onDimensionChanged(){
    const validateDimension = x => Math.max(Math.min(this.maxDimension || 0, x), 1);
    console.log('dimensions on change: ', this.canvasWidth, this.canvasHeight);
    this.canvasWidth = validateDimension(this.canvasWidth);
    this.canvasHeight = validateDimension(this.canvasHeight);
    console.log('width after change: ', this.canvasWidth);
    console.log('height after change: ', this.canvasHeight);
    this.resetCanvas();
  }

  resetCanvas(){
    let canvas = [];
    const line = Array(this.canvasWidth).fill(this.backgroundSymbol);
    for (let x = 0; x < this.canvasHeight; x++) {
      canvas.push([...line]);
    }
    this.canvas = canvas;
  }

  onMouseMoved($event){
    if(!this.isMouseDown){
      return;
    }
    const getAttr = (attrName) => parseInt($event.target.getAttribute(attrName));
    const y = getAttr('y');
    const x = getAttr('x');
    this.setCanvasItem(y, x);
  }

  onMouseClicked($event){
    const getAttr = (attrName) => parseInt($event.target.getAttribute(attrName));
    const y = getAttr('y');
    const x = getAttr('x');
    this.setCanvasItem(y, x);
  }

  setCanvasItem(y: number, x: number){
    this.canvas[y][x] = this.currentBrush;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.isMouseDown = false;
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isMouseDown = true;
  }

  copyResult(){
    const lines: Array<string> = this.canvas.map(line => line.join(''));
    const res = lines.join('\n');
    this._clipboardService.copyFromContent(res);
  }

  ngOnInit(): void {}
}
