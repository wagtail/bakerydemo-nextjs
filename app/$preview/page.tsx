import { getPageComponent, type PageType } from '@/components/pages';
import api from '@/lib/api';
import type { wagtailcore } from '@/models';

export default async function Preview({
  searchParams,
}: {
  searchParams: Promise<{
    content_type: PageType;
    token: string;
  }>;
}) {
  const params = await searchParams;
  const contentType = params.content_type;
  const page = await api.getPreview(contentType, params.token);
  const PageComponent = getPageComponent(contentType);
  return <PageComponent page={page as wagtailcore.Page} />;
}
