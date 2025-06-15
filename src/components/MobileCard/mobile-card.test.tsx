import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MobileCard } from './mobile-card';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

describe('MobileCard', () => {
  const props = {
    idx: 0,
    productId: 'abc123',
    name: 'SuperPhone',
    brand: 'MegaCorp',
    price: 499,
    imageUrl: 'https://example.com/superphone.jpg',
    onClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('wraps everything in a link to the product page', () => {
    render(<MobileCard {...props} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/${props.productId}`);

    const article = link.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  it('renders the product image with correct attributes and inline style', () => {
    render(<MobileCard {...props} />);
    const img = screen.getByAltText(`${props.name} image`) as HTMLImageElement;

    expect(img).toBeInTheDocument();
    expect(img.src).toContain(props.imageUrl);
    expect(img).toHaveAttribute('width', '312');
    expect(img).toHaveAttribute('height', '257');
    expect(img).toHaveStyle({ objectFit: 'contain' });
  });

  it('shows the brand in a paragraph', () => {
    render(<MobileCard {...props} />);
    const brandP = screen.getByText(props.brand);

    expect(brandP).toBeInTheDocument();
    expect(brandP.tagName.toLowerCase()).toBe('p');
  });

  it('shows the product name in an h2', () => {
    render(<MobileCard {...props} />);
    const nameH2 = screen.getByRole('heading', { level: 2 });

    expect(nameH2).toHaveTextContent(props.name);
  });

  it('shows the price with EUR suffix in a paragraph', () => {
    render(<MobileCard {...props} />);
    const priceP = screen.getByText(`${props.price} EUR`);

    expect(priceP).toBeInTheDocument();
    expect(priceP.tagName.toLowerCase()).toBe('p');
  });
});
