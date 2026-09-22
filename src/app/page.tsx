"use client";

import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const email = "contact.keonyoung@example.com";
  const githubUrl = "https://github.com/Seok-0509/";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const projects = [
    {
      id: "agent",
      category: "agent",
      title: "자율형 AI 멀티 에이전트 플랫폼",
      desc: "LangGraph와 FastAPI로 실시간 코드 작성 및 실행 파이프라인을 구축했어요.",
      tags: ["LangGraph", "FastAPI", "Next.js 16", "Claude 3.7"],
      badge: "핵심 프로젝트",
      badgeType: "brand",
      metrics: "작업 완료율 94.2%",
      link: githubUrl,
    },
    {
      id: "rag",
      category: "rag",
      title: "엔터프라이즈 사내 지식검색 RAG 엔진",
      desc: "수십만 건의 사내 규정과 기술 문서를 Milvus 하이브리드 벡터 검색으로 정확히 찾아줘요.",
      tags: ["Milvus", "LlamaIndex", "PyTorch", "BGE-M3"],
      badge: "운영 중",
      badgeType: "success",
      metrics: "검색 지연 85ms",
      link: githubUrl,
    },
    {
      id: "serving",
      category: "serving",
      title: "대규모 LLM 양자화 및 고속 서빙 클러스터",
      desc: "AWQ 기법과 vLLM을 결합해 GPU 메모리를 60% 절감하고 서빙 처리량을 3배 높였어요.",
      tags: ["vLLM", "AWQ", "Docker", "Triton"],
      badge: "최적화 완료",
      badgeType: "neutral",
      metrics: "VRAM 60% 절감",
      link: githubUrl,
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const skills = [
    { category: "AI & 딥러닝", items: ["PyTorch", "Hugging Face", "LLMs", "RAG", "Fine-Tuning", "vLLM"] },
    { category: "백엔드 & 시스템", items: ["Python", "FastAPI", "Docker", "PostgreSQL", "Milvus", "Linux"] },
    { category: "웹 & 프론트엔드", items: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Git"] },
  ];

  return (
    <div className="min-h-screen bg-[#f2f4f6] text-[#191f28] break-keep [overflow-wrap:anywhere] pb-[calc(8rem+env(safe-area-inset-bottom))] max-[360px]:pb-[calc(11rem+env(safe-area-inset-bottom))]">
      {/* 1. 상단 TopBar (56pt) */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#e5e8eb]">
        <div className="max-w-[680px] mx-auto h-14 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f2f7ff] flex items-center justify-center">
              <span className="text-[#3182f6] font-bold text-sm">석</span>
            </div>
            <span className="font-bold text-[17px] text-[#191f28] tracking-tight">
              석건영
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* 작은 화면에서는 접근 가능한 이름을 유지하고 아이콘만 표시 */}
            <button
              onClick={handleCopyEmail}
              aria-label={copied ? "이메일 복사됨" : "이메일 복사"}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-[#4e5968] bg-[#f2f4f6] active:bg-[#e5e8eb] transition-colors whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="hidden min-[380px]:inline">
                {copied ? "복사됨 ✓" : "이메일"}
              </span>
              <span className="min-[380px]:hidden">
                {copied ? "✓" : ""}
              </span>
            </button>
            {/* GitHub 버튼: 아이콘과 텍스트 표시 */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-[#3182f6] bg-[#f2f7ff] active:bg-[#e5e8eb] transition-colors whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. 메인 컨테이너 (토스 모바일-퍼스트 단일 컬럼: max-w 680px) */}
      <main className="max-w-[680px] mx-auto px-4 sm:px-5 pt-6 space-y-4">
        
        {/* 프로필 Hero Card */}
        <section className="bg-white rounded-[28px] p-4 min-[380px]:p-5 sm:p-8 border border-black/[0.04] shadow-xs">
          <div className="flex flex-col-reverse min-[480px]:flex-row items-start justify-between gap-4">
            <div className="min-w-0 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f2f7ff] text-[#3182f6] text-xs font-semibold">
                <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#3182f6]"></span>
                <span>협업 및 채용 열려있어요</span>
              </div>
              
              <h1 className="text-2xl sm:text-[28px] font-bold text-[#191f28] tracking-tight leading-snug text-balance">
                복잡한 AI 모델을 실제 가치로 연결해요
              </h1>
              
              <p className="text-[15px] font-normal text-[#4e5968] leading-relaxed text-pretty pt-1">
                대규모 언어 모델(LLM) 파인튜닝과 고성능 RAG 검색, 자율형 에이전트 아키텍처를 연구하고 개발하는 엔지니어 석건영입니다.
              </p>
            </div>

            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-[#e5e8eb] shadow-xs bg-[#f2f4f6]">
              <Image
                src="/profile.jpg"
                alt="석건영 프로필 사진"
                width={96}
                height={96}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 핵심 지표 하이라이트 (토스식 Tabular 숫자) */}
          <div className="grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-[#f2f4f6]">
            <div className="min-w-0 bg-[#f9fafb] rounded-2xl px-1.5 py-3.5 sm:p-3.5 text-center">
              <div className="text-[13px] text-[#8b95a1] font-medium">프로젝트</div>
              <div className="text-lg sm:text-xl font-bold text-[#191f28] tabular pt-0.5">15건+</div>
            </div>
            <div className="min-w-0 bg-[#f9fafb] rounded-2xl px-1.5 py-3.5 sm:p-3.5 text-center">
              <div className="text-[13px] text-[#8b95a1] font-medium">서빙 가용성</div>
              <div className="text-lg sm:text-xl font-bold text-[#05a065] tabular pt-0.5">99.8%</div>
            </div>
            <div className="min-w-0 bg-[#f9fafb] rounded-2xl px-1.5 py-3.5 sm:p-3.5 text-center">
              <div className="text-[13px] text-[#8b95a1] font-medium">VRAM 절감</div>
              <div className="text-lg sm:text-xl font-bold text-[#3182f6] tabular pt-0.5">60%</div>
            </div>
          </div>
        </section>

        {/* 프로젝트 섹션 (ListRow 스타일) */}
        <section className="bg-white rounded-[28px] p-4 min-[380px]:p-5 sm:p-6 border border-black/[0.04] shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[20px] font-bold text-[#191f28] tracking-tight">
              진행한 프로젝트
            </h2>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 whitespace-nowrap text-xs font-semibold text-[#8b95a1] hover:text-[#3182f6] flex items-center gap-0.5 transition-colors"
            >
              <span>전체보기</span>
              <span>›</span>
            </a>
          </div>

          {/* 필터 칩 (Full Pill 형태) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { key: "all", label: "전체" },
              { key: "agent", label: "에이전트" },
              { key: "rag", label: "RAG 지식검색" },
              { key: "serving", label: "서빙 최적화" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? "bg-[#191f28] text-white"
                    : "bg-[#f2f4f6] text-[#6b7684] hover:bg-[#e5e8eb]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 프로젝트 리스트 (ListRow) */}
          <div className="divide-y divide-[#f2f4f6] pt-1">
            {filteredProjects.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-4 first:pt-2 last:pb-2 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                      <span
                        className={`whitespace-nowrap text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          project.badgeType === "brand"
                            ? "bg-[#f2f7ff] text-[#3182f6]"
                            : project.badgeType === "success"
                            ? "bg-[#e8f7f0] text-[#05a065]"
                            : "bg-[#f2f4f6] text-[#6b7684]"
                        }`}
                      >
                        {project.badge}
                      </span>
                      <span className="whitespace-nowrap text-[12px] font-bold text-[#3182f6] tabular">
                        {project.metrics}
                      </span>
                    </div>

                    <h3 className="text-[17px] font-semibold text-[#191f28] group-hover:text-[#3182f6] transition-colors leading-snug text-balance">
                      {project.title}
                    </h3>

                    <p className="text-[14px] text-[#4e5968] leading-relaxed text-pretty">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[12px] text-[#8b95a1] bg-[#f9fafb] px-2 py-0.5 rounded-md font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="hidden min-[480px]:flex w-8 h-8 rounded-full bg-[#f9fafb] group-hover:bg-[#f2f7ff] items-center justify-center text-[#8b95a1] group-hover:text-[#3182f6] shrink-0 mt-1 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 기술 스택 섹션 */}
        <section className="bg-white rounded-[28px] p-4 min-[380px]:p-5 sm:p-6 border border-black/[0.04] shadow-xs space-y-5">
          <h2 className="text-[20px] font-bold text-[#191f28] tracking-tight">
            사용하는 기술
          </h2>

          <div className="space-y-4">
            {skills.map((group) => (
              <div key={group.category} className="space-y-2">
                <div className="text-[13px] font-semibold text-[#8b95a1]">
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-[#f2f4f6] text-[14px] font-semibold text-[#333d4b]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 자주 묻는 질문 / 가치관 카드 */}
        <section className="bg-white rounded-[28px] p-4 min-[380px]:p-5 sm:p-6 border border-black/[0.04] shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">💡</span>
            <h2 className="text-[18px] font-bold text-[#191f28] text-balance">
              어떤 엔지니어링을 지향하나요?
            </h2>
          </div>
          <p className="text-[15px] text-[#4e5968] leading-relaxed text-pretty">
            아무리 복잡하고 최신의 인공지능 모델이라도 사용자가 체감하는 가치와 속도로 이어지지 않으면 의미가 없다고 믿어요. 직관적이고 안정적인 서비스 구조를 만드는데 깊게 몰입해요.
          </p>
        </section>

        {/* 푸터 안내 */}
        <footer className="pt-6 pb-4 text-center text-xs text-[#8b95a1] space-y-1">
          <p>© {new Date().getFullYear()} 석건영. 모든 권리 보유.</p>
          <p className="text-[11px] text-[#b0b8c1]">토스 디자인 시스템(TDS) 가이드라인을 기반으로 제작되었어요</p>
        </footer>

      </main>

      {/* 3. 하단 고정 BottomCTA (56pt + 보호 그라디언트) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-gradient-to-t from-white via-white/95 to-transparent pt-6 pb-[calc(1rem+env(safe-area-inset-bottom))] px-4 sm:px-5">
        <div className="max-w-[640px] mx-auto grid grid-cols-[1fr_1.2fr] max-[360px]:grid-cols-1 sm:grid-cols-2 items-center gap-2">
          <button
            onClick={handleCopyEmail}
            className="min-h-12 sm:min-h-14 px-3 py-3 rounded-2xl bg-[#f2f4f6] text-[#191f28] font-bold text-[14px] sm:text-[16px] active:bg-[#e5e8eb] transition-colors flex items-center justify-center gap-2 min-w-0"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="whitespace-nowrap">
              {copied ? "복사됨 ✓" : "이메일 복사"}
            </span>
          </button>
          
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-12 sm:min-h-14 px-3 py-3 rounded-2xl bg-[#3182f6] text-white font-bold text-[14px] sm:text-[16px] active:bg-[#1b64da] shadow-sm transition-colors flex items-center justify-center gap-2 min-w-0"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="whitespace-nowrap">GitHub 방문하기</span>
          </a>
        </div>
      </div>

    </div>
  );
}



