import {Component, Inject, Injectable} from '@angular/core';

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
          (click)="createTask(taskCreator.value)">
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
            <app-task
              (deleted)="deleteTask($event)"
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
  number = 0;

  createTask(text) {
    if (text != '') {
      this.tasks.push({
        key: this.number,
        value: text
      });
      this.number++;
    }
  }

  createTaskWithKeypress(event, text, taskCreator) {
    if (event.keyCode == 13) {
      if (text != '') {
        this.tasks.push({
          key: this.number,
          value: text
        });
        this.number++;
        taskCreator.value = '';
      }
    }
  }

  deleteTask(key) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].key == key) {
        this.tasks.splice(this.tasks.indexOf(this.tasks[i]), 1);
      }
    }
  }

  title = 'app works';

  constructor(@Inject('task') public task) {
  }
}
