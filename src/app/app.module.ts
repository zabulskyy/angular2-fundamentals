import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {TaskManager} from './root';
import {TaskComponent} from './task/task.component';
import {LoginSystemComponent } from './login-system/login-system.component';
import {DragulaModule} from 'ng2-dragula';

@NgModule({
  declarations: [
    TaskManager,
    TaskComponent,
    LoginSystemComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule
  ],
  providers: [
    {provide: 'task', useClass: TaskComponent},
    {provide: 'constr', useClass: TaskManager},
  ],
  bootstrap: [TaskManager]
})
export class AppModule {
}
