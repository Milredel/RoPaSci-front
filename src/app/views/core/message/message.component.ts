import { Component } from '@angular/core';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  constructor(
    public messageService: MessageService
  ) {
  }
}
