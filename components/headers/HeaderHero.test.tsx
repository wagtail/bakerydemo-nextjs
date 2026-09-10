import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HeaderHero from '@/components/headers/HeaderHero';

const fakeImage = {
  url: '/media/images/hero.jpg',
  full_url: 'http://localhost:8000/media/images/hero.jpg',
  width: 1920,
  height: 600,
  alt: 'Hero image',
};

describe('HeaderHero', () => {
  it('renders full-width hero with image overlay when image is provided', () => {
    const { container } = render(
      <HeaderHero title="Sourdough" image={fakeImage} />,
    );
    expect(
      container.querySelector('.container-fluid.hero'),
    ).toBeInTheDocument();
    expect(container.querySelector('.hero-image')).toBeInTheDocument();
    expect(container.querySelector('.hero__container')).toBeInTheDocument();
    expect(container.querySelector('.hero__title')).toHaveTextContent(
      'Sourdough',
    );
  });

  it('renders plain title in grid layout when no image', () => {
    const { container } = render(<HeaderHero title="Sourdough" />);
    expect(container.querySelector('.container-fluid')).toBeNull();
    expect(container.querySelector('.hero-image')).toBeNull();
    expect(container.querySelector('.container')).toBeInTheDocument();
    expect(container.querySelector('.col-md-7')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Sourdough',
    );
  });

  it('sets hero image alt from the rendition', () => {
    const { container } = render(<HeaderHero title="Test" image={fakeImage} />);
    const img = container.querySelector('img.hero-image');
    expect(img).toHaveAttribute('alt', 'Hero image');
  });
});
