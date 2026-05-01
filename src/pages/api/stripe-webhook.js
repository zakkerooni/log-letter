import Stripe from 'stripe';

export const prerender = false;

// Stripe Webhook ハンドラー (Cloudflare Workers / Astro adapter 上で動作)
// 役割:
//  - 署名検証 (STRIPE_WEBHOOK_SECRET)
//  - checkout.session.completed イベントを受信し注文情報をログ出力
//  - 将来的にメール通知 / Notion DB 書き込み等に拡張可能
//
// Stripe Dashboard で endpoint URL = https://<本番ドメイン>/api/stripe-webhook を登録し、
// 取得した whsec_xxx を Cloudflare Pages の環境変数 STRIPE_WEBHOOK_SECRET に設定してください。

export const POST = async ({ request }) => {
  const secretKey = import.meta.env.STRIPE_SECRET_KEY;
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return new Response('Webhook not configured', { status: 503 });
  }

  const stripe = new Stripe(secretKey);
  const signature = request.headers.get('stripe-signature');
  const payload = await request.text();

  let event;
  try {
    // Cloudflare Workers では非同期版の constructEventAsync を使用
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
      });
      // TODO: メール通知 / 注文管理システム連携をここに追加
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
