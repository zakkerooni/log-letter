import Stripe from 'stripe';

export const prerender = false;

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

// 送料設定: SHIPPING_FEE 円、ただし FREE_SHIPPING_THRESHOLD 円以上で無料
const SHIPPING_FEE = 400;
const FREE_SHIPPING_THRESHOLD = 2000;

export const POST = async ({ request }) => {
  const data = await request.formData();

  try {
    let line_items = [];

    // Cart checkout (multiple items)
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
