import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ListingCard from '@/components/cards/ListingCard';

const fakeImage = {
  url: '/media/images/test.jpg',
  full_url: 'http://localhost:8000/media/images/test.jpg',
  width: 180,
  height: 180,
  alt: 'Test image',
};

describe('ListingCard', () => {
  it('uses h3 by default (h2=false)', () => {
    render(<ListingCard url="/breads/sourdough" title="Sourdough" />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Sourdough',
    );
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
  });

  it('uses h2 when h2 prop is true', () => {
    render(<ListingCard url="/breads/sourdough" title="Sourdough" h2 />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Sourdough',
    );
  });

  it('renders metadata table rows when meta is provided', () => {
    render(
      <ListingCard
        url="/breads/sourdough"
        title="Sourdough"
        meta={[
          { label: 'Origin', value: 'France' },
          { label: 'Type', value: 'Wheat' },
        ]}
      />,
    );
    expect(screen.getByText('Origin')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Wheat')).toBeInTheDocument();
  });

  it('omits metadata table when no meta is provided', () => {
    const { container } = render(
      <ListingCard url="/breads/sourdough" title="Sourdough" />,
    );
    expect(container.querySelector('table')).toBeNull();
  });

  it('omits image figure when no image is provided', () => {
    const { container } = render(
      <ListingCard url="/breads/sourdough" title="Sourdough" />,
    );
    expect(container.querySelector('figure')).toBeNull();
  });

  it('renders the required BEM class structure', () => {
    const { container } = render(
      <ListingCard
        url="/breads/sourdough"
        title="Sourdough"
        image={fakeImage}
        meta={[{ label: 'Origin', value: 'France' }]}
      />,
    );
    expect(container.querySelector('.listing-card')).toBeInTheDocument();
    expect(container.querySelector('.listing-card__link')).toBeInTheDocument();
    expect(container.querySelector('.listing-card__image')).toBeInTheDocument();
    expect(
      container.querySelector('.listing-card__contents'),
    ).toBeInTheDocument();
    expect(container.querySelector('.listing-card__title')).toBeInTheDocument();
    expect(container.querySelector('.listing-card__meta')).toBeInTheDocument();
    expect(
      container.querySelector('.listing-card__meta-category'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('.listing-card__meta-content'),
    ).toBeInTheDocument();
  });
});
