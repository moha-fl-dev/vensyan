import { render } from '@testing-library/react';

import BusinessUi from './business-ui';

describe('BusinessUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BusinessUi />);
    expect(baseElement).toBeTruthy();
  });
});
