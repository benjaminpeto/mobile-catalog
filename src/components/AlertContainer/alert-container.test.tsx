import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { AlertContainer } from './alert-container';

describe('AlertContainer', () => {
  it('renders its children and applies the default padding', () => {
    render(
      <AlertContainer>
        <span>Alert message</span>
      </AlertContainer>,
    );

    const child = screen.getByText('Alert message');
    expect(child).toBeInTheDocument();
    expect(child.tagName.toLowerCase()).toBe('span');

    const wrapper = child.parentElement!;
    expect(wrapper.tagName.toLowerCase()).toBe('div');

    expect(wrapper).toHaveStyle({
      padding: '24px 100px',
    });
  });
});
