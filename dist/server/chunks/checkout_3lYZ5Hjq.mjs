globalThis.process ??= {};
globalThis.process.env ??= {};
import { S as Stripe } from "./stripe.esm.worker_Cmg_krPS.mjs";
const prerender = false;
const stripe = new Stripe("sk_test_dummy");
const POST = async ({ request }) => {
  const data = await request.formData();
  const priceId = data.get("priceId");
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      // 自動で現在のドメイン（pages.devなど）を取得して戻り先を設定します
      success_url: `${new URL(request.url).origin}/success`,
      cancel_url: `${new URL(request.url).origin}/`
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
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
