import { expect } from 'chai';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;

  beforeEach(() => {
    component = new LayoutComponent();
  });

  it('should init the component', () => {
    return expect(component).to.not.be.undefined;
  });
});
