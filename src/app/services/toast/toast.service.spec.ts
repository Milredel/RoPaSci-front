import { ToastService } from './toast.service';
import { expect, stub } from '../../../test';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    service = new ToastService();
  });

  it('should init the service', () => {
    return expect(service).to.not.be.undefined;
  });

  describe('log', () => {
    it('should fire log with options', () => {
      stub(service['toastr'], 'fire');

      service['log']('some icon', 'some title', 'some text', {some: 'options'} as any);

      return (expect(service['toastr'].fire) as any).to.have.been.calledWith({
        icon: 'some icon', title: 'some title', text: 'some text', some: 'options'
      });
    });
  });

  it('should log error', () => {
    stub(service, 'log');

    service.error('test title', 'test text', {other: 'options'} as any);

    return (expect(service['log']) as any).to.have.been.calledWith('error', 'test title', 'test text', {other: 'options'});
  });

  it('should log success', () => {
    stub(service, 'log');

    service.success('test title', 'test text', {other: 'options'} as any);

    return (expect(service['log']) as any).to.have.been.calledWith('success', 'test title', 'test text', {other: 'options'});
  });

  it('should log info', () => {
    stub(service, 'log');

    service.info('test title', 'test text', {other: 'options'} as any);

    return (expect(service['log']) as any).to.have.been.calledWith('info', 'test title', 'test text', {other: 'options'});
  });

  it('should log warning', () => {
    stub(service, 'log');

    service.warning('test title', 'test text', {other: 'options'} as any);

    return (expect(service['log']) as any).to.have.been.calledWith('warning', 'test title', 'test text', {other: 'options'});
  });
});
