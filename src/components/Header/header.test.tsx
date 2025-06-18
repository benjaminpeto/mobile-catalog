import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { Header, Paragraph, SubHeader } from './header';
import { ParagraphText, SubHeading } from './header.styles';

describe('Header', () => {
  it('renders an h1 with the provided text and correct default styles', () => {
    render(<Header text="Welcome Home" />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Welcome Home');
    expect(h1).toHaveStyle({
      fontSize: '24px',
      textTransform: 'uppercase',
    });
  });
});

describe('SubHeader', () => {
  it('renders an h2 with the provided text and default font-size', () => {
    render(<SubHeader text="Section Title" />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('Section Title');
    expect(h2).toHaveStyle({
      fontSize: '12px',
      textTransform: 'uppercase',
    });
  });
});

describe('Paragraph', () => {
  it('renders a p with the provided text and default styles', () => {
    render(<Paragraph text="This is a paragraph." />);
    const p = screen.getByText('This is a paragraph.');
    expect(p.tagName.toLowerCase()).toBe('p');
    expect(p).toHaveStyle({
      fontSize: '14px',
      textTransform: 'uppercase',
    });
  });
});

describe('SubHeading styled component (direct prop overrides)', () => {
  it('applies a custom fontSize when passed', () => {
    render(<SubHeading $fontSize="20px">Custom Size</SubHeading>);
    const h2 = screen.getByText('Custom Size');
    expect(h2.tagName.toLowerCase()).toBe('h2');
    expect(h2).toHaveStyle({
      fontSize: '20px',
      textTransform: 'uppercase', // still uppercase by default
    });
  });
});

describe('ParagraphText styled component (direct prop overrides)', () => {
  it('applies a custom fontSize when passed', () => {
    render(<ParagraphText $fontSize="18px">Big Text</ParagraphText>);
    const p = screen.getByText('Big Text');
    expect(p.tagName.toLowerCase()).toBe('p');
    expect(p).toHaveStyle({
      fontSize: '18px',
      textTransform: 'uppercase', // default
    });
  });
});
