"use client";

import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const email = "contact.keonyoung@example.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const techStacks = [
    {
      category: "AI & Deep Learning",
      icon: (
        <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      skills: ["PyTorch", "Hugging Face", "LLMs", "RAG", "Fine-Tuning", "vLLM", "LangChain"],
    },
    {
      category: "Backend & Systems",
      icon: (
        <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      skills: ["Python", "FastAPI", "Docker", "PostgreSQL", "Vector DB (Milvus)", "Linux"],
    },
    {
      category: "Frontend & Ecosystem",
      icon: (
        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      skills: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Git"],
    },
  ];

  const projects = [
    {
      title: "Autonomous Agent Orchestrator",
      desc: "복잡한 문제 해결을 위한 멀티 에이전트 협업 및 코드 자동 생성·실행 파이프라인 시스템",
      tags: ["LangGraph", "FastAPI", "Next.js", "Claude 3.7"],
      badge: "Featured",
      color: "border-blue-500/30 hover:border-blue-500/60",
    },
    {
      title: "Enterprise Knowledge RAG Engine",
      desc: "대규모 사내 기술 문서 및 규정 데이터를 고속 벡터 검색(Hybrid Search)하여 정확한 답변을 제공하는 QA 시스템",
      tags: ["Milvus", "LlamaIndex", "PyTorch", "bge-m3"],
      badge: "AI Service",
      color: "border-purple-500/30 hover:border-purple-500/60",
    },
    {
      title: "Open-source LLM Quantization & Serving",
      desc: "vLLM 및 AWQ 기반으로 GPU 메모리 사용량을 60% 절감하고 Throughput을 3배 향상시킨 고속 추론 서빙 인프라",
      tags: ["vLLM", "AWQ", "Docker", "Nvidia Triton"],
      badge: "Optimization",
      color: "border-emerald-500/30 hover:border-emerald-500/60",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-[#0c0e14] dark:text-zinc-100">
      {/* 배경 장식 글로우 효과 */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-purple-500/15 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-cyan-500/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* 메인 프로필 헤더 카드 */}
        <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/75 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-zinc-800/80 dark:bg-zinc-900/60">
          {/* 상단 커버 배너 */}
          <div className="relative h-44 w-full sm:h-56 md:h-64 overflow-hidden">
            <Image
              src="/banner.jpg"
              alt="Profile Cover Banner"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* 상태 뱃지 */}
            <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-black/50 px-3.5 py-1.5 text-xs font-medium text-emerald-300 shadow-md backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                Open to Collaboration
              </span>
            </div>
          </div>

          {/* 프로필 상세 정보 섹션 */}
          <div className="relative px-6 pb-8 pt-0 sm:px-10">
            {/* 아바타 이미지 & 이름 */}
            <div className="-mt-16 sm:-mt-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
                <div className="group relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-2xl border-4 border-white bg-zinc-100 shadow-2xl ring-2 ring-zinc-200/50 transition-transform duration-300 hover:scale-105 dark:border-zinc-900 dark:bg-zinc-800 dark:ring-zinc-700/50">
                  <Image
                    src="/profile.jpg"
                    alt="석건영 프로필 사진"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl text-zinc-900 dark:text-white">
                      석건영
                    </h1>
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      Keon-young Seok
                    </span>
                  </div>
                  <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
                    Machine Learning & LLM Engineer
                  </p>
                  <p className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Seoul, South Korea · AI Innovation Lab
                  </p>
                </div>
              </div>

              {/* 빠른 인터랙션 버튼 (연락하기 & 복사) */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 sm:pt-0">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 shadow-sm transition-all hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copied ? "이메일 복사됨! ✓" : "이메일 복사"}
                </button>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-zinc-800 hover:shadow-lg active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub 방문
                </a>
              </div>
            </div>

            {/* 소개 글 */}
            <div className="mt-8 rounded-2xl bg-zinc-50/80 p-5 sm:p-6 border border-zinc-200/60 dark:bg-zinc-800/40 dark:border-zinc-700/60">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                About Me
              </h2>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                인공지능 기술로 복잡한 현실 문제를 해결하고, 사용자에게 실질적인 가치를 전달하는 머신러닝 & LLM 엔지니어 석건영입니다. 
                최신 대형 언어 모델(LLM) 파인튜닝, RAG(검색 증강 생성) 지식 베이스 아키텍처, 그리고 자율형 AI 에이전트 시스템을 집중적으로 연구하고 구현하고 있습니다.
              </p>
            </div>

            {/* 통계 / 하이라이트 지표 카드 그리드 */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-center dark:border-zinc-800 dark:bg-zinc-800/40">
                <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">15+</span>
                <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">AI & ML Projects</p>
              </div>
              <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-center dark:border-zinc-800 dark:bg-zinc-800/40">
                <span className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">99.8%</span>
                <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">Serving Reliability</p>
              </div>
              <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-center dark:border-zinc-800 dark:bg-zinc-800/40">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">60%↓</span>
                <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">Memory Optimization</p>
              </div>
              <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-center dark:border-zinc-800 dark:bg-zinc-800/40">
                <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">Top 5%</span>
                <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">Benchmark Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2단 Bento Grid: 기술 스택 & 주요 프로젝트 */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 왼쪽: 기술 스택 & Connect (1열) */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-3xl border border-zinc-200/80 bg-white/75 p-6 shadow-xl backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/60">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Tech Stacks</h3>
              </div>

              <div className="space-y-5">
                {techStacks.map((group) => (
                  <div key={group.category} className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      {group.icon}
                      <span>{group.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-zinc-200/70 bg-zinc-50/80 px-2.5 py-1 text-xs font-medium text-zinc-800 transition-all hover:scale-105 hover:bg-white hover:shadow-xs dark:border-zinc-700/60 dark:bg-zinc-800/60 dark:text-zinc-200 dark:hover:bg-zinc-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 빠른 링크 카드 */}
            <div className="rounded-3xl border border-zinc-200/80 bg-white/75 p-6 shadow-xl backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/60">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
                Connect
              </h3>
              <div className="space-y-2.5">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center justify-between rounded-xl p-3 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span>Email Me</span>
                  </div>
                  <span className="text-zinc-400">→</span>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl p-3 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900/10 text-zinc-900 dark:bg-white/10 dark:text-white">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </span>
                    <span>GitHub Profile</span>
                  </div>
                  <span className="text-zinc-400">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* 오른쪽: 주요 프로젝트 (2열) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-zinc-200/80 bg-white/75 p-6 sm:p-8 shadow-xl backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/60">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">Featured Projects</h3>
                </div>
                <span className="text-xs font-semibold text-zinc-400">Selected Work</span>
              </div>

              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.title}
                    className={`group relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${project.color} bg-white/50 dark:bg-zinc-800/40`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h4 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h4>
                          <span className="rounded-full bg-blue-100/80 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                            {project.badge}
                          </span>
                        </div>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {project.desc}
                        </p>
                      </div>

                      <div className="rounded-xl border border-zinc-200/60 p-2 text-zinc-400 group-hover:border-blue-300 group-hover:text-blue-600 dark:border-zinc-700 dark:group-hover:border-blue-700 dark:group-hover:text-blue-400 transition-all">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-zinc-100/80 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 푸터 */}
        <footer className="mt-12 text-center text-xs text-zinc-400 dark:text-zinc-500 space-y-1">
          <p>© {new Date().getFullYear()} 석건영 (Keon-young Seok). All rights reserved.</p>
          <p className="text-[11px]">Crafted with Next.js & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

