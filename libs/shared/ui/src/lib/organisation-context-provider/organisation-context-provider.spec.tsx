import { render } from '@testing-library/react';

import OrganisationContextProvider from './organisation-context-provider';

describe('OrganisationContextProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrganisationContextProvider />);
    expect(baseElement).toBeTruthy();
  });
});
