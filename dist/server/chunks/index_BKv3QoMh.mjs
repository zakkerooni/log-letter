globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_BJzUappv.mjs";
import { m as maybeRenderHead, g as addAttribute, r as renderTemplate, k as renderComponent } from "./worker-entry_39yzNr1f.mjs";
import { $ as $$Layout } from "./Layout_DBoIll33.mjs";
import { $ as $$AboutBlock } from "./AboutBlock_BxYVnFtg.mjs";
import { S as Stripe } from "./stripe.esm.worker_Cmg_krPS.mjs";
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProductCard;
  const { product } = Astro2.props;
  const price = product.default_price;
  const amount = price?.unit_amount ?? 0;
  const image = product.images?.[0] || "https://placehold.jp/24/eeeeee/999999/800x800.png?text=MiKS";
  const creator = product.metadata?.creator || "MiKS Collective";
  return renderTemplate`${maybeRenderHead()}<article class="flex flex-col group"> <div class="overflow-hidden bg-[#f4f4f4] aspect-square mb-6"> <img${addAttribute(image, "src")}${addAttribute(product.name, "alt")} loading="lazy" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms] ease-out"> </div> <div class="flex-grow space-y-3"> <p class="text-[9px] text-[#999] uppercase tracking-[0.4em] font-light">${creator}</p> <h3 class="text-[13px] tracking-[0.08em] font-normal text-[#1a1a1a]">${product.name}</h3> <p class="text-[11px] text-[#666] font-light">¥${amount.toLocaleString()}</p> ${product.description && renderTemplate`<p class="text-[10px] text-[#999] font-light leading-relaxed pt-1">${product.description}</p>`} </div> <form action="/api/checkout" method="POST" class="mt-6"> <input type="hidden" name="priceId"${addAttribute(price?.id, "value")}> <button type="submit" class="w-full border border-[#1c2333] py-3 text-[10px] tracking-[0.4em] uppercase text-[#1c2333] hover:bg-[#1c2333] hover:text-white transition-all duration-500 cursor-pointer">
Purchase
</button> </form> </article>`;
}, "/Users/zakkerooni/Desktop/POST/src/components/ProductCard.astro", void 0);
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const stripe = new Stripe("sk_test_dummy");
  const products = await stripe.products.list({ active: true, expand: ["data.default_price"] });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Record of a moment" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="h-[80vh] w-full relative overflow-hidden bg-[#efefef]"> <img src="/images/about-hero.jpg" alt="Concept Visual" class="w-full h-full object-cover" onerror="this.src='https://placehold.jp/24/dddddd/888888/1800x1200.png?text=MiKS%20Library'"> <div class="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none bg-black/10"> <h1 class="text-[11px] tracking-[0.8em] uppercase text-white font-light mb-6 drop-shadow-sm">
Postcard Library
</h1> <div class="w-[1px] h-16 bg-white/50"></div> </div> </section> <section class="py-32 px-6 bg-white"> ${renderComponent($$result2, "AboutBlock", $$AboutBlock, {})} </section> <section id="archive" class="max-w-[1400px] mx-auto px-8 py-24 border-t border-[#ececec]"> <div class="mb-16 flex items-end justify-between"> <h2 class="text-[11px] tracking-[0.5em] uppercase text-[#555] font-light">Library Archive</h2> <span class="text-[9px] text-[#aaa] tracking-[0.3em] font-light"> ${products.data.length} Records
</span> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20"> ${products.data.map((product) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product })}`)} </div> </section> ` })}`;
}, "/Users/zakkerooni/Desktop/POST/src/pages/index.astro", void 0);
const $$file = "/Users/zakkerooni/Desktop/POST/src/pages/index.astro";
const $$url = "";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
