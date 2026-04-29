globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_BJzUappv.mjs";
import { k as renderComponent, r as renderTemplate, m as maybeRenderHead } from "./worker-entry_39yzNr1f.mjs";
import { $ as $$Layout } from "./Layout_DBoIll33.mjs";
const $$Success = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Thank you" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-[70vh] flex items-center justify-center text-center px-8 py-32"> <div class="space-y-12 max-w-[640px]"> <h1 class="text-[11px] tracking-[0.5em] uppercase text-[#999] font-light">Order Completed</h1> <div class="space-y-6 font-['Noto_Serif_JP'] font-light"> <p class="text-[16px] tracking-[0.12em] leading-[2.4] text-[#333]">
ご購入ありがとうございました。<br>
ポストカードの到着まで、今しばらくお待ちください。
</p> <p class="text-[11px] text-[#999] tracking-[0.2em]">
ご登録いただいたメールアドレスへ、確認メールをお送りしました。
</p> </div> <div class="pt-8"> <a href="/" class="text-[10px] tracking-[0.4em] uppercase border border-[#1c2333] text-[#1c2333] px-14 py-4 hover:bg-[#1c2333] hover:text-white transition-all duration-500">
Back to Library
</a> </div> </div> </section> ` })}`;
}, "/Users/zakkerooni/Desktop/POST/src/pages/success.astro", void 0);
const $$file = "/Users/zakkerooni/Desktop/POST/src/pages/success.astro";
const $$url = "/success";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Success,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
