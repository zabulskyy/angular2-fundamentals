import {Component, Input, OnInit, EventEmitter, Output, Injectable} from '@angular/core';

@Component({
  selector: 'todo-task',
  template: `
    <div class="line">
      <div style="cursor: move" class="cell">
        <span>&#9776;</span>
      </div>
      <div (click)="strike(taskCheckBox)" style="cursor: pointer" class="cell">
        <input #taskCheckBox style="margin: 0;" class="form-check-input" type="checkbox">
      </div>
      <div (click)="strike(taskCheckBox)" style="cursor: pointer; width: 100%;" class="cell">
        <span [style.text-decoration]="decor"> {{text}} </span>
      </div>
      <div class="cell x-mark" (click)="done()" style="cursor: pointer">
        <span aria-hidden="true"> &#10006;</span>
      </div>
    </div>
  `,
  styles: [`
    .x-mark:hover {
      color: crimson;
    }

    .line {
      background: #fbfbfb;
      height: 48px;
      padding: 12px;
    }

    .line:hover {
      background: ghostwhite;
    }

    .cell {
      padding: 0 12px 0 12px;
      display: table-cell;
      vertical-align: inherit;
    }

    h4 {
      display: inline;
    }
  `],
}) @Injectable()
export class TaskComponent implements OnInit {
  @Input() text;  // task's text
  @Input() index;  // tasks unique number
  @Input() decor = 'none';  // variable to define line-through text in task

  @Output() deleteTask: EventEmitter<number> = new EventEmitter<number>();


  done() {
    /*
     * send message to a parent (AppComponent) to delete task
     */
    this.deleteTask.emit(this.index);
  }

  strike(checkbox) {
    /*
     * give a text in task line-through decoration or remove this decoration by defining variable decor
     */
    if (this.decor == 'none') {
      checkbox.checked = true;
      this.decor = 'line-through';
    }
    else {
      checkbox.checked = false;
      this.decor = 'none';
    }
  }

  constructor() {

  }

  ngOnInit() {
  }

}
