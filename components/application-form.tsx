"use client";

import { FormEvent, useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight, LoaderCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ApplicationPayload = { name: string; email: string; xUsername: string; discordUsername: string; contribution: string; reason: string; followedX: boolean; likedPost: boolean; repostedPost: boolean; website: string };
const initialForm: ApplicationPayload = { name: "", email: "", xUsername: "", discordUsername: "", contribution: "", reason: "", followedX: false, likedPost: false, repostedPost: false, website: "" };

async function submitApplication(payload: ApplicationPayload) {
  const response = await fetch("/api/apply", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
  const result = (await response.json()) as { ok?: boolean; message?: string };
  if (!response.ok || !result.ok) throw new Error(result.message || "We could not submit your application.");
  return result;
}

export function ApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {
    const context = (document as Document & { modelContext?: { registerTool?: (tool: unknown, options?: { signal?: AbortSignal }) => unknown } }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(context.registerTool({ name: "submit_membership_application", title: "Submit membership application", description: "Submit a complete OligarchyDAO membership application after the applicant confirms all social tasks.", inputSchema: { type: "object", properties: { name: { type: "string" }, email: { type: "string" }, xUsername: { type: "string" }, discordUsername: { type: "string" }, contribution: { type: "string" }, reason: { type: "string" }, followedX: { type: "boolean" }, likedPost: { type: "boolean" }, repostedPost: { type: "boolean" } }, required: ["name", "email", "xUsername", "discordUsername", "contribution", "reason", "followedX", "likedPost", "repostedPost"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute: async (input: unknown) => submitApplication({ ...(input as ApplicationPayload), website: "" }) }, { signal: lifecycle.signal })).catch(() => undefined);
    } catch { /* Unsupported browsers ignore WebMCP registration. */ }
    return () => lifecycle.abort();
  }, []);

  const update = <K extends keyof ApplicationPayload>(key: K, value: ApplicationPayload[K]) => setForm((current) => ({ ...current, [key]: value }));
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); setMessage("");
    try { await submitApplication(form); setForm(initialForm); setStatus("success"); }
    catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Please try again."); }
  }

  const identityReady = Boolean(form.name.trim().length >= 2 && form.email.includes("@") && form.xUsername.trim() && form.discordUsername.trim());
  const storyReady = form.contribution.trim().length >= 3 && form.reason.trim().length >= 20;

  if (status === "success") return <div className="flex h-full min-h-0 flex-col items-center justify-center px-2 text-center sm:min-h-[520px]" aria-live="polite"><div className="mb-5 grid size-16 place-items-center rounded-full bg-[#c80000] text-white sm:mb-6 sm:size-20"><Check className="size-8 sm:size-9" /></div><h3 className="font-display text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">Request received.</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-black/60 sm:mt-4 sm:text-base">Your application has been saved. The OligarchyDAO team will review it and contact approved applicants with Discord access.</p><Button type="button" variant="outline" onClick={() => { setStatus("idle"); setStep(1); }} className="mt-6 h-11 rounded-full px-6 sm:mt-8 sm:h-12">Submit another entry</Button></div>;

  return <form noValidate onSubmit={onSubmit} className="flex h-full min-h-0 flex-col sm:block sm:space-y-7">
    <div className="mb-4 flex items-center justify-between sm:hidden">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#c80000]">{step === 1 ? "Your details" : step === 2 ? "Your contribution" : "Final check"}</p>
      <p className="text-xs font-bold text-black/40">{step} / 3</p>
    </div>
    <div className={step === 1 ? "grid gap-3 sm:grid-cols-2 sm:gap-5" : "hidden sm:grid sm:grid-cols-2 sm:gap-5"}>
      <Field label="Name"><Input required minLength={2} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" className="form-input" /></Field>
      <Field label="Email"><Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className="form-input" /></Field>
      <Field label="X username"><Input required value={form.xUsername} onChange={(e) => update("xUsername", e.target.value)} placeholder="@username" className="form-input" /></Field>
      <Field label="Discord username"><Input required value={form.discordUsername} onChange={(e) => update("discordUsername", e.target.value)} placeholder="username" className="form-input" /></Field>
    </div>
    <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<Input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
    <div className={step === 2 ? "space-y-4" : "hidden sm:block sm:space-y-7"}>
      <Field label="whats you good at?" meta={`${form.contribution.length}/100 characters`}><Input required minLength={3} maxLength={100} value={form.contribution} onChange={(e) => update("contribution", e.target.value)} placeholder="Design, trading, content, development..." className="form-input" /></Field>
      <Field label="Why do you want to join?" meta={`${form.reason.length}/100 characters`}><Textarea required minLength={20} maxLength={100} value={form.reason} onChange={(e) => update("reason", e.target.value)} placeholder="Keep it direct. Tell us why you fit the circle." className="field-sizing-fixed h-32 min-h-32 max-h-32 resize-none overflow-y-auto rounded-xl border-black/15 bg-white text-base shadow-none focus-visible:border-[#c80000] focus-visible:ring-[#c80000]/15 sm:h-28 sm:min-h-28 sm:max-h-28" /></Field>
    </div>
    <div className={step === 3 ? "block" : "hidden sm:block"}>
      <fieldset className="rounded-2xl border border-black/10 bg-[#f2efe8] p-5"><legend className="px-2 text-xs font-black uppercase tracking-[0.16em]">Confirm the tasks</legend><div className="mt-1 space-y-4"><Task checked={form.followedX} onChange={(v) => update("followedX", v)} label="I followed @Oligarchy_DAO on X" /><Task checked={form.likedPost} onChange={(v) => update("likedPost", v)} label="I liked the X post containing this application link" /><Task checked={form.repostedPost} onChange={(v) => update("repostedPost", v)} label="I reposted the X post containing this application link" /></div></fieldset>
    </div>
    {status === "error" && <div role="alert" className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700 sm:mt-0 sm:p-4"><X className="mt-0.5 size-4 shrink-0" />{message}</div>}
    <div className="mt-auto grid grid-cols-2 gap-3 pt-4 sm:hidden">
      {step > 1 ? <Button type="button" variant="outline" onClick={() => setStep((current) => current - 1)} className="h-12 rounded-full"><ChevronLeft className="size-4" /> Previous</Button> : <span />}
      {step < 3 ? <Button type="button" disabled={step === 1 ? !identityReady : !storyReady} onClick={() => setStep((current) => current + 1)} className="h-12 rounded-full bg-[#181512] text-white">Next <ChevronRight className="size-4" /></Button> : <Button disabled={status === "sending" || !form.followedX || !form.likedPost || !form.repostedPost} className="h-12 rounded-full bg-[#c80000] font-black uppercase tracking-[0.08em] text-white hover:bg-[#a90000]">{status === "sending" ? <LoaderCircle className="size-5 animate-spin" /> : <>Submit <Send className="size-4" /></>}</Button>}
    </div>
    <Button disabled={status === "sending" || !form.followedX || !form.likedPost || !form.repostedPost} className="hidden h-14 w-full rounded-full bg-[#c80000] text-base font-black uppercase tracking-[0.1em] text-white hover:bg-[#a90000] sm:flex">{status === "sending" ? <><LoaderCircle className="size-5 animate-spin" /> Saving application</> : <>Submit application <Send className="size-4" /></>}</Button>
  </form>;
}

function Field({ label, meta, children }: { label: string; meta?: string; children: React.ReactNode }) { return <label className="block"><span className="mb-1.5 flex items-center justify-between gap-3 text-sm font-black sm:mb-2"><span>{label}</span>{meta && <span className="shrink-0 text-[11px] font-bold text-black/40">{meta}</span>}</span>{children}</label>; }
function Task({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) { return <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold"><Checkbox required checked={checked} onCheckedChange={(value) => onChange(value === true)} className="size-5 border-black/25 data-[state=checked]:border-[#c80000] data-[state=checked]:bg-[#c80000]" />{label}</label>; }
