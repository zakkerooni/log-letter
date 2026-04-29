import Stripe from 'stripe';

export const prerender = false;

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export const POST = async ({ request }) => {
  const data = await request.formData();
  const priceId = data.get('priceId');

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      // 自動で現在のドメイン（pages.devなど）を取得して戻り先を設定します
      success_url: `${new URL(request.url).origin}/success`,
      cancel_url: `${new URL(request.url).origin}/`,
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