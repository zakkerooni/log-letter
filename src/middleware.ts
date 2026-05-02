import { defineMiddleware } from 'astro:middleware';
import { getSite } from './lib/site';

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.site = await getSite();
  return next();
});
