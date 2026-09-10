import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HeaderBlog from '@/components/headers/HeaderBlog';

const fakeImage = {
  url: '/media/images/hero.jpg',
  full_url: 'http://localhost:8000/media/images/hero.jpg',
  width: 1920,
  height: 600,
  alt: 'Hero image',
};

describe('HeaderBlog', () => {
  it('renders hero--blog variant when image is provided', () => {
    const { container } = render(
      <HeaderBlog title="My Post" image={fakeImage} />,
    );
    const hero = container.querySelector('.hero--blog');
    expect(hero).toBeInTheDocument();
    expect(hero).toHaveClass('container-fluid', 'hero');
  });

  it('omits hero section when no image', () => {
    const { container } = render(<HeaderBlog title="My Post" />);
    expect(container.querySelector('.hero--blog')).toBeNull();
  });

  it('applies --blog modifiers to title and introduction', () => {
    const { container } = render(
      <HeaderBlog title="Recipe Title" introduction="A delicious recipe." />,
    );
    expect(
      container.querySelector('.index-header__title--blog'),
    ).toHaveTextContent('Recipe Title');
    expect(
      container.querySelector('.index-header__introduction--blog'),
    ).toHaveTextContent('A delicious recipe.');
  });

  it('renders subtitle and date when provided', () => {
    const { container } = render(
      <HeaderBlog
        title="Post"
        subtitle="A Subtitle"
        date_published="2024-03-15"
      />,
    );
    expect(screen.getByText('A Subtitle')).toBeInTheDocument();
    expect(container.querySelector('.blog__published')).toHaveTextContent(
      'March 15, 2024',
    );
  });

  it('omits subtitle/date/intro when not provided', () => {
    const { container } = render(<HeaderBlog title="Post" />);
    expect(container.querySelector('.blog__published')).toBeNull();
    expect(
      container.querySelector('.index-header__introduction--blog'),
    ).toBeNull();
  });
});
