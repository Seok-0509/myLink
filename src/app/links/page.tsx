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
import { firestore } from "@/lib/firebase";

type LinkItem = {
  id: string;
  section: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
};

const linkCollection = collection(firestore, "users", "anonymous", "links");
const emptyForm = {
  section: "기술 프로젝트",
  title: "",
  url: "",
  description: "",
  tags: "",
};

async function loadLinks() {
  const snapshot = await getDocs(query(linkCollection, orderBy("createdAt", "desc")));
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

  useEffect(() => {
    void loadLinks()
      .then(setLinks)
      .catch((reason) => {
        console.error(reason);
        setError("링크를 불러오지 못했습니다.");
      })
      .finally(() => setLoading(false));
  }, []);

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
      await addDoc(linkCollection, {
        section,
        title,
        url,
        description,
        tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setLinks(await loadLinks());
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
      await updateDoc(doc(firestore, "users", "anonymous", "links", id), {
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
      await deleteDoc(doc(firestore, "users", "anonymous", "links", deleteTarget.id));
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
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold">MyLink</h1>
          <p className="mt-2 text-sm text-[#8b95a1]">자주 찾아보는 링크를 한곳에 모아보세요.</p>
        </header>

        <button
          type="button"
          onClick={() => {
            setError("");
            setForm(emptyForm);
            setIsDialogOpen(true);
          }}
          className="mb-4 flex w-full items-center justify-center rounded-xl bg-[#3155df] px-4 py-3.5 text-sm font-semibold text-white"
        >
          ＋ 새 링크 추가하기
        </button>

        {error && !isDialogOpen && !deleteTarget && (
          <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <section className="space-y-3" aria-label="링크 목록">
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
        </section>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div role="dialog" aria-modal="true" className="w-full max-w-[520px] rounded-3xl bg-white p-6">
            <h2 className="mb-5 text-xl font-bold">새 링크 추가</h2>
            <form onSubmit={submit} className="space-y-3">
              <input required className="w-full rounded-xl border p-3" placeholder="섹션" value={form.section} onChange={(event) => setForm({ ...form, section: event.target.value })} />
              <input required className="w-full rounded-xl border p-3" placeholder="링크 제목" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
              <input required type="url" className="w-full rounded-xl border p-3" placeholder="https://" value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} />
              <textarea required className="min-h-24 w-full rounded-xl border p-3" placeholder="링크 설명" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
              <input className="w-full rounded-xl border p-3" placeholder="태그" value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} />
              <div className="flex gap-2"><button type="button" disabled={saving} onClick={() => setIsDialogOpen(false)} className="flex-1 rounded-xl bg-[#f2f4f6] p-3 font-semibold">취소</button><button disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3155df] p-3 font-semibold text-white">{saving ? <><span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />저장 중...</> : "링크 저장"}</button></div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div role="dialog" aria-modal="true" className="w-full max-w-[400px] rounded-3xl bg-white p-6">
            <h2 className="text-xl font-bold">정말 삭제하시겠습니까?</h2>
            <p className="mt-4 text-[#4e5968]">[{deleteTarget.title}] 링크가 삭제됩니다.</p>
            <p className="mt-2 text-sm text-red-600">이 작업은 되돌릴 수 없습니다.</p>
            <div className="mt-6 flex gap-2"><button type="button" disabled={deleting} onClick={() => setDeleteTarget(null)} className="flex-1 rounded-xl bg-[#f2f4f6] p-3 font-semibold">취소</button><button type="button" disabled={deleting} onClick={() => void removeLink()} className="flex-1 rounded-xl bg-red-600 p-3 font-semibold text-white">{deleting ? "삭제 중..." : "삭제하기"}</button></div>
          </div>
        </div>
      )}
    </main>
  );
}
