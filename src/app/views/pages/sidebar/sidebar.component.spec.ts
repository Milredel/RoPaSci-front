import { expect } from 'chai';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;

  beforeEach(() => {
    component = new SidebarComponent();
  });

  it('should init the component', () => {
    return expect(component).to.not.be.undefined;
  });
});
