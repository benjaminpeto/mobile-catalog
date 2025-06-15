import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { AlertContainer } from './alert-container';

describe('AlertContainer', () => {
  it('renders its children and applies the default padding', () => {
    render(
      <AlertContainer>
        <div data-testid="child">Alert message</div>
      </AlertContainer>,
    );

    const child = screen.getByTestId('child');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent('Alert message');

    const wrapper = child.parentElement!;
    expect(wrapper.tagName.toLowerCase()).toBe('div');

    expect(wrapper).toHaveStyle({
      padding: '24px 100px',
    });
  });
});
