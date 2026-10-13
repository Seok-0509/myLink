"use client";

import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LinkCard } from "@/components/profile/LinkCard";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { SectionHeader } from "@/components/profile/SectionHeader";
import { SocialBar } from "@/components/profile/SocialBar";

type LinkItem = { id: string; section: string; title: string; description: string; url: string; tags: string[] };
const initialLinks: LinkItem[] = [
  { id: "voice-agent", section: "포트폴리오", title: "Voice Agent meeting assistant", description: "Realtime API와 WebSocket으로 만든 음성 회의 보조 에이전트입니다.", url: "https://github.com/Seok-0509/", tags: ["Realtime API", "WebSocket", "Python"] },
  { id: "document-search", section: "포트폴리오", title: "Document search automation", description: "PDF 문서에서 필요한 답을 찾는 OCR·벡터 검색 파이프라인입니다.", url: "https://github.com/Seok-0509/", tags: ["OCR", "LlamaIndex", "RAG"] },
  { id: "model-dashboard", section: "포트폴리오", title: "LLM serving observability dashboard", description: "LLM 서버의 지연 시간과 GPU 사용량을 확인하는 대시보드입니다.", url: "https://github.com/Seok-0509/", tags: ["Grafana", "Prometheus", "Kubernetes"] },
  { id: "tech-blog", section: "추천 링크", title: "AI engineering notes", description: "LLM, RAG, 모델 서빙과 프로젝트 경험을 기록한 기술 블로그입니다.", url: "https://github.com/Seok-0509/", tags: ["Blog", "AI", "Engineering"] },
];
const emptyForm = { section: "포트폴리오", title: "", url: "", description: "", tags: "" };
const linkFormSchema = z.object({
  section: z.string().trim().min(1, "섹션을 입력해 주세요."),
  title: z.string().trim().min(1, "제목을 입력해 주세요.").max(80, "제목은 80자 이하로 입력해 주세요."),
  url: z.string().trim().min(1, "URL을 입력해 주세요.").url("올바른 URL 형식을 입력해 주세요.").refine((value) => {
    try {
      const parsedUrl = new URL(value);
      return (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") && Boolean(parsedUrl.hostname) && !/\s/.test(value);
    } catch { return false; }
  }, "http:// 또는 https://로 시작하는 올바른 주소를 입력해 주세요."),
  description: z.string().trim().min(1, "설명을 입력해 주세요.").max(200, "설명은 200자 이하로 입력해 주세요."),
  tags: z.string(),
});
type LinkFormValues = z.infer<typeof linkFormSchema>;

export default function LinksPage() {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const [section, setSection] = useState("전체");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<string[]>([]);
  const { setValue, trigger } = useForm<LinkFormValues>({ resolver: zodResolver(linkFormSchema), defaultValues: emptyForm });
  const sections = ["전체", ...Array.from(new Set(links.map((link) => link.section)))];
  const visibleLinks = section === "전체" ? links : links.filter((link) => link.section === section);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue("section", form.section);
    setValue("title", form.title);
    setValue("url", form.url);
    setValue("description", form.description);
    setValue("tags", form.tags);
    const validation = linkFormSchema.safeParse(form);
    if (!(await trigger()) || !validation.success) {
      setErrors(validation.success ? ["입력 내용을 확인해 주세요."] : validation.error.issues.map((issue) => issue.message));
      return;
    }
    const title = form.title.trim();
    const url = form.url.trim();
    const description = form.description.trim();
    const sectionName = form.section.trim();
    const nextErrors: string[] = [];
    if (!sectionName) nextErrors.push("섹션을 입력해 주세요.");
    if (!title) nextErrors.push("제목을 입력해 주세요.");
    if (!url) nextErrors.push("URL을 입력해 주세요.");
    else {
      try {
        const parsedUrl = new URL(url);
        if (!["http:", "https:"].includes(parsedUrl.protocol)) nextErrors.push("URL은 http:// 또는 https://로 시작해야 합니다.");
      } catch { nextErrors.push("올바른 URL 형식을 입력해 주세요."); }
    }
    if (!description) nextErrors.push("설명을 입력해 주세요.");
    if (title.length > 80) nextErrors.push("제목은 80자 이하로 입력해 주세요.");
    if (description.length > 200) nextErrors.push("설명은 200자 이하로 입력해 주세요.");
    if (nextErrors.length > 0) { setErrors(nextErrors); return; }
    setErrors([]);
    const newLink: LinkItem = { id: `${Date.now()}`, section: form.section.trim() || "포트폴리오", title: form.title.trim(), url: form.url.trim(), description: form.description.trim(), tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean) };
    const nextLinks = [newLink, ...links];
    setLinks(nextLinks); setSection(newLink.section); setIsDialogOpen(false); setForm(emptyForm);
  };
  return (
    <main className="min-h-screen bg-[#f2f4f6] px-4 py-10 text-[#191f28] sm:px-6"><div className="mx-auto max-w-[680px]">
      {errors.length > 0 && <div role="alert" className="fixed bottom-5 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-[520px] -translate-x-1/2 rounded-xl bg-[#fff1f2] px-4 py-3 text-sm text-[#d92d3f] shadow-lg">입력 내용을 확인해 주세요: {errors.join(" ")}</div>}
      <ProfileHeader name="MyLink" bio="작업과 좋아하는 링크를 모아두었어요." />
      <SocialBar links={[{ name: "GitHub", url: "https://github.com/Seok-0509/" }, { name: "LinkedIn", url: "https://www.linkedin.com/" }]} />
      <div className="mb-6 flex items-center justify-between gap-3"><div className="flex min-w-0 gap-2 overflow-x-auto pb-1" role="tablist" aria-label="링크 섹션">{sections.map((name) => <Button key={name} type="button" role="tab" aria-selected={section === name} onClick={() => setSection(name)} className={section === name ? "bg-[#191f28] text-white" : "bg-white text-[#6b7684]"}>{name}</Button>)}</div><Button type="button" onClick={() => { setForm(emptyForm); setIsDialogOpen(true); }} className="shrink-0 bg-[#3182f6] text-white shadow-sm hover:bg-[#1b64da]">+ 링크 추가</Button></div>
      <section aria-label="링크 목록"><SectionHeader>{section === "전체" ? "전체 링크" : section}</SectionHeader><div className="space-y-3">{visibleLinks.map((link) => <LinkCard key={link.id} title={link.title} description={link.description} url={link.url} tags={link.tags} />)}</div>{visibleLinks.length === 0 && <p className="rounded-2xl bg-white p-8 text-center text-sm text-[#8b95a1]">아직 링크가 없어요.</p>}</section>
    </div>
    {isDialogOpen && <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#191f28]/45 p-0 sm:items-center sm:p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsDialogOpen(false); }}><div role="dialog" aria-modal="true" aria-labelledby="add-link-title" className="w-full max-w-[520px] rounded-t-[28px] bg-white p-5 shadow-2xl sm:rounded-[28px] sm:p-7"><div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wide text-[#3182f6]">New link</p><h2 id="add-link-title" className="mt-1 text-xl font-bold">링크 추가</h2><p className="mt-1 text-sm text-[#6b7684]">추가한 링크는 이 브라우저에 저장됩니다.</p></div><button type="button" onClick={() => setIsDialogOpen(false)} aria-label="닫기" className="text-2xl leading-none text-[#8b95a1]">×</button></div><form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-semibold">섹션<input required value={form.section} onChange={(event) => setForm({ ...form, section: event.target.value })} className="mt-2 w-full rounded-xl border border-[#e5e8eb] px-4 py-3 font-normal outline-none focus:border-[#3182f6]" placeholder="예: 포트폴리오" /></label>
      <label className="block text-sm font-semibold">제목<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-2 w-full rounded-xl border border-[#e5e8eb] px-4 py-3 font-normal outline-none focus:border-[#3182f6]" placeholder="링크 제목을 입력해 주세요" /></label>
      <label className="block text-sm font-semibold">URL<input required type="url" value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} className="mt-2 w-full rounded-xl border border-[#e5e8eb] px-4 py-3 font-normal outline-none focus:border-[#3182f6]" placeholder="https://" /></label>
      <label className="block text-sm font-semibold">설명<textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="mt-2 min-h-20 w-full resize-none rounded-xl border border-[#e5e8eb] px-4 py-3 font-normal outline-none focus:border-[#3182f6]" placeholder="링크를 간단히 설명해 주세요" /></label>
      <label className="block text-sm font-semibold">태그 <span className="font-normal text-[#8b95a1]">(쉼표로 구분)</span><input value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} className="mt-2 w-full rounded-xl border border-[#e5e8eb] px-4 py-3 font-normal outline-none focus:border-[#3182f6]" placeholder="AI, Next.js, Portfolio" /></label>
      <div className="flex gap-2 pt-2"><Button type="button" onClick={() => setIsDialogOpen(false)} className="flex-1 bg-[#f2f4f6] text-[#4e5968]">취소</Button><Button type="submit" className="flex-1 bg-[#3182f6] text-white hover:bg-[#1b64da]">링크 저장</Button></div>
    </form></div></div>}
    </main>
  );
}
