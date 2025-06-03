import { cookies, draftMode } from 'next/headers';
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

  // Override draft mode cookie with SameSite=None and Secure attributes so it
  // can be used in cross-origin requests (via the live preview panel iframe).
  // https://github.com/vercel/next.js/issues/49927
  const cookieStore = await cookies();
  const prerenderBypass = cookieStore.get('__prerender_bypass')!;

  // Additionally, set the Path so that the cookie is not applied to non-preview
  // pages, and set the MaxAge so we don't hold onto the cookie for too long.
  cookieStore.set({
    name: '__prerender_bypass',
    value: prerenderBypass.value,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/$preview',
    maxAge: 60 * 60, // 1 hour
  });

  return redirect(`/$preview?${searchParams.toString()}`);
}
