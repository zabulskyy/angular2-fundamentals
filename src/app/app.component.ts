import {Component, Inject} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="col-lg-6">
      <div class="input-group">
        <input  class="form-control"  #taskText type="text" id="taskCreator" placeholder="Enter your task here">
        <button
          class="input-group-addon"
          (keydown)="createTaskByKeydown(taskText.value, $event); taskText.value='' "
          (click)="createTask(taskText.value); taskText.value='' ">
          Create task
        </button>
      </div>
    </div>

    <div class="col-lg-6">
      <table class="table table-hover">
        <tbody>
        <tr *ngFor = "let properties of this.tasksText" [id]= "properties[1]">
          <app-task [text] = "properties[0]" [num]="properties[1]">
          </app-task>
        </tr>
        </tbody>
      </table>
    </div>
  `
})
export class AppComponent {

  tasksText = [];
  number = 0;

  createTask(text){
    if (text != ""){
      this.tasksText.push([text, this.number]);
      this.number++;
    }
  }
  createTaskByKeydown(text, event){
    console.log(event.keyCode);
    if (text != "" && event.keyCode == 13){
      this.tasksText.push([text, this.number]);
      this.number++;
    }
  }

  title = 'app works';
  constructor(@Inject('task') public task) {
  }
}
