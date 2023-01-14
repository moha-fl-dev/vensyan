import { render } from '@testing-library/react';

import OnboardingLayout from './onboarding-layout';

describe('OnboardingLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OnboardingLayout />);
    expect(baseElement).toBeTruthy();
  });
});
