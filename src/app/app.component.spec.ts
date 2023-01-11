import { expect } from 'chai';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  it('should init the component', () => {
    return expect(component).to.not.be.undefined;
  });
});
