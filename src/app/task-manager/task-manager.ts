import {Component, Inject, Injectable} from '@angular/core';
import {DragulaService} from 'ng2-dragula';  // service to provide drag and drop
import {TaskComponent} from 'app/task/task.component';

@Component({
  selector: 'todo-task-manager',
  template: `
    <div class="input-group" style="border-radius: 5px">
      <input
        class="form-control" #taskInput type="text" id="taskInput" placeholder="Enter your task here" autocomplete="off"
        (keydown)="createTaskWithKeyPress($event, taskInput.value, taskInput)">
      <button
        class="input-group-addon"
        (click)="createTaskWithButton(taskInput.value, taskInput)">
        Create task
      </button>
    </div>
    <br>
    <div class="table table-hover" [dragula]='"first-bag"' id="task-container">
      <!-- app-task is an element of 'to do' list 
          it calls a single function with @Output to this component (delete)
          a loop, which goes throug tasks array and creates elements
      -->
      <todo-task
        *ngFor="let element of tasks"
        (deleteTask)="deleteTask($event)"
        [text]="element.text"
        [num]="element.num">
        {{element}}
      </todo-task>
    </div>
  `
}) @Injectable()
export class TaskManager {

  constructor(private dragulaService: DragulaService) {
    dragulaService.drop.subscribe(() => {
      this.onDrop();
    });
  }

  tasks = [];
  /*
   * container of our TODOes
   * format:
   * [
   * {key: 0, value: "fix car"},
   * {key: 1, value: "buy some milk"}, ...
   * ]
   * */
  number = 0;
  /*
   * index for our 'to do' list elements
   * each new element has its own unique index
   * */

  createTaskWithButton(text, taskInput) {
    /*
     * text is text, given from input, taskInput is an input object
     * creates a single <app-task> with current variable number and text, given to the function
     * push text with index into tasks array, which will be showed by *ngFor in this component
     * */

    if (text != '') {
      let inst_num = this.number;
      let inst_text = text;
      let inst_task = new TaskComponent();
      inst_task.num = inst_num;
      inst_task.text = inst_text;
      this.tasks.push(inst_task);
      this.number++;
      taskInput.value = '';  // clean input field
    }
  }

  createTaskWithKeyPress(event, text, taskInput) {
    /*
     * event is to define Enter key button, text is text, given from input, taskInput is an input object
     * the same as create task, but with pressing Enter key button
     * */
    if (event.keyCode == 13 && text != '') {
      let inst_num = this.number;
      let inst_text = text;
      let inst_task = new TaskComponent();
      inst_task.num = inst_num;
      inst_task.text = inst_text;
      this.tasks.push(inst_task);
      this.number++;
      taskInput.value = '';  // clean input field
    }
  }

  deleteTask(num) {
    /*
     * seek for element in tasks array with given key and remove it from an array
     * key is a number which must be in tasks array
     * */
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].num == num) {
        this.tasks.splice(this.tasks.indexOf(this.tasks[i]), 1);
      }
    }
  }


  private onDrop() {
    /*
     * happens when element was dragged and dropped
     * reorganize tasks list to gain new tasks order
     * */
    this.reorganize();
  }

  private reorganize() {
    /*
     * return tasks list proper order by visible task items
     * */
    let visible_tasks = document.getElementsByTagName('todo-task');
    let new_tasks_list = [];
    for (let i = 0; i < visible_tasks.length; i++) {
      let inst_num = visible_tasks[i].getAttribute("ng-reflect-num");
      let inst_text = visible_tasks[i].getAttribute("ng-reflect-text");
      let inst_task = new TaskComponent();
      inst_task.num = inst_num;
      inst_task.text = inst_text;
      new_tasks_list.push(inst_task);
    }
    this.tasks = new_tasks_list.slice(0, new_tasks_list.length - 1);
  }

}
