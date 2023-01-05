import { render } from '@testing-library/react';

import NextLinkMuiStyle from './next-link-mui-style';

describe('NextLinkMuiStyle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NextLinkMuiStyle />);
    expect(baseElement).toBeTruthy();
  });
});
