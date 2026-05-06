import Stripe from 'stripe';

export const prerender = false;

// Stripe Webhook ハンドラー (Cloudflare Workers / Astro adapter 上で動作)
// 役割:
//  - 署名検証 (STRIPE_WEBHOOK_SECRET)
//  - checkout.session.completed イベントを受信
//  - session.metadata.location があれば KV (STANDS_KV) に売上レコードを記録
//    → /admin/stands でエリア別集計に利用される
//  - 通常の商品 (location なし) は記録なし。EC サイト経由の決済は影響なし
//
// Stripe Dashboard で endpoint URL = https://<本番ドメイン>/api/stripe-webhook を登録し、
// 取得した whsec_xxx を Cloudflare Pages の環境変数 STRIPE_WEBHOOK_SECRET に設定してください。

export const POST = async ({ request, locals }) => {
  // Cloudflare Workers の env var は runtime.env 経由で読む
  const runtimeEnv = locals?.runtime?.env || {};
  const secretKey = runtimeEnv.STRIPE_SECRET_KEY || import.meta.env.STRIPE_SECRET_KEY;
  const webhookSecret = runtimeEnv.STRIPE_WEBHOOK_SECRET || import.meta.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return new Response('Webhook not configured', { status: 503 });
  }

  const stripe = new Stripe(secretKey);
  const signature = request.headers.get('stripe-signature');
  const payload = await request.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(payload, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('[order]', {
        id: session.id,
        amount: session.amount_total,
        currency: session.currency,
        email: session.customer_details?.email,
        name: session.customer_details?.name,
        phone: session.customer_details?.phone,
        shipping: session.shipping_details,
        location: session.metadata?.location,
      });

      // 直売所 (Payment Link) の売上を KV に記録
      const kv = locals?.runtime?.env?.STANDS_KV;
      const location = session.metadata?.location;
      if (kv && location) {
        const record = {
          sessionId: session.id,
          location,
          locationName: session.metadata.locationName || location,
          productName: session.metadata.productName || '',
          amount: session.amount_total,
          currency: session.currency,
          customerEmail: session.customer_details?.email || '',
          customerName: session.customer_details?.name || '',
          timestamp: new Date(session.created * 1000).toISOString(),
        };
        try {
          await kv.put(`sale:${session.id}`, JSON.stringify(record));
        } catch (e) {
          console.error('[stands-kv] write failed:', e);
        }
      }
      break;
    }
    default:
      console.log(`[stripe-webhook] received: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};
