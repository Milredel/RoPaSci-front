import { MessageComponent } from './message.component';
import { MessageService } from '../../../services/message/message.service';
import { expect, stubClass } from '../../../../test';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let messageService: MessageService;

  beforeEach(() => {
    component = new MessageComponent(
      messageService = stubClass(MessageService)
    );
  });

  it('should init the component', () => {
    return expect(component).to.not.be.undefined;
  });
});
