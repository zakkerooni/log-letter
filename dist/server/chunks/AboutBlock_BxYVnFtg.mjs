globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_BJzUappv.mjs";
import { m as maybeRenderHead, g as addAttribute, r as renderTemplate } from "./worker-entry_39yzNr1f.mjs";
const $$AboutBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AboutBlock;
  const { compact = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`max-w-[720px] mx-auto space-y-12 ${compact ? "" : "py-32"}`, "class")}> <h3 class="text-[10px] tracking-[0.6em] uppercase text-[#aaa] font-light text-center">
The Record of a Moment
</h3> <div class="font-['Noto_Serif_JP'] text-[14px] tracking-[0.12em] font-light leading-[2.6] text-[#333] text-center"> <p class="mb-8">
ポストカードは、ある瞬間の「記録」である。<br>
私たちはそう考えます。
</p> <p class="mb-8">
金沢の静かな空気感や、クリエイターの視点が切り取った断片を、<br>
手に取れる形、届ける形へと。
</p> <p>
MiKSは、クリエイターの創作活動を支援し、<br>
売上の一部は、次なる作品を生むための糧として作家へ還元されます。
</p> </div> </div>`;
}, "/Users/zakkerooni/Desktop/POST/src/components/AboutBlock.astro", void 0);
export {
  $$AboutBlock as $
};
