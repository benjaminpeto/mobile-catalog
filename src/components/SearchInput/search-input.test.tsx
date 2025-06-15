import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { SearchInput } from './search-input';

// Mock next/image to render a plain <img> so we can assert on it
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('SearchInput', () => {
  it('renders the SearchInputContainer with correct layout styles', () => {
    render(<SearchInput />);
    const container = screen.getByText('20 results').parentElement!;
    expect(container).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 100px',
      marginTop: '80px',
      gap: '12px',
    });
  });

  it('renders the InputWrapper with relative positioning and full width', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search for a smartphone...');
    const wrapper = input.parentElement!;
    expect(wrapper).toHaveStyle({
      position: 'relative',
      width: '100%',
    });
  });

  it('renders a text input with correct attributes and base styles', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText(
      'Search for a smartphone...',
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input.value).toBe('');
    expect(input).toHaveStyle({
      width: '100%',
      fontSize: '16px',
      padding: '8px 0px',
      border: 'none',
      borderBottom: '0.5px solid var(--foreground)',
    });
  });

  it('does not show the clear button when the input is empty', () => {
    render(<SearchInput />);
    expect(screen.queryByAltText('Clear search')).not.toBeInTheDocument();
  });

  it('shows a clear button when you type, and clears on click', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText(
      'Search for a smartphone...',
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input.value).toBe('hello');

    const clearBtn = screen.getByRole('button');
    expect(clearBtn).toBeInTheDocument();

    const img = screen.getByAltText('Clear search') as HTMLImageElement;
    expect(img).toHaveAttribute('src', '/x.svg');
    expect(img).toHaveAttribute('width', '8');
    expect(img).toHaveAttribute('height', '8');

    expect(clearBtn).toHaveStyle({
      position: 'absolute',
      right: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });

    fireEvent.click(clearBtn);
    expect(input.value).toBe('');
    expect(screen.queryByAltText('Clear search')).not.toBeInTheDocument();
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
