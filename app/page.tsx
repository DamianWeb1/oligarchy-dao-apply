import Image from "next/image";
import { ArrowUpRight, ShieldCheck, Sparkles, Users } from "lucide-react";
import { ApplicationForm } from "@/components/application-form";

export default function Home() {
  return (
    <main className="h-dvh overflow-hidden bg-[#f2efe8] text-[#15120f] lg:h-auto lg:min-h-screen">
      <div className="noise" />
      <nav className="relative z-20 mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:h-auto lg:px-12 lg:py-5">
        <a href="#top" className="flex items-center gap-3" aria-label="OligarchyDAO home">
          <Image src="/oligarchy-logo.jpg" alt="OligarchyDAO" width={48} height={48} className="h-10 w-10 rounded-full border border-black/10 object-cover lg:h-11 lg:w-11" priority />
          <div><div className="font-display text-[1.05rem] font-black uppercase tracking-[-0.02em]">OligarchyDAO</div><div className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-black/45">Community first</div></div>
        </a>
        <a href="https://x.com/Oligarchy_DAO" target="_blank" rel="noreferrer" className="group flex items-center gap-1.5 rounded-full border border-black/15 bg-white/60 px-3 py-2 text-xs font-bold transition hover:border-[#c80000] hover:text-[#c80000] sm:px-4 sm:py-2.5 sm:text-sm">Follow on X <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
      </nav>
      <section id="top" className="relative z-10 mx-auto grid h-[calc(100dvh-72px)] w-full max-w-[1440px] px-3 pb-3 lg:h-auto lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-12 lg:pb-24 lg:pt-12">
        <div className="hidden flex-col justify-between lg:flex lg:min-h-[760px]">
          <div>
            <div className="mb-8 flex items-center gap-3"><span className="h-px w-10 bg-[#c80000]" /><span className="text-xs font-black uppercase tracking-[0.24em] text-[#c80000]">Membership applications open</span></div>
            <h1 className="font-display max-w-[680px] text-[clamp(3.5rem,5.4vw,5.8rem)] font-black uppercase leading-[0.94] tracking-[-0.035em]">
              <span className="block">Small circle.</span>
              <span className="block"><span className="text-[#c80000]">Serious</span> people.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/62 sm:text-xl">OligarchyDAO is a carefully selected group growing together through NFTs, memes, ideas, and real contribution.</p>
          </div>
          <div className="mt-12 grid grid-cols-3 border-y border-black/15 py-5 lg:mt-16">
            <div className="border-r border-black/15 pr-4"><Users className="mb-3 size-5 text-[#c80000]" /><p className="text-xs font-black uppercase tracking-[0.12em]">Selected people</p></div>
            <div className="border-r border-black/15 px-4"><Sparkles className="mb-3 size-5 text-[#c80000]" /><p className="text-xs font-black uppercase tracking-[0.12em]">Shared growth</p></div>
            <div className="pl-4"><ShieldCheck className="mb-3 size-5 text-[#c80000]" /><p className="text-xs font-black uppercase tracking-[0.12em]">Reviewed entry</p></div>
          </div>
        </div>
        <div className="relative h-full min-h-0">
          <div className="absolute -right-28 -top-24 hidden h-72 w-72 rounded-full border-[48px] border-[#c80000]/8 lg:block" />
          <div className="relative h-full rounded-[1.5rem] border border-black/10 bg-[#181512] p-2 shadow-[0_30px_90px_rgba(42,17,8,0.22)] lg:h-auto lg:rounded-[2rem] lg:p-4">
            <div className="flex h-full min-h-0 flex-col rounded-[1.1rem] bg-[#fffdf8] p-4 lg:h-auto lg:rounded-[1.45rem] lg:p-10">
              <div className="mb-4 flex shrink-0 items-start justify-between gap-5 border-b border-black/10 pb-4 lg:mb-8 lg:pb-7">
                <div><p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#c80000] lg:mb-2 lg:text-xs">Apply to join</p><h2 className="font-display text-2xl font-black uppercase tracking-[-0.04em] lg:text-4xl">Tell us about you.</h2></div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#c80000] font-display text-lg font-black text-white lg:size-11 lg:text-xl">O</span>
              </div>
              <div className="min-h-0 flex-1"><ApplicationForm /></div>
            </div>
          </div>
          <p className="mt-4 hidden text-center text-xs font-semibold text-black/45 lg:block">Applications are reviewed before Discord access is shared.</p>
        </div>
      </section>
    </main>
  );
}
