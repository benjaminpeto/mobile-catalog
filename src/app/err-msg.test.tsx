import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import ErrorMsg from './err-msg';

it('Check the ErrorMsg', () => {
  render(<ErrorMsg error="Error msg 1" />);
  screen.debug();
  expect(screen.getByTestId('TEST_ID')).toHaveTextContent('Error');
});
