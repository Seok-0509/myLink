"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { firebaseAuth, firestore } from "@/lib/firebase";
import { Dialog, DialogBackdrop, DialogClose, DialogDescription, DialogPopup, DialogPortal, DialogTitle } from "@/components/ui/dialog";

type LinkItem = {
  id: string;
  section: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
};

const emptyForm = {
  section: "기술 프로젝트",
  title: "",
  url: "",
  description: "",
  tags: "",
};

async function loadLinks(uid: string) {
  const snapshot = await getDocs(query(collection(firestore, "users", uid, "links"), orderBy("createdAt", "desc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as LinkItem));
}

function LinkIcon({ title, url }: { title: string; url: string }) {
  let hostname = "";

  try {
    hostname = new URL(url).hostname.replace("www.", "");
  } catch {
    // 입력 중인 URL은 아직 파싱하지 않습니다.
  }

  const letter = (title || hostname || "L").slice(0, 1).toUpperCase();

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef3ff] text-lg font-bold text-[#315efb]">
      {letter}
    </div>
  );
}

export default function LinksPage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<LinkItem | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ title: "", url: "" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => onAuthStateChanged(firebaseAuth, (nextUser) => {
    setUser(nextUser);
    setAuthLoading(false);
    if (!nextUser) {
      setLoading(false);
      return;
    }
    void loadLinks(nextUser.uid).then(setLinks).catch((reason) => {
      console.error(reason);
      setError("링크를 불러오지 못했습니다.");
    }).finally(() => setLoading(false));
  }), []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const section = form.section.trim();
    const title = form.title.trim();
    const url = form.url.trim();
    const description = form.description.trim();

    if (!section || !title || !description || !/^https?:\/\/[^\s]+$/.test(url)) {
      setError("섹션, 제목, 설명과 올바른 URL을 입력해 주세요.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      if (!user) return;
      await addDoc(collection(firestore, "users", user.uid, "links"), {
        section,
        title,
        url,
        description,
        tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setLinks(await loadLinks(user.uid));
      setForm(emptyForm);
      setIsDialogOpen(false);
    } catch (reason) {
      console.error(reason);
      setError("링크를 저장하지 못했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (link: LinkItem) => {
    setEditingId(link.id);
    setEditValues({ title: link.title, url: link.url });
    setError("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValues({ title: "", url: "" });
    setError("");
  };

  const updateLink = async (id: string) => {
    const title = editValues.title.trim();
    const url = editValues.url.trim();

    if (!title || !url) {
      setError("제목과 주소를 입력해 주세요.");
      return;
    }

    if (!/^https?:\/\/[^\s]+$/.test(url)) {
      setError("올바른 URL을 입력해 주세요.");
      return;
    }

    setUpdating(true);
    setError("");

    try {
      if (!user) return;
      await updateDoc(doc(firestore, "users", user.uid, "links", id), {
        title,
        url,
        updatedAt: serverTimestamp(),
      });

      setLinks((current) =>
        current.map((link) => (link.id === id ? { ...link, title, url } : link)),
      );
      cancelEditing();
    } catch (reason) {
      console.error(reason);
      setError("링크를 수정하지 못했습니다.");
    } finally {
      setUpdating(false);
    }
  };

  const removeLink = async () => {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      if (!user) return;
      await deleteDoc(doc(firestore, "users", user.uid, "links", deleteTarget.id));
      setLinks((current) => current.filter((link) => link.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (reason) {
      console.error(reason);
      setError("링크를 삭제하지 못했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f6f8] px-4 py-8 text-[#191f28] sm:px-6">
      <div className="mx-auto max-w-[680px]">
        <header className="mb-6 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">MyLink</h1>
          {user && (
            <div className="group relative ml-auto">
              <button type="button" aria-label="프로필 메뉴 열기" className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_2px_8px_rgba(25,31,40,0.16)] ring-1 ring-[#dfe3e8] transition hover:ring-[#3155df]">
                {user.photoURL ? <img src={user.photoURL} alt="" className="h-full w-full object-cover" /> : <span className="text-sm font-bold text-[#3155df]">{(user.email?.[0] ?? "U").toUpperCase()}</span>}
              </button>
              <div className="invisible absolute right-0 top-11 z-20 w-44 translate-y-1 rounded-xl border border-[#dfe3e8] bg-white p-1.5 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <p className="truncate px-3 py-2 text-xs text-[#8b95a1]">{user.email?.split("@")[0]}</p>
                <button type="button" onClick={() => { setError(""); setForm(emptyForm); setIsDialogOpen(true); }} className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#3155df] hover:bg-[#f2f7ff]">+ 링크 추가하기</button>
                <button type="button" onClick={() => user && void loadLinks(user.uid).then(setLinks).catch(() => setError("링크를 새로고침하지 못했습니다."))} className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-[#4e5968] hover:bg-[#f2f4f6]">↻ 링크 새로고침</button>
                <button type="button" onClick={() => void signOut(firebaseAuth)} className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-[#4e5968] hover:bg-[#f2f4f6]">로그아웃</button>
              </div>
            </div>
          )}
        </header>

        {authLoading ? <div className="rounded-xl bg-white p-4 text-center text-sm text-[#8b95a1]">로그인 상태를 확인하는 중...</div> : !user ? <div className="rounded-xl bg-white p-6 text-center text-sm text-[#6b7684]">개인 링크를 관리하려면 Google 로그인이 필요해요.</div> : <button
          type="button"
          onClick={() => {
            setError("");
            setForm(emptyForm);
            setIsDialogOpen(true);
          }}
          className="hidden"
        >
          ＋ 새 링크 추가하기
        </button>}

        {user && !authLoading && (
          <section className="mb-8 flex flex-col items-center text-center">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_4px_14px_rgba(25,31,40,0.14)]">
              {user.photoURL ? <img src={user.photoURL} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-3xl font-bold text-[#3155df]">{(user.email?.[0] ?? "U").toUpperCase()}</span>}
            </div>
            <h2 className="mt-4 text-lg font-bold">{user.displayName || user.email?.split("@")[0]}</h2>
            <p className="mt-1 text-sm text-[#6b7684]">@{user.email?.split("@")[0]}</p>
            <p className="mt-2 text-sm text-[#8b95a1]">한 줄 소개를 입력해주세요.</p>
            <button type="button" onClick={() => { setError(""); setForm(emptyForm); setIsDialogOpen(true); }} className="mt-7 flex w-full max-w-[290px] items-center justify-center rounded-none bg-[#2146e8] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_3px_8px_rgba(33,70,232,0.22)] transition hover:bg-[#173bd0]">+ 새로운 링크 추가하기</button>
          </section>
        )}

        {error && !isDialogOpen && !deleteTarget && (
          <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {user && <section className="space-y-3" aria-label="링크 목록">
          {loading && (
            <div className="rounded-xl border bg-white px-5 py-8 text-center text-sm text-[#8b95a1]">
              링크를 불러오는 중...
            </div>
          )}

          {!loading && links.map((link) => (
            <div key={link.id} className="flex items-center gap-3 rounded-xl border border-[#e5e8eb] bg-white px-4 py-5 shadow-sm">
              <LinkIcon title={link.title} url={link.url} />
              <div className="min-w-0 flex-1">
                {editingId === link.id ? (
                  <div className="space-y-2">
                    <input value={editValues.title} onChange={(event) => setEditValues({ ...editValues, title: event.target.value })} aria-label="링크 제목 수정" className="w-full rounded-lg border border-[#dfe3e8] p-2 font-semibold" />
                    <input value={editValues.url} onChange={(event) => setEditValues({ ...editValues, url: event.target.value })} aria-label="링크 주소 수정" className="w-full rounded-lg border border-[#dfe3e8] p-2 text-sm" />
                    <div className="flex gap-2">
                      <button type="button" disabled={updating} onClick={() => void updateLink(link.id)} className="rounded-lg bg-[#3155df] px-3 py-2 text-sm font-semibold text-white">저장</button>
                      <button type="button" disabled={updating} onClick={cancelEditing} className="rounded-lg bg-[#f2f4f6] px-3 py-2 text-sm font-semibold">취소</button>
                    </div>
                  </div>
                ) : (
                  <a href={link.url} target="_blank" rel="noreferrer" className="block">
                    <div className="flex items-center justify-between gap-3"><h2 className="truncate font-semibold">{link.title}</h2><span className="shrink-0 text-xs text-[#8b95a1]">{link.section}</span></div>
                    <p className="mt-1 line-clamp-2 text-sm text-[#6b7684]">{link.description}</p>
                    {link.tags.length > 0 && <p className="mt-2 truncate text-xs text-[#8b95a1]">{link.tags.map((tag) => `#${tag}`).join("  ")}</p>}
                  </a>
                )}
              </div>

              {editingId !== link.id && (
                <div className="flex shrink-0 items-center gap-1">
                  <button type="button" aria-label={`${link.title} 수정`} onClick={() => startEditing(link)} className="rounded-lg p-2 text-lg text-[#8b95a1] hover:bg-[#f2f7ff] hover:text-[#3155df]">✎</button>
                  <button type="button" aria-label={`${link.title} 삭제`} onClick={() => setDeleteTarget(link)} className="rounded-lg p-2 text-lg text-[#8b95a1] hover:bg-red-50 hover:text-red-600">🗑</button>
                </div>
              )}
            </div>
          ))}

          {!loading && links.length === 0 && (
            <div className="rounded-xl border border-dashed bg-white px-5 py-12 text-center text-sm text-[#8b95a1]">아직 추가된 링크가 없어요.</div>
          )}
        </section>}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup className="max-w-[560px] rounded-2xl p-6 sm:p-8">
            <DialogTitle className="text-xl font-bold tracking-tight text-[#191f28]">새 링크 추가</DialogTitle>
            <DialogDescription className="mt-2 text-sm text-[#8b95a1]">나중에 다시 찾고 싶은 링크를 정리해보세요.</DialogDescription>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <label className="block text-sm font-semibold text-[#4e5968]">카테고리<input required className="mt-2 w-full rounded-xl border border-[#e5e8eb] bg-[#f9fafb] p-3 outline-none transition focus:border-[#3155df] focus:bg-white focus:ring-4 focus:ring-[#3155df]/10" placeholder="예: 기술 프로젝트" value={form.section} onChange={(event) => setForm({ ...form, section: event.target.value })} /></label>
              <label className="block text-sm font-semibold text-[#4e5968]">링크 제목<input required className="mt-2 w-full rounded-xl border border-[#e5e8eb] bg-[#f9fafb] p-3 outline-none transition focus:border-[#3155df] focus:bg-white focus:ring-4 focus:ring-[#3155df]/10" placeholder="예: 내 블로그" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label>
              <label className="block text-sm font-semibold text-[#4e5968]">URL<input required type="url" className="mt-2 w-full rounded-xl border border-[#e5e8eb] bg-[#f9fafb] p-3 outline-none transition focus:border-[#3155df] focus:bg-white focus:ring-4 focus:ring-[#3155df]/10" placeholder="https://" value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} /></label>
              <label className="block text-sm font-semibold text-[#4e5968]">설명<textarea required className="mt-2 min-h-24 w-full resize-y rounded-xl border border-[#e5e8eb] bg-[#f9fafb] p-3 outline-none transition focus:border-[#3155df] focus:bg-white focus:ring-4 focus:ring-[#3155df]/10" placeholder="이 링크에 대한 간단한 설명" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
              <label className="block text-sm font-semibold text-[#4e5968]">태그<span className="ml-1 font-normal text-[#8b95a1]">(선택)</span><input className="mt-2 w-full rounded-xl border border-[#e5e8eb] bg-[#f9fafb] p-3 outline-none transition focus:border-[#3155df] focus:bg-white focus:ring-4 focus:ring-[#3155df]/10" placeholder="예: React, 디자인" value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} /></label>
              <div className="flex gap-3 pt-2"><DialogClose render={<button type="button" disabled={saving} className="flex-1 rounded-xl bg-[#f2f4f6] p-3 font-semibold text-[#4e5968] transition hover:bg-[#e5e8eb]" />}>취소</DialogClose><button disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3155df] p-3 font-semibold text-white transition hover:bg-[#2448cc]">{saving ? <><span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />저장 중...</> : "링크 저장"}</button></div>
            </form>
          </DialogPopup>
        </DialogPortal>
      </Dialog>

      <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup className="max-w-[400px]">
          <DialogTitle className="text-xl font-bold">정말 삭제하시겠습니까?</DialogTitle>
          <DialogDescription className="mt-4 text-[#4e5968]">[{deleteTarget?.title}] 링크가 삭제됩니다.</DialogDescription>
          <p className="mt-2 text-sm text-red-600">이 작업은 되돌릴 수 없습니다.</p>
          <div className="mt-6 flex gap-2"><DialogClose render={<button type="button" disabled={deleting} className="flex-1 rounded-xl bg-[#f2f4f6] p-3 font-semibold" />}>취소</DialogClose><button type="button" disabled={deleting} onClick={() => void removeLink()} className="flex-1 rounded-xl bg-red-600 p-3 font-semibold text-white">{deleting ? "삭제 중..." : "삭제하기"}</button></div>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </main>
  );
}
