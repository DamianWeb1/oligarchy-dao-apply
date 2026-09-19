"use client";

import { X } from "lucide-react";

export function ApplicationForm() {
  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center px-2 text-center sm:min-h-[520px]" aria-live="polite">
      <div className="mb-5 grid size-16 place-items-center rounded-full bg-[#181512] text-white sm:mb-6 sm:size-20">
        <X className="size-8 sm:size-9" />
      </div>
      <h3 className="font-display text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">Applications closed.</h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-black/60 sm:mt-4 sm:text-base">
        Membership applications have ended. Submitted applications are now under review. Approved applicants will be contacted with Discord access.
      </p>
    </div>
  );
}
