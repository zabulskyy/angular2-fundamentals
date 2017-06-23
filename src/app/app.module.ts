import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TaskComponent} from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide: 'task', useClass: TaskComponent},
    {provide: 'constr', useClass: AppComponent},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
