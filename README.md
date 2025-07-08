# Wagtail Bakery Demo - Next.js Frontend

This is a highly-experimental headless version of [Wagtail's bakerydemo](https://github.com/wagtail/bakerydemo), built with [Next.js](https://nextjs.org) and Wagtail API v2. It demonstrates how to use Wagtail as a headless CMS with a modern React-based frontend.

## Prerequisites

- A running instance of the [Wagtail bakerydemo](https://github.com/wagtail/bakerydemo) backend
  - You can use the [headless](https://github.com/wagtail/bakerydemo/tree/headless) branch for now, which has the necessary setup for headless usage
  - To test the userbar, you can use [the latest `main` branch of Wagtail](https://github.com/wagtail/wagtail) or [the latest Wagtail nightly build](https://releases.wagtail.io/nightly/index.html)
- Node.js 22.x or later

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Configure your environment variables:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Wagtail backend URL.

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Server-side rendering of Wagtail pages
- Dynamic routing based on Wagtail page types
- Support for:
  - Blog posts
  - Bread types
  - Locations
  - Recipes
  - Gallery
- Pagination for listings
- Image optimization using Next.js Image component
- Type-safe API integration
- [Wagtail user bar](./headless-userbar.md)

## Project Structure

- `components/pages/` - Page type components that correspond to Wagtail page models
- `lib/` - API utilities and helpers
- `models/` - Zod schemas and TypeScript interfaces for Wagtail models

## Contributing

While we're not actively seeking contributions, feel free to raise issues or submit pull requests for feedback. This is an experimental project meant to demonstrate the capabilities of Wagtail as a headless CMS with Next.js.

## Learn More

- [Wagtail Documentation](https://docs.wagtail.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Wagtail API v2 Reference](https://docs.wagtail.org/en/stable/advanced_topics/api/index.html)

## License

This project is open source and available under the [BSD 3-Clause License](LICENSE).
