import Stripe from 'stripe';

export const prerender = false;

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

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

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
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
