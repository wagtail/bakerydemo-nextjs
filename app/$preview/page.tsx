import DynamicUserbar from '@/components/DynamicUserbar';
import { getPageComponent, type PageType } from '@/components/pages';
import api from '@/lib/api';
import type { wagtailcore } from '@/models';
import { cookies, draftMode } from 'next/headers';

export default async function Preview() {
  const draft = await draftMode();
  const cookieStore = await cookies();

  let data: { contentType: PageType; token: string } | Record<string, never>;
  try {
    data = JSON.parse(cookieStore.get('__wagtail_preview_data')?.value || '');
  } catch (e) {
    data = {};
  }

  if (!draft.isEnabled || !data.token || !data.contentType) {
    return <h1>Preview unavailable.</h1>;
  }

  const { token, contentType } = data;
  const page = await api.getPreview(contentType, token);
  const PageComponent = getPageComponent(contentType);
  return <PageComponent page={page as wagtailcore.Page} />;
}
