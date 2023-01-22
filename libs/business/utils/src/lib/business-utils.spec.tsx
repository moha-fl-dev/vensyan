import { render } from '@testing-library/react';

import BusinessUtils from './business-utils';

describe('BusinessUtils', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BusinessUtils />);
    expect(baseElement).toBeTruthy();
  });
});
