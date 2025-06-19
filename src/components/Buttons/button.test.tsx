import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  const LABEL = 'Click me';

  it('renders primary variant with correct text and styles', () => {
    render(<Button text={LABEL} variant="primary" />);
    const btn = screen.getByRole('button', { name: LABEL });

    expect(btn).toHaveTextContent(LABEL);

    // core layout styles
    expect(btn).toHaveStyle({
      display: 'flex',
      width: '100%',
      gap: '8px',
      padding: '16px 28.5px',
      cursor: 'pointer',
    });

    // variant-specific
    expect(btn).toHaveStyle({
      background: 'var(--foreground)',
      border: 'none',
      color: 'var(--background)',
      textDecoration: 'none',
    });
  });

  it('renders secondary variant styles', () => {
    render(<Button text={LABEL} variant="secondary" />);
    const btn = screen.getByRole('button', { name: LABEL });

    expect(btn).toHaveStyle({
      background: 'var(--background)',
      border: '1px solid var(--foreground)',
      color: 'var(--foreground)',
      cursor: 'pointer',
      textDecoration: 'none',
    });
  });

  it('renders link variant styles', () => {
    render(<Button text={LABEL} variant="link" />);
    const btn = screen.getByRole('button', { name: LABEL });

    expect(btn).toHaveStyle({
      background: 'transparent',
      border: 'none',
      color: 'var(--foreground)',
      cursor: 'pointer',
      textDecoration: 'underline',
    });
  });

  it('renders disabled variant styles and does not call onClick', () => {
    const onClick = vi.fn();
    render(<Button text={LABEL} variant="disabled" onClick={onClick} />);
    const btn = screen.getByRole('button', { name: LABEL });

    expect(btn).toBeDisabled();
    expect(btn).toHaveStyle({
      background: 'rgb(204, 204, 204)',
      cursor: 'not-allowed',
      color: 'var(--foreground)',
      borderStyle: 'none',
    });

    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('calls onClick handler when provided and not disabled', () => {
    const onClick = vi.fn();
    render(<Button text={LABEL} variant="primary" onClick={onClick} />);
    const btn = screen.getByRole('button', { name: LABEL });

    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders an icon when provided', () => {
    const ICON_TEXT = '★';
    render(
      <Button text={LABEL} variant="primary" icon={<span>{ICON_TEXT}</span>} />,
    );

    const iconElement = screen.getByText(ICON_TEXT);
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.tagName.toLowerCase()).toBe('span');

    const btn = screen.getByRole('button', { name: `${ICON_TEXT} ${LABEL}` });
    expect(btn).toContainElement(iconElement);
    expect(screen.getByText(LABEL)).toBeInTheDocument();
  });

  it('renders the ButtonText styled span with correct typography', () => {
    render(<Button text="Test" variant="primary" />);
    const textSpan = screen.getByText('Test');
    expect(textSpan).toHaveStyle({
      fontSize: '12px',
      fontWeight: '300',
      textTransform: 'uppercase',
    });
  });

  it('does not render extra wrapper span when icon prop is not provided', () => {
    render(<Button text={LABEL} variant="primary" />);
    const spans = screen.getAllByText(LABEL);
    expect(spans).toHaveLength(1);
  });
});
