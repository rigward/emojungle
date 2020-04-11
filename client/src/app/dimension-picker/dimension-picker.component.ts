import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dimension-picker',
  templateUrl: './dimension-picker.component.html',
  styleUrls: ['./dimension-picker.component.scss']
})
export class DimensionPickerComponent implements OnInit {

  @Input() value: number;
  @Output() valueChange = new EventEmitter();

  @Input() title: string;

  constructor() { }

  onValueChanged(){
    this.valueChange.emit(this.value);
  }

  ngOnInit(): void {
  }

}
