import { render } from '@testing-library/react';

import SideNavItem from './side-nav-item';

describe('SideNavItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SideNavItem />);
    expect(baseElement).toBeTruthy();
  });
});
