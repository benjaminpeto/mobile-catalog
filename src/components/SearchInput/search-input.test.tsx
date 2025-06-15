import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SearchInput } from './search-input';

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: any) => <img {...props} />,
}));

const mockReplace = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => mockSearchParams,
}));

describe('SearchInput', () => {
  beforeEach(() => {
    mockReplace.mockClear();
    mockSearchParams.delete('search');
  });

  it('renders the input, no clear button initially, and shows the results count', () => {
    const count = 7;
    render(<SearchInput numberOfItems={count} />);

    const input = screen.getByPlaceholderText('Search for a smartphone');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(screen.queryByAltText('Clear search')).not.toBeInTheDocument();

    const results = screen.getByText(`${count} Results`);
    expect(results).toBeInTheDocument();
    expect(results.tagName.toLowerCase()).toBe('p');
    expect(results).toHaveStyle({
      fontSize: '14px',
      textTransform: 'uppercase',
    });
  });

  it('calls router.replace on each keystroke with updated search param', () => {
    render(<SearchInput numberOfItems={0} />);
    const input = screen.getByPlaceholderText('Search for a smartphone');

    fireEvent.change(input, { target: { value: 'apple' } });
    expect(input).toHaveValue('apple');
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/?search=apple', {
      scroll: false,
    });
  });

  it('shows clear button when typing and clears input & URL on click', () => {
    render(<SearchInput numberOfItems={0} />);
    const input = screen.getByPlaceholderText('Search for a smartphone');

    fireEvent.change(input, { target: { value: 'xyz' } });
    const clearBtn = screen.getByRole('button');
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn);
    expect(input).toHaveValue('');
    expect(mockReplace).toHaveBeenCalledWith('/?', { scroll: false });
  });

  it('pre-populates from initialValue and shows clear button but does not auto-call replace', () => {
    render(<SearchInput initialValue="hello" numberOfItems={2} />);
    const input = screen.getByPlaceholderText('Search for a smartphone');

    expect(input).toHaveValue('hello');
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('2 Results')).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
