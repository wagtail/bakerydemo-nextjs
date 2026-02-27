import { cookies, draftMode } from 'next/headers';
import DynamicUserbar from '@/components/DynamicUserbar';
import { getPageComponent, type PageType } from '@/components/pages';
import api from '@/lib/api';
import type { wagtailcore } from '@/models';

export default async function Preview({
  searchParams,
}: {
  searchParams: Promise<{
    inPreviewPanel?: string;
  }>;
}) {
  const draft = await draftMode();
  const cookieStore = await cookies();

  let data: { contentType: PageType; token: string } | Record<string, never>;
  try {
    data = JSON.parse(cookieStore.get('__wagtail_preview_data')?.value || '');
  } catch {
    data = {};
  }

  if (!draft.isEnabled || !data.token || !data.contentType) {
    return <h1>Preview unavailable.</h1>;
  }

  const params = await searchParams;
  const { token, contentType } = data;
  const page = await api.getPreview(contentType, token);
  const PageComponent = getPageComponent(contentType);

  return (
    <>
      <DynamicUserbar hidden={params.inPreviewPanel === 'true'} pageId={page.id} />
      <PageComponent
        page={page as wagtailcore.Page}
        searchParams={searchParams}
      />
    </>
  );
}
