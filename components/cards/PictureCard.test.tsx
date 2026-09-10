import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PictureCard from '@/components/cards/PictureCard';

const fakeImage = {
  url: '/media/images/test.jpg',
  full_url: 'http://localhost:8000/media/images/test.jpg',
  width: 645,
  height: 480,
  alt: 'Test image',
};

describe('PictureCard', () => {
  it('uses h2 in landscape mode (default)', () => {
    render(
      <PictureCard url="/locations/london" title="London" image={fakeImage} />,
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'London',
    );
  });

  it('uses h3 in portrait mode', () => {
    render(
      <PictureCard
        url="/blog/post"
        title="Blog Post"
        image={fakeImage}
        portrait
      />,
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Blog Post',
    );
  });

  it('renders the image at the dimensions provided by its rendition', () => {
    render(<PictureCard url="/test" title="Test" image={fakeImage} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('width', '645');
    expect(img).toHaveAttribute('height', '480');
  });

  it('renders the required BEM class structure', () => {
    const { container } = render(
      <PictureCard url="/test" title="Test" image={fakeImage} />,
    );
    expect(container.querySelector('.picture-card')).toBeInTheDocument();
    expect(container.querySelector('.picture-card__link')).toBeInTheDocument();
    expect(container.querySelector('.picture-card__image')).toBeInTheDocument();
    expect(
      container.querySelector('.picture-card__contents'),
    ).toBeInTheDocument();
    expect(container.querySelector('.picture-card__title')).toBeInTheDocument();
  });
});
