export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        {/* 프로필 이미지 / 아바타 */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg ring-4 ring-blue-100 dark:ring-zinc-800">
          <span className="text-3xl font-bold text-white tracking-wider">석</span>
        </div>

        {/* 이름 및 직무/타이틀 */}
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          석건영
        </h1>
        <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
          Machine Learning & LLM Engineer
        </p>

        {/* 소개글 */}
        <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
          안녕하세요! 인공지능 기술로 복잡한 문제를 해결하고 실질적인 가치를 만들어가는 머신러닝 & LLM 엔지니어 석건영입니다. 최신 딥러닝 모델 연구와 생성형 AI 응용 기술에 깊은 관심을 두고 있습니다.
        </p>

        {/* 기술 태그 */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {[
            "Machine Learning",
            "Deep Learning",
            "LLM",
            "PyTorch",
            "Python",
            "Prompt Engineering",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* 링크 / 액션 버튼 */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="mailto:contact@example.com"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            연락하기
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            GitHub
          </a>
        </div>

        {/* 푸터 */}
        <footer className="mt-12 text-xs text-zinc-400 dark:text-zinc-500">
          © {new Date().getFullYear()} 석건영. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
