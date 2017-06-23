import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-task',
  template: `
      <td>
        <input  class="form-check-input" type="checkbox" (click)="strike()">
      </td>
      <td (click)="strike()"  style="cursor: pointer">
        <span [style.text-decoration]="decor"> {{text}} </span>
      </td>
      <td>
        <div (click)="done()">
          <span aria-hidden="true" style="cursor: pointer"> &#10006;</span>
        </div>
      </td>
  `,
  styles: [`
    h4{
      display: inline;
    }
  `],
})@Injectable()
export class TaskComponent implements OnInit {
  @Input() text;
  @Input() num;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  decor = "none";
  done(){
    this.deleted.emit(this.num);
  }
  strike(){
    if(this.decor == "none")
      this.decor = "line-through";
    else
      this.decor = "none";
    alert(this.num);
  }
  constructor() {
  }

  ngOnInit() {
  }

}
