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

  it('renders the text input with correct placeholder and no clear button initially', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search for a smartphone');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(screen.queryByAltText('Clear search')).not.toBeInTheDocument();
  });

  it('calls router.replace on each keystroke with the updated search param', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search for a smartphone');
    fireEvent.change(input, { target: { value: 'apple' } });

    expect(input).toHaveValue('apple');
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/?search=apple', {
      scroll: false,
    });
  });

  it('shows a clear button when there is text, and clears input & URL on click', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search for a smartphone');

    fireEvent.change(input, { target: { value: 'xyz' } });
    const clearBtn = screen.getByRole('button');
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn);
    expect(input).toHaveValue('');
    expect(mockReplace).toHaveBeenCalledWith('/?', { scroll: false });
  });

  it('accepts an initialValue prop to pre-populate the input and show clear', () => {
    render(<SearchInput initialValue="hello" />);
    const input = screen.getByPlaceholderText('Search for a smartphone');

    expect(input).toHaveValue('hello');
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
