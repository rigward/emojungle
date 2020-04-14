import { HistoryService } from './../history.service';
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
  canvasCopy: string = '';

  isMouseDown: Boolean = false;
  maxDimension = 100;

  constructor(private _clipboardService: ClipboardService, private historyService: HistoryService) {
    this.resetCanvas();
  }

  onBackgroundPickerChanged($event){
    this.backgroundSymbol = $event;
    this.resetCanvas();
  }

  onDimensionChanged(){
    const currentWidth = this.canvas[0].length;
    const currentHeight = this.canvas.length;
    if(this.canvasHeight < currentHeight){
      this.canvas.splice(this.canvasHeight);
    }
    else if(this.canvasHeight > currentHeight){
      const line = Array(this.canvasWidth).fill(this.backgroundSymbol);
      for(let i = 0; i < this.canvasHeight - currentHeight; i++){
        this.canvas.push([...line]);
      }
    }
    if(this.canvasWidth < currentWidth){
      this.canvas.forEach(line => line.splice(this.canvasWidth));
    }
    else if(this.canvasWidth > currentWidth){
      const extendedLine = Array(this.canvasWidth - currentWidth).fill(this.backgroundSymbol);
      this.canvas.forEach(line => line.push(...extendedLine));
    }

    this.historyService.push(this.canvas);
  }

  resetCanvas(){
    let canvas = [];
    const line = Array(this.canvasWidth).fill(this.backgroundSymbol);
    for (let x = 0; x < this.canvasHeight; x++) {
      canvas.push([...line]);
    }
    this.canvas = canvas;
    this.historyService.push(this.canvas);
  }

  onMouseMoved($event){
    if(!this.isMouseDown){
      return;
    }

    const getAttr = (attrName) => parseInt($event.target.getAttribute(attrName));
    const y = getAttr('canvas_y');
    const x = getAttr('canvas_x');
    this.setCanvasItem(y, x);
  }

  onMouseClicked($event){
    const getAttr = (attrName) => parseInt($event.target.getAttribute(attrName));
    const y = getAttr('canvas_y');
    const x = getAttr('canvas_x');
    this.setCanvasItem(y, x);
    this.historyService.push(this.canvas);
  }

  setCanvasItem(y: number, x: number){
    if(this.canvas[y][x] != this.currentBrush){
      this.canvas[y][x] = this.currentBrush;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.isMouseDown = false;
    if(this.canvasCopy !== JSON.stringify(this.canvas)){
      this.historyService.push(this.canvas);
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.canvasCopy = JSON.stringify(this.canvas);
    this.isMouseDown = true;
  }

  // memory

  @HostListener('document:keydown.meta.z')
  loadPrevCanvasState(){
    if(this.isMouseDown){
      return;
    }
    const state = this.historyService.getPreviousState();
    this.canvas = state;
  }

  @HostListener('document:keydown.shift.meta.z')
  loadNextCanvasState(){
    if(this.isMouseDown){
      return;
    }
    const state = this.historyService.getNextState();
    this.canvas = state;
  }

  // end of memory

  @HostListener('document:keydown.meta.c')
  copyResult(){
    const lines: Array<string> = this.canvas.map(line => line.join(''));
    const res = lines.join('\n');
    this._clipboardService.copyFromContent(res);
  }

  recentEmojiClicked(newEmoji){
    this.currentBrush = newEmoji;
  }

  ngOnInit(): void {}
}
