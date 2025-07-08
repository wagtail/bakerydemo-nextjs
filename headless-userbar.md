# Adding the Wagtail user bar

This document explains how the Wagtail user bar is integrated into the Bakerydemo Next.js frontend in a headless setup.

## Overview

The Wagtail user bar provides quick access to editing and admin features for logged-in users. In a headless environment, it must be fetched and rendered manually, as it is not injected by Django templates.

## Implementation steps

### 0. Configure the backend

Ensure your Wagtail backend is configured to expose a user bar endpoint. Details can be found in the [`headless` branch of the bakerydemo](https://github.com/wagtail/bakerydemo/blob/headless/headless-userbar.md).

Optionally, you can make use of the `in_preview_panel` parameter sent by the backend to the [intermediary draft API route](app/api/draft/route.ts). In this example, the parameter is converted to camel case and passed to the [final preview endpoint](app/$preview/page.tsx). The converted parameter is then used in the frontend to determine whether the user bar should be visible or hidden, allowing for different behavior when the preview is rendered inside the live preview panel or directly in a separate window.

### 1. Create a user bar component

A React component (`Userbar.tsx`) is created to fetch and render the user bar HTML from the Wagtail backend. It also loads the required JavaScript assets for the user bar to function.

**Key points:**

- Uses `useEffect` to fetch the user bar HTML from the Wagtail API (`/userbar/` endpoint).
- Injects the HTML into a `div` using a `ref`.
- Loads the necessary JS files (`vendor.js` and `userbar.js`) using Next.js's `Script` component.
- The API host is read from the `NEXT_PUBLIC_WAGTAIL_API_HOST` environment variable.

### 2. Usage in pages

The user bar component is imported and rendered in the relevant pages, such as the preview page. It can be conditionally hidden (e.g., when inside a preview panel) by passing a `hidden` prop.

### 3. Lazy-loading with dynamic import (optional)

In this project, the user bar is always loaded client-side, since the HTML is fetched via `useEffect`. Dynamic import can optionally be used (e.g., `DynamicUserbar`) to further optimize the bundle by lazy-loading the user bar component only when needed. This helps reduce the initial JavaScript bundle size for users who do not need the user bar.

## Environment variable

Set the following in your environment:

```
NEXT_PUBLIC_WAGTAIL_API_HOST=https://your-wagtail-backend.com
```

## Security note

The user bar HTML is injected directly into the DOM. Only fetch from trusted Wagtail backends to avoid XSS risks.

## References

- [`components/Userbar.tsx`](components/Userbar.tsx)
- [`components/DynamicUserbar.tsx`](components/DynamicUserbar.tsx)
- [`app/$preview/page.tsx`](app/$preview/page.tsx)
- [`app/api/draft/route.ts`](app/api/draft/route.ts)
