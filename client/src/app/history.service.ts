import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  maxHistorySize = 100;
  memory: Array<any> = [];
  currentMemoryPointer: number = -1;

  constructor() {

  }
 
  push(data){
    const encodedData = JSON.stringify(data);
    if(encodedData === this.memory[this.currentMemoryPointer]){
       // don't push the same states
      return;
    }
    this.currentMemoryPointer += 1;
    this.memory.splice(this.currentMemoryPointer, this.memory.length, encodedData);

    if(this.memory.length > this.maxHistorySize){
      this.memory.shift();
      this.currentMemoryPointer -= 1;
    }
  }

  getPreviousState(){
    if(this.currentMemoryPointer > 0){
      this.currentMemoryPointer -= 1;
    }
    return this.getCurrentMemoryObject();
  }

  getNextState(){
    if(this.currentMemoryPointer + 1 < this.memory.length){
      this.currentMemoryPointer += 1;
    }
    return this.getCurrentMemoryObject();
  }

  getCurrentMemoryObject(){
    if(this.currentMemoryPointer > -1 && this.currentMemoryPointer < this.memory.length){
      return JSON.parse(this.memory[this.currentMemoryPointer])
    }
    return null;
  }
}
