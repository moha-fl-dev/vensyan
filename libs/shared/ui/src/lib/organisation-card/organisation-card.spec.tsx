import { render } from '@testing-library/react';

import OrganisationCard from './organisation-card';

describe('OrganisationCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrganisationCard />);
    expect(baseElement).toBeTruthy();
  });
});
