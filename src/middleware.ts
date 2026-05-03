import { defineMiddleware } from 'astro:middleware';
import { getSite } from './lib/site';

const COOKIE = 'tina-editor';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, cookies, url } = context;
  const referer = request.headers.get('referer') || '';

  const cameFromAdmin = referer.includes('/admin');
  const onAdminPath = url.pathname.startsWith('/admin');
  const onEditEndpoint = url.pathname === '/edit' || url.searchParams.get('edit') === '1';
  const hasEditorCookie = cookies.get(COOKIE)?.value === '1';
  const isEditor = hasEditorCookie || cameFromAdmin || onAdminPath || onEditEndpoint;

  if (isEditor && !hasEditorCookie) {
    cookies.set(COOKIE, '1', {
      path: '/',
      maxAge: COOKIE_MAX_AGE,
      sameSite: 'lax',
    });
  }

  if (onEditEndpoint && url.pathname === '/edit') {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
        'Set-Cookie': `${COOKIE}=1; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`,
      },
    });
  }

  context.locals.site = await getSite({ fresh: isEditor });

  const response = await next();

  if (isEditor) {
    response.headers.set('cache-control', 'no-store');
  }

  return response;
});
