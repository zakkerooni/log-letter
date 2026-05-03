import { defineMiddleware } from 'astro:middleware';
import { getSite } from './lib/site';

const COOKIE = 'tina-editor';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const onRequest = defineMiddleware(async (context, next) => {
  const { request } = context;
  const url = new URL(request.url);
  const cookieHeader = request.headers.get('cookie') || '';
  const referer = request.headers.get('referer') || '';

  const cameFromAdmin = referer.includes('/admin');
  const onAdminPath = url.pathname.startsWith('/admin');
  const hasEditorCookie = cookieHeader.includes(`${COOKIE}=1`);
  const isEditor = hasEditorCookie || cameFromAdmin || onAdminPath;

  context.locals.site = await getSite({ fresh: isEditor });

  const response = await next();

  if (cameFromAdmin && !hasEditorCookie) {
    response.headers.append(
      'set-cookie',
      `${COOKIE}=1; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`,
    );
  }

  if (isEditor) {
    response.headers.set('cache-control', 'no-store');
  }

  return response;
});
