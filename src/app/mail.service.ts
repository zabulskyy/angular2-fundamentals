import { Injectable } from '@angular/core';

@Injectable()
export class MailService {
  messages = [
    `Hello!`,
    `See this website`,
    `You've got mail`
  ];
  constructor() { }

}
