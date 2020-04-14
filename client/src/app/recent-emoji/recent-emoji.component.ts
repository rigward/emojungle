import { HistoryService } from './../history.service';
import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-recent-emoji',
  templateUrl: './recent-emoji.component.html',
  styleUrls: ['./recent-emoji.component.scss']
})
export class RecentEmojiComponent {
  recentItems: Array<any> = [];
  
  @Output()
  emojiSelected = new EventEmitter();

  historyService: HistoryService;

  constructor(_historyService: HistoryService) {
    this.historyService = _historyService;
  }

  onEmojiSelected(selectedItem){
    this.emojiSelected.emit(selectedItem);
  }

}
