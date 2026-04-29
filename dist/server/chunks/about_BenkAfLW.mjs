globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_BJzUappv.mjs";
import { k as renderComponent, r as renderTemplate, m as maybeRenderHead } from "./worker-entry_39yzNr1f.mjs";
import { $ as $$Layout } from "./Layout_DBoIll33.mjs";
import { $ as $$AboutBlock } from "./AboutBlock_BxYVnFtg.mjs";
const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-[1400px] mx-auto px-8 py-32 min-h-[70vh] flex flex-col justify-center"> ${renderComponent($$result2, "AboutBlock", $$AboutBlock, {})} <div class="mt-24 text-center"> <a href="/#archive" class="text-[10px] tracking-[0.4em] uppercase border border-[#1c2333] text-[#1c2333] px-14 py-4 hover:bg-[#1c2333] hover:text-white transition-all duration-500">
Back to Archive
</a> </div> </section> ` })}`;
}, "/Users/zakkerooni/Desktop/POST/src/pages/about.astro", void 0);
const $$file = "/Users/zakkerooni/Desktop/POST/src/pages/about.astro";
const $$url = "/about";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
