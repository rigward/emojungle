import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.scss']
})
export class EmojiPickerComponent implements OnInit {

  @Input() buttonTitle: string;

  @Input() chosenSymbol: string;

  @Output() chosenSymbolChange = new EventEmitter();

  @Input() isAlwaysShow: boolean = false;

  isShowPicker: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  emojiSelected($event){
    console.log($event.emoji.native);
    if(!this.isAlwaysShow){
      this.isShowPicker = false;
    }
    this.chosenSymbol = $event.emoji.native;
    this.chosenSymbolChange.emit(this.chosenSymbol);
  }

}
