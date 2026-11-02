"use client";

import { useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firebaseAuth, firestore } from "@/lib/firebase";

async function ensureUserDocument(user: User) {
  const displayName = user.email?.split("@")[0] ?? "";

  await setDoc(doc(firestore, "users", user.uid), {
    uid: user.uid,
    displayName,
    email: user.email ?? "",
    photoURL: user.photoURL ?? "",
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export function GoogleAuthButton({ className = "" }: { className?: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);

  useEffect(() => onAuthStateChanged(firebaseAuth, (nextUser) => {
    setUser(nextUser);
    setLoading(false);
    if (nextUser) void ensureUserDocument(nextUser).catch((error) => console.error("Failed to create user document", error));
  }), []);

  const handleAuth = async () => {
    setWorking(true);
    try {
      if (user) await signOut(firebaseAuth);
      else {
        const credential = await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
        await ensureUserDocument(credential.user);
      }
    } catch (error) {
      console.error("Google authentication failed", error);
    } finally {
      setWorking(false);
    }
  };

  if (loading) return <span className="h-8 w-20 animate-pulse rounded-full bg-[#f2f4f6]" aria-hidden="true" />;

  return <button type="button" onClick={() => void handleAuth()} disabled={working} className={`flex cursor-pointer items-center gap-1 rounded-full bg-[#f2f4f6] px-2 py-1.5 text-xs font-semibold text-[#4e5968] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}>
    {!user && <span className="font-bold text-[#4285f4]">G</span>}
    <span>{working ? "처리 중..." : user ? "로그아웃" : "Google 로그인"}</span>
  </button>;
}
