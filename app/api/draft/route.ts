import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (!token) {
    return new Response('Invalid token', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();
  return redirect(`/$preview?${searchParams.toString()}`);
}
