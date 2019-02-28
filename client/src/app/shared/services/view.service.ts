import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  @Output() viewFire: EventEmitter<any> = new EventEmitter();

  constructor() { }

  viewChange(view) {
    this.viewFire.emit(view);
  }

  getView() {
    return this.viewFire;
  }
}
