import Stripe from 'stripe';
import { getSite } from '../../lib/site';

export const prerender = false;

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

// 送料設定: site.json shipping.{fee, freeThreshold} を編集可 (TinaCMS 経由)
// 値が無い場合は従来のデフォルト (¥400 / ¥3,000 以上で無料) を使う。
const DEFAULT_FEE = 400;
const DEFAULT_FREE_THRESHOLD = 3000;

export const POST = async ({ request }) => {
  const site = await getSite();
  const SHIPPING_FEE = Number(site?.shipping?.fee ?? DEFAULT_FEE);
  const FREE_SHIPPING_THRESHOLD = Number(site?.shipping?.freeThreshold ?? DEFAULT_FREE_THRESHOLD);

  const data = await request.formData();

  try {
    let line_items = [];

    // 数量変更はカート / ミニカート側だけで行う。チェックアウト画面で
    // 数量を変えると送料の無料判定がセッション作成時の値に固定されたまま
    // になり、閾値を下回っても送料を請求できなくなるため。
    const cartData = data.get('cartData');
    if (cartData) {
      const items = JSON.parse(cartData);
      line_items = items.map(item => ({
        price: item.priceId,
        quantity: item.qty,
      }));
    } else {
      // Single item checkout (fallback)
      const priceId = data.get('priceId');
      line_items = [{ price: priceId, quantity: 1 }];
    }

    // Stripe から実価格を取得して小計を計算 (クライアント値は信用しない)
    const prices = await Promise.all(
      line_items.map((item) => stripe.prices.retrieve(item.price)),
    );
    const subtotal = prices.reduce(
      (sum, price, i) => sum + price.unit_amount * line_items[i].quantity,
      0,
    );
    const shippingAmount = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['JP'],
      },
      phone_number_collection: {
        enabled: true,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: shippingAmount, currency: 'jpy' },
            display_name:
              shippingAmount === 0
                ? `送料無料 (¥${FREE_SHIPPING_THRESHOLD.toLocaleString()}以上のご購入)`
                : '送料 (全国一律)',
          },
        },
      ],
      success_url: `${new URL(request.url).origin}/success`,
      cancel_url: `${new URL(request.url).origin}/cart`,
    });

    return new Response(null, {
      status: 303,
      headers: { Location: session.url }
    });
  } catch (error) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
};
