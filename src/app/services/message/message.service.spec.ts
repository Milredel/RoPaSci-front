import { expect, stub } from '../../../test';
import { MessageService } from './message.service';
import { GuidUtils } from '../../utils/guid.utils';
import { AlertMessageType } from './message.service.contracts';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
    service['defaultTimeout'] = 500;
  });

  it('should init the component', () => {
    return expect(service).to.not.be.undefined;
  });

  describe('add', () => {
    it('should add a message', (done) => {
      stub(GuidUtils, 'newGuid').callsFake(() => 'some_id_generated');

      service.add('test title', AlertMessageType.ERROR, 'test content', 'test footer');

      expect(service.messages).to.have.lengthOf(1);
      expect(service.messages).to.be.deep.eq([{
        id: 'some_id_generated',
        title: 'test title',
        type: AlertMessageType.ERROR,
        content: 'test content',
        footer: 'test footer'
      }]);

      setTimeout(() => {
        return expect(service.messages).to.have.lengthOf(0) && done();
      }, 800);
    });
  });
});
