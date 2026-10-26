"use client";

import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

type LinkItem = { id: string; section: string; title: string; description: string; url: string; tags: string[] };
const linkCollection = collection(firestore, "users", "anonymous", "links");
const emptyForm = { section: "기술 프로젝트", title: "", url: "", description: "", tags: "" };

function LinkIcon({ title, url }: { title: string; url: string }) {
  let hostname = "";
  try { hostname = new URL(url).hostname.replace("www.", ""); } catch { /* 입력 중인 URL */ }
  const letter = (title || hostname || "L").slice(0, 1).toUpperCase();
  return <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef3ff] text-lg font-bold text-[#315efb]">{letter}</div>;
}

export default function LinksPage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void getDocs(query(linkCollection, orderBy("createdAt", "desc")))
      .then((snapshot) => setLinks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as LinkItem))))
      .catch((reason) => { console.error(reason); setError("링크를 불러오지 못했습니다."); });
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const section = form.section.trim(); const title = form.title.trim(); const url = form.url.trim(); const description = form.description.trim();
    if (!section || !title || !description || !/^https?:\/\/[^\s]+$/.test(url)) { setError("섹션, 제목, 설명과 올바른 URL을 입력해 주세요."); return; }
    setSaving(true); setError("");
    try {
      const data = { section, title, url, description, tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean), createdAt: serverTimestamp() };
      const saved = await addDoc(linkCollection, data);
      setLinks((current) => [{ id: saved.id, section, title, url, description, tags: data.tags }, ...current]);
      setForm(emptyForm); setIsDialogOpen(false);
    } catch (reason) { console.error(reason); setError("링크를 저장하지 못했습니다."); }
    finally { setSaving(false); }
  };

  return <main className="min-h-screen bg-[#f5f6f8] px-4 py-8 text-[#191f28] sm:px-6"><div className="mx-auto max-w-[680px]">
    <header className="mb-6 text-center"><h1 className="text-2xl font-bold">MyLink</h1><p className="mt-2 text-sm text-[#8b95a1]">내가 좋아하는 링크를 한곳에 모아보세요.</p></header>
    <button type="button" onClick={() => { setError(""); setForm(emptyForm); setIsDialogOpen(true); }} className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#3155df] px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2645c4]"><span className="text-lg leading-none">＋</span> 새로운 링크 추가하기</button>
    {error && !isDialogOpen && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
    <section className="space-y-3" aria-label="링크 목록">{links.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-xl border border-[#e5e8eb] bg-white px-4 py-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5 hover:shadow-md"><LinkIcon title={link.title} url={link.url} /><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><h2 className="truncate font-semibold">{link.title}</h2><span className="shrink-0 text-xs text-[#8b95a1]">{link.section}</span></div><p className="mt-1 line-clamp-2 text-sm text-[#6b7684]">{link.description}</p>{link.tags.length > 0 && <p className="mt-2 truncate text-xs text-[#8b95a1]">{link.tags.map((tag) => `#${tag}`).join("  ")}</p>}</div><span className="text-xl text-[#b0b8c1]">›</span></a>)}{links.length === 0 && <div className="rounded-xl border border-dashed border-[#dfe3e8] bg-white px-5 py-12 text-center text-sm text-[#8b95a1]">아직 추가된 링크가 없어요.<br />위 버튼을 눌러 첫 링크를 추가해 보세요.</div>}</section>
  </div>
  {isDialogOpen && <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#191f28]/40 p-0 sm:items-center sm:p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsDialogOpen(false); }}><div role="dialog" aria-modal="true" aria-labelledby="add-link-title" className="w-full max-w-[520px] rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7"><div className="mb-5 flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-wide text-[#3155df]">New link</p><h2 id="add-link-title" className="mt-1 text-xl font-bold">새로운 링크 추가</h2></div><button type="button" onClick={() => setIsDialogOpen(false)} aria-label="닫기" className="text-2xl leading-none text-[#8b95a1]">×</button></div><form onSubmit={submit} className="space-y-3"><input required className="w-full rounded-xl border border-[#e5e8eb] p-3 outline-none focus:border-[#3155df]" placeholder="섹션 (예: Portfolio)" value={form.section} onChange={(event) => setForm({ ...form, section: event.target.value })} /><input required className="w-full rounded-xl border border-[#e5e8eb] p-3 outline-none focus:border-[#3155df]" placeholder="링크 제목" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /><input required type="url" className="w-full rounded-xl border border-[#e5e8eb] p-3 outline-none focus:border-[#3155df]" placeholder="https://" value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} /><textarea required className="min-h-24 w-full resize-none rounded-xl border border-[#e5e8eb] p-3 outline-none focus:border-[#3155df]" placeholder="링크 설명" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /><input className="w-full rounded-xl border border-[#e5e8eb] p-3 outline-none focus:border-[#3155df]" placeholder="태그 (쉼표로 구분)" value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} /><div className="flex gap-2 pt-2"><button type="button" onClick={() => setIsDialogOpen(false)} className="flex-1 rounded-xl bg-[#f2f4f6] p-3 font-semibold text-[#4e5968]">취소</button><button disabled={saving} type="submit" className="flex-1 rounded-xl bg-[#3155df] p-3 font-semibold text-white">{saving ? "저장 중..." : "링크 저장"}</button></div>{error && <p role="alert" className="text-sm text-red-600">{error}</p>}</form></div></div>}
  </main>;
}
