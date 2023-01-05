import { render } from '@testing-library/react';

import DashboardNav from './dashboard-nav';

describe('DashboardNav', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardNav />);
    expect(baseElement).toBeTruthy();
  });
});
