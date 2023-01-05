import { render } from '@testing-library/react';

import AuthOptionsText from './auth-options-text';

describe('AuthOptionsText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthOptionsText />);
    expect(baseElement).toBeTruthy();
  });
});
