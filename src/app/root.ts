import {Component,Injectable} from '@angular/core';
import {DragulaService} from 'ng2-dragula';  // service to provide drag and drop

@Component({
  selector: 'todo-root',
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
        [index]="element.index"
        [decor]="element.decoration">
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
   * container of task objects
   * tasks are rendered by this array and *ngFor
   * */

  number = 0;
  /*
   * index for our 'to do' list elements
   * each new element has its own unique index
   * deleting tasks are not decreasing this number
   * */


  createTaskWithButton(text, taskInput) {
    /*
     * text is text, given from input, taskInput is an input object
     * creates a single <app-task> with current variable number and text, given to the function
     * push text with index into tasks array, which will be showed by *ngFor in this component
     * */

    if (text != '') {
      let element = {
        text: text,
        index: this.number,
        decoration: 'none'
      };  // create an array of properties to our new task
      this.tasks.push(element);  // push task into tasks list
      this.number++;
      taskInput.value = '';  // clean up input field
    }
  }

  createTaskWithKeyPress(event, text, taskInput) {
    /*
     * event is to define Enter key button, text is text, given from input, taskInput is an input object
     * the same as create task, but with pressing Enter key button
     * */
    if (event.keyCode == 13 && text != '') {
      let element = {
        text: text,
        index: this.number,
        decoration: 'none'
      };  // create an array of properties to our new task
      this.tasks.push(element);  // push task into tasks list
      this.number++;
      taskInput.value = '';  // clean up input field
    }
  }

  deleteTask(index) {
    /*
     * seek for element in tasks array with given key and remove it from an array
     * key is a number which must be in tasks array
     * */
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].index == index) {
        this.tasks.splice(this.tasks.indexOf(this.tasks[i]), 1);
        break;
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
     * drag & drop creates new tasks order, so we have to refresh it to save in tasks list
     * */
    let visible_tasks = document.getElementsByTagName('todo-task');  // find all tasks in new order
    let new_tasks_list = [];  // new task list; there will be pushed tasks in new order
    for (let i = 0; i < visible_tasks.length; i++) {
      let inst_index = visible_tasks[i].getAttribute('ng-reflect-index');
      let inst_text = visible_tasks[i].getAttribute('ng-reflect-text');
      let inst_decor = visible_tasks[i].getAttribute('ng-reflect-decor');
      let element = {
        text: inst_text,
        index: inst_index,
        decoration: inst_decor
      };  // create an array of properties to our new task
      new_tasks_list.push(element);  // push task into tasks list
      this.number++;
    }
    this.tasks = new_tasks_list.slice(0, new_tasks_list.length - 1);
    //  drag & drop  creates a new task in the end of current, it is duplicated, so we don't need it
  }

}
