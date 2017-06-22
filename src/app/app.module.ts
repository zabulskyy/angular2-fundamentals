import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import {MailService} from './mail.service';
import { GeneratorComponent } from './generator/generator.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleFormComponent,
    GeneratorComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide:'task', useClass:TaskComponent},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
