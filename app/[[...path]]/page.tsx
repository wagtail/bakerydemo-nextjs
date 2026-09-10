import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DynamicUserbar from '@/components/DynamicUserbar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { getPageComponent, type PageType } from '@/components/pages';
import api from '@/lib/api';

interface PageProps {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { path: pathSplit = [] } = await params;
  const path = `/${pathSplit.join('/')}`;
  const basicPage = await api.getPage(path);
  return {
    title: basicPage.meta.seo_title || basicPage.title,
    description: basicPage.meta.search_description,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { path: pathSplit = [] } = await params;
  const path = `/${pathSplit.join('/')}`;

  try {
    const page = await api.getPage(path);
    const PageComponent = getPageComponent(page.meta.type as PageType);

    return (
      <>
        <Breadcrumbs page={page} />
        <DynamicUserbar pageId={page.id} />
        <main id="main-content">
          <PageComponent page={page} searchParams={searchParams} />
        </main>
      </>
    );
  } catch (error) {
    console.error(`Error fetching page for path ${path}:`, error);
    notFound();
  }
}
