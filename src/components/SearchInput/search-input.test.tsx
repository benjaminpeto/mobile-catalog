import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { SearchInput } from './search-input';

describe('SearchInput', () => {
  it('wraps everything in a column flex container with correct spacing', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search for a smartphone...');
    const container = input.parentElement!;
    expect(container).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 100px',
      marginTop: '80px',
      gap: '12px',
    });
  });

  it('renders a text input with correct attributes and styles', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText(
      'Search for a smartphone...',
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveStyle({
      width: '100%',
      fontSize: '16px',
      padding: '8px 0px',
      border: 'none',
      borderBottom: '0.5px solid var(--foreground)',
    });
  });

  it('renders the results count with overridden fontSize and default text-transform', () => {
    render(<SearchInput />);
    const results = screen.getByText('20 results');
    expect(results).toBeInTheDocument();
    expect(results.tagName.toLowerCase()).toBe('p');
    expect(results).toHaveStyle({
      fontSize: '12px',
      textTransform: 'uppercase',
    });
  });
});
