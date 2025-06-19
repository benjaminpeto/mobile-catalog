import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { StorageOption } from '@/types/api';

import { StorageSelector } from './storage-selector';

vi.mock('@/components', () => ({
  __esModule: true,
  ParagraphText: ({ children }: any) => <p>{children}</p>,
}));

describe('StorageSelector', () => {
  let options: StorageOption[];
  let onSelect: (opt: StorageOption) => void;

  beforeEach(() => {
    options = [
      { capacity: '64GB', price: 0 },
      { capacity: '128GB', price: 50 },
    ];
    onSelect = vi.fn();
  });

  it('renders the prompt and a button for each storage option', () => {
    render(
      <StorageSelector options={options} selected={null} onSelect={onSelect} />,
    );

    expect(
      screen.getByText('Storage. How much space do you need?'),
    ).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(options.length);
    expect(buttons[0]).toHaveTextContent('64GB');
    expect(buttons[1]).toHaveTextContent('128GB');
  });

  it('applies the "selected" class only to the selected storage option', () => {
    render(
      <StorageSelector
        options={options}
        selected={options[1]}
        onSelect={onSelect}
      />,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).not.toHaveClass('selected');
    expect(buttons[1]).toHaveClass('selected');
  });

  it('calls onSelect with the correct option when a button is clicked', () => {
    render(
      <StorageSelector options={options} selected={null} onSelect={onSelect} />,
    );

    const btn64 = screen.getByRole('button', { name: '64GB' });
    const btn128 = screen.getByRole('button', { name: '128GB' });

    fireEvent.click(btn128);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(options[1]);

    fireEvent.click(btn64);
    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenCalledWith(options[0]);
  });
});
