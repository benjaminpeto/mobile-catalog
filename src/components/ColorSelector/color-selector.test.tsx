import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { ColorOption } from '@/types/api';

import { ColorSelector } from './color-selector';

vi.mock('@/components', () => ({
  __esModule: true,
  ParagraphText: ({ children }: any) => <p>{children}</p>,
}));

describe('ColorSelector', () => {
  let options: ColorOption[];
  let selected: ColorOption;
  let onSelect: (opt: ColorOption) => void;

  beforeEach(() => {
    options = [
      { name: 'Black', hexCode: '#000000', imageUrl: 'url-black' },
      { name: 'White', hexCode: '#FFFFFF', imageUrl: 'url-white' },
    ];
    selected = options[0];
    onSelect = vi.fn();
  });

  it('renders the prompt and a button for each color option', () => {
    render(
      <ColorSelector
        options={options}
        selected={selected}
        onSelect={onSelect}
      />,
    );

    expect(screen.getByText('Color. Pick your favourite')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(options.length);
  });

  it('applies inline background-color and the "selected" class correctly', () => {
    render(
      <ColorSelector
        options={options}
        selected={selected}
        onSelect={onSelect}
      />,
    );

    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toHaveClass('selected');
    expect(buttons[0]).toHaveStyle({ backgroundColor: '#000000' });
    expect(buttons[1]).not.toHaveClass('selected');
    expect(buttons[1]).toHaveStyle({ backgroundColor: '#FFFFFF' });
  });

  it('calls onSelect with the correct color when a swatch is clicked', () => {
    render(
      <ColorSelector
        options={options}
        selected={selected}
        onSelect={onSelect}
      />,
    );

    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[1]);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(options[1]);
  });
});
