import { Injectable } from '@angular/core';
import { AlertMessage, AlertMessageType } from './message.service.contracts';
import { GuidUtils } from '../../utils/guid.utils';


@Injectable()
export class MessageService {
  public messages: AlertMessage[] = [];
  private defaultTimeout = 5000;

  constructor() {
  }

  add(title: string, type: AlertMessageType, content: string, footer?: string): void {
    const id = GuidUtils.newGuid();

    this.messages.push({id, title, type, content, footer});

    setTimeout(() => {
      this.messages = this.messages.filter((message: AlertMessage) => message.id !== id);
    }, this.defaultTimeout);
  }
}
