import { describe, expect, it } from 'vitest';
import blockSchemas from '@/models/blocks/base';

describe('BaseStreamBlock schema', () => {
  it('parses a heading block', () => {
    const blocks = blockSchemas.BaseStreamBlock.parse([
      {
        type: 'heading_block',
        id: 'abc',
        value: { heading_text: 'Hello', size: 'h2' },
      },
    ]);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].type).toBe('heading_block');
  });

  it('parses a paragraph block with HTML', () => {
    const blocks = blockSchemas.BaseStreamBlock.parse([
      {
        type: 'paragraph_block',
        id: 'def',
        value: '<p>Some <strong>rich</strong> text</p>',
      },
    ]);
    expect(blocks[0].type).toBe('paragraph_block');
    expect(blocks[0].value).toContain('<strong>');
  });

  it('parses a block_quote with settings', () => {
    const blocks = blockSchemas.BaseStreamBlock.parse([
      {
        type: 'block_quote',
        id: 'ghi',
        value: {
          text: 'A wise saying',
          attribute_name: 'Someone',
          settings: { theme: 'highlight', text_size: 'large' },
        },
      },
    ]);
    const quote = blocks[0];
    expect(quote.type).toBe('block_quote');
    if (quote.type === 'block_quote') {
      expect(quote.value.settings?.theme).toBe('highlight');
      expect(quote.value.settings?.text_size).toBe('large');
    }
  });

  it('parses a block_quote without settings', () => {
    const blocks = blockSchemas.BaseStreamBlock.parse([
      {
        type: 'block_quote',
        id: 'jkl',
        value: { text: 'No settings here' },
      },
    ]);
    const quote = blocks[0];
    if (quote.type === 'block_quote') {
      expect(quote.value.settings).toBeUndefined();
    }
  });

  it('parses a mixed stream of blocks', () => {
    const blocks = blockSchemas.BaseStreamBlock.parse([
      { type: 'heading_block', id: '1', value: { heading_text: 'Title' } },
      { type: 'paragraph_block', id: '2', value: '<p>Paragraph</p>' },
      {
        type: 'image_block',
        id: '3',
        value: {
          image: {
            id: 1,
            title: 'Photo',
            meta: {
              type: 'wagtailimages.Image',
              download_url: '/img.jpg',
              rendition: {
                url: '/img.jpg',
                full_url: 'http://localhost:8000/img.jpg',
                width: 800,
                height: 600,
                alt: 'Photo',
              },
            },
          },
          caption: 'A photo',
        },
      },
      { type: 'block_quote', id: '4', value: { text: 'Quote' } },
      {
        type: 'embed_block',
        id: '5',
        value: {
          url: 'https://youtube.com/watch?v=x',
          html: '<iframe></iframe>',
        },
      },
    ]);
    expect(blocks).toHaveLength(5);
    expect(blocks.map((b) => b.type)).toEqual([
      'heading_block',
      'paragraph_block',
      'image_block',
      'block_quote',
      'embed_block',
    ]);
  });

  it('rejects an unknown block type', () => {
    expect(() =>
      blockSchemas.BaseStreamBlock.parse([
        { type: 'unknown_block', id: 'x', value: {} },
      ]),
    ).toThrow();
  });
});
