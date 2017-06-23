import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-task',
  template: `
    <td>
      <input #taskCheckBox style="margin: 0;" class="form-check-input" type="checkbox" (click)="strike(taskCheckBox)">
    </td>
    <td (click)="strike(taskCheckBox)" style="cursor: pointer">
      <span [style.text-decoration]="decor"> {{text}} </span>
    </td>
    <td>
      <div (click)="done()">
        <span aria-hidden="true" style="cursor: pointer"> &#10006;</span>
      </div>
    </td>
  `,
  styles: [`
    h4 {
      display: inline;
    }
  `],
})
export class TaskComponent implements OnInit {
  @Input() text;  // task's text
  @Input() num;  // tasks unique number
  @Output() deleteTask: EventEmitter<number> = new EventEmitter<number>();

  decor = 'none';  // variable to define line-through text in task

  done() {
    /*
     * send message to a parent (AppComponent) to delete task
     */
    this.deleteTask.emit(this.num);
  }

  strike(checkbox) {
    /*
     * give a text in task line-through decoration or remove this decoration by defining variable decor
     */
    if (this.decor == 'none'){
      checkbox.checked = true;
      this.decor = 'line-through';
    }
    else{
      checkbox.checked = false;
      this.decor = 'none';
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

}
