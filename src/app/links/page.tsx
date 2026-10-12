"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LinkCard } from "@/components/profile/LinkCard";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { SectionHeader } from "@/components/profile/SectionHeader";
import { SocialBar } from "@/components/profile/SocialBar";

const links = [
  { id: "voice-agent", section: "포트폴리오", title: "Voice Agent meeting assistant", description: "Realtime API와 WebSocket으로 만든 음성 회의 보조 도구입니다.", url: "https://github.com/Seok-0509/", tags: ["Realtime API", "WebSocket", "Python"] },
  { id: "document-search", section: "포트폴리오", title: "Document search automation", description: "PDF 문서에서 필요한 답변을 찾는 OCR·벡터 검색 파이프라인입니다.", url: "https://github.com/Seok-0509/", tags: ["OCR", "LlamaIndex", "RAG"] },
  { id: "model-dashboard", section: "포트폴리오", title: "LLM serving observability dashboard", description: "LLM 서버의 지연 시간, GPU 사용량, 서비스 상태를 확인합니다.", url: "https://github.com/Seok-0509/", tags: ["Grafana", "Prometheus", "Kubernetes"] },
  { id: "tech-blog", section: "추천 링크", title: "AI engineering notes", description: "LLM, RAG, 모델 서빙과 프로덕션 엔지니어링에 대한 기록입니다.", url: "https://github.com/Seok-0509/", tags: ["Blog", "AI", "Engineering"] },
];

export default function LinksPage() {
  const [section, setSection] = useState("전체");
  const visibleLinks = section === "전체" ? links : links.filter((link) => link.section === section);

  return (
    <main className="min-h-screen bg-[#f2f4f6] px-4 py-10 text-[#191f28] sm:px-6">
      <div className="mx-auto max-w-[680px]">
        <ProfileHeader name="MyLink" bio="작업과 좋아하는 링크를 모았어요." />
        <SocialBar links={[{ name: "GitHub", url: "https://github.com/Seok-0509/" }, { name: "LinkedIn", url: "https://www.linkedin.com/" }]} />
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="링크 섹션">
          {["전체", "포트폴리오", "추천 링크"].map((name) => <Button key={name} type="button" role="tab" aria-selected={section === name} onClick={() => setSection(name)} className={section === name ? "bg-[#191f28] text-white" : "bg-white text-[#6b7684]"}>{name}</Button>)}
        </div>
        <section aria-label="링크 목록">
          <SectionHeader>{section === "전체" ? "전체 링크" : section}</SectionHeader>
          <div className="space-y-3">{visibleLinks.map((link) => <LinkCard key={link.id} title={link.title} description={link.description} url={link.url} tags={link.tags} />)}</div>
        </section>
      </div>
    </main>
  );
}
