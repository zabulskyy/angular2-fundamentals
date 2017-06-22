import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-simple-form',
  template: `
    <div>
      <br>
      <input #myInput type="text">
      <button (click)="update.emit({text:message})">Click me!</button>
    </div>
  `,
  styles: []
})
export class SimpleFormComponent implements OnInit {

  @Input() message;

  @Output() update = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

}
