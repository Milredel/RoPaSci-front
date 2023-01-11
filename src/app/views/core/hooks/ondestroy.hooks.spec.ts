import { OnDestroyHook } from './ondestroy.hook';
import { expect } from '../../../../test';
import { Subject, Subscription } from 'rxjs';

class MockedClass extends OnDestroyHook {

}

describe('OnDestroyHook', () => {
  let cls: OnDestroyHook;

  beforeEach(() => {
    cls = new MockedClass();
  });

  it('should init cls', () => {
    return expect(cls).to.not.be.undefined;
  });

  it('should add subscriptions', () => {
    cls.addSubscription(new Subscription(), new Subscription(), new Subscription());

    expect(cls['subscriptions']).to.have.lengthOf(3);

    cls.ngOnDestroy();

    return expect(cls['subscriptions']).to.have.lengthOf(0);
  });

  it('should reset the subscription', () => {
    const sub = new Subject();

    const subscription = sub.subscribe(() => null);

    cls.addSubscription(subscription);
    cls.ngOnDestroy();

    return expect(subscription.closed).to.be.true;

  });
});
