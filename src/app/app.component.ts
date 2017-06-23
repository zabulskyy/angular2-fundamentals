import {Component, Injectable} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="col-lg-6">
      <div class="input-group">
        <input
          class="form-control" #taskCreator type="text" id="taskCreator" placeholder="Enter your task here" autocomplete="off"
          (keydown)="createTaskWithKeypress($event, taskCreator.value, taskCreator)">
        <button
          class="input-group-addon"
          (click)="createTask(taskCreator.value, taskCreator)">
          Create task
        </button>
      </div>
    </div>

    <div class="col-lg-6">
      <table class="table table-hover">
        <tbody>
        <table class="table table-hover">
          <tbody>
          <tr *ngFor="let task of tasks">
            <!-- app-task is an element of 'to do' list 
                it calls a single function with @Output to this component (delete)
                a loop, which goes throug tasks array and creates elements
            -->
            <app-task
              (deleteTask)="deleteTask($event)"
              [text]=task.value
              [num]=task.key>
            </app-task>
          </tr>
          </tbody>
        </table>
      </table>
    </div>
  `
}) @Injectable()
export class AppComponent {

  tasks = [];
  /*
   * container of our TODOes
   * format:
   * [
   * {key: 0, value: "fix car"},
   * {key: 1, value: "buy some milk"}, ...
   * ]
   */
  number = 0;
  /*
   * index for our 'to do' list elements
   * each new element has its own unique index
   */

  createTask(text, taskCreator) {
    /*
     * text is text, given from input, taskCreator is an input object
     * creates a single <app-task> with current variable number and text, given to the function
     * push text with index into tasks array, which will be showed by *ngFor in this component
     */
    if (text != '') {
      this.tasks.push({
        key: this.number,
        value: text
      });
      this.number++;
      taskCreator.value = '';  // clean input field
    }
  }

  createTaskWithKeypress(event, text, taskCreator) {
    /*
     * event is to define Enter key button, text is text, given from input, taskCreator is an input object
     * the same as create task, but with pressing Enter key button
     */
    if (event.keyCode == 13) {
      if (text != '') {
        this.tasks.push({
          key: this.number,
          value: text
        });
        this.number++;
        taskCreator.value = '';  // clean input field
      }
    }
  }

  deleteTask(key) {
    /*
     * seek for element in tasks array with given key and remove it from an array
     * key is a number which must be in tasks array
     * */

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].key == key) {
        this.tasks.splice(this.tasks.indexOf(this.tasks[i]), 1);
      }
    }
  }

  constructor() {
  }
}
