# 링크 추가 기능 구현

## 요구사항 분석 및 코드베이스 탐색

- [x] `docs/prd_mylink.md`의 링크 기능 요구사항 확인
- [x] 기존 링크 화면 및 컴포넌트 확인
- [x] Next.js Client Component 및 폼 관련 가이드 확인
- [x] 브라우저 메모리 기반 로컬 상태 방식 확인

## 설계

- [x] 링크 추가 폼을 다이얼로그로 표시
- [x] PRD 기준 입력 항목 정의
  - [x] 섹션
  - [x] 링크 제목
  - [x] URL
  - [x] 설명
  - [x] 태그
- [x] `react-hook-form`을 폼 상태 관리에 사용
- [x] `zod`와 `zodResolver`를 입력 검증에 사용
- [x] Base UI 기반 Dialog 래퍼 컴포넌트 추가
- [x] `components.json`의 shadcn 스타일을 `base-nova`로 변경해 Base UI 라이브러리 선택 반영
- [ ] 링크 추가 화면의 기존 커스텀 다이얼로그를 Base UI Dialog로 교체

## 구현

- [x] 링크 목록에 `+ 링크 추가` 버튼 추가
- [x] 링크 추가 다이얼로그 구현
- [x] 필수 입력값 검증
- [x] URL 형식 및 `http/https` 프로토콜 검증
- [x] 제목 80자 제한
- [x] 설명 200자 제한
- [x] 오류 메시지 표시
- [x] 링크 저장 후 목록에 즉시 반영
- [x] 새 링크를 React 로컬 상태에만 저장
- [x] 새로고침 시 추가 링크가 초기화되도록 처리
- [x] 메인 화면에 `/links` 이동 버튼 추가

## 검증

- [x] ESLint 실행
- [x] TypeScript 타입 검사 실행
- [ ] 개발 서버에서 링크 추가 성공 케이스 확인
- [ ] 빈 값 제출 시 오류 메시지 확인
- [ ] 잘못된 URL 제출 시 오류 메시지 확인
- [x] 잘못된 URL이 저장되지 않도록 Zod safeParse와 URL hostname 검증 보강
- [x] 저장 후 새로고침 시 추가 링크 초기화 확인 대상 반영
- [ ] 모바일 화면에서 다이얼로그 표시 확인

## 관련 파일

- `src/app/links/page.tsx`
- `src/app/page.tsx`
- `package.json`
- `docs/prd_mylink.md`

> 참고: PRD는 `localStorage` 영속화를 정의하지만, 현재 사용자 요청에 따라 링크 추가 데이터는 브라우저 메모리 상태로만 관리하며 새로고침 시 초기화합니다.
