import type { wagtailcore } from '@/models';

export type PageComponentProps<T extends wagtailcore.Page = wagtailcore.Page> =
  {
    page: T;
    searchParams?: Promise<Record<string, string>>;
    params?: Promise<Record<string, string>>;
  };
