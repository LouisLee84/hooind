# Hooind Development Standard

## 적용 우선순위

1. 사용자의 명시적인 작업 요구사항
2. `docs/00_PROJECT_CONSTITUTION.md`
3. `docs/HOOIND_BRAND_IDENTITY_v0.1.md`
4. 이 문서

정책이 충돌하면 상위 기준을 우선하고 필요한 정책 변경은 문서와 `CHANGELOG.md`에 함께 기록한다.

## 기본 원칙

- 패키지 관리자는 pnpm 11.17.0을 사용한다.
- 애플리케이션은 `apps`, 공유 코드는 `packages`에 둔다.
- Next.js App Router와 TypeScript를 사용한다.
- 서버 컴포넌트를 기본으로 하고 브라우저 상태나 이벤트가 필요할 때만 클라이언트 컴포넌트를 사용한다.
- 모바일 우선, 접근성, 빠른 초기 렌더링과 낮은 CLS를 지향한다.
- 불필요한 의존성과 중복 코드를 추가하지 않는다.

## 품질 기준

- 변경 전 관련 코드와 최신 Next.js 내장 문서를 확인한다.
- ESLint, TypeScript, Vitest와 프로덕션 빌드를 통과시킨다.
- 사용자 흐름에 영향을 주는 변경은 Playwright 테스트를 추가하거나 갱신한다.
- 포맷은 Prettier에 맡기며 수동 스타일 예외를 만들지 않는다.
- 공개 API와 복잡한 로직에는 의도를 설명하는 짧은 문서를 남긴다.

## 공용 AdSense 정책

- 새 계산기·도구 앱은 `@/components/calculator-layout`의 `CalculatorLayout`을 사용하고 `adLayout`을 명시적으로 검토한다.
- `adLayout` 타입은 `"full" | "compact" | "tool" | "none"`이며 기본값은 `full`이다.
  - `full`: 제목·소개 아래 Top, 계산기·결과 아래 Result, 설명 다음이자 FAQ·관련 콘텐츠 위 Bottom
  - `compact`: Top + Result. 콘텐츠가 짧아 세 광고 사이의 간격이 부족할 때 사용한다.
  - `tool`: Top + Bottom. 결과 영역이 없는 생성기·도구에 사용한다.
  - `none`: 광고가 부적절한 페이지에 사용한다.
- Slot ID를 페이지에 직접 작성하지 않고 `ADSENSE_SLOTS`와 공용 `AdBanner`를 재사용한다.
- Top과 Bottom은 `min-height`를 모바일 100px·데스크톱 90px, Result는 모바일 250px·데스크톱 280px로 예약한다. 실제 광고 크기를 고정하지 않는다.
- 광고를 입력·결과 확인 버튼에 인접 배치하지 않고 광고 사이에 충분한 콘텐츠를 둔다. 조건을 충족하지 못하면 광고 수를 줄인다.
- Production에서만 실제 광고를 로드하고 Development placeholder, 반응형 속성, StrictMode 중복 요청 방지와 단일 전역 로더를 유지한다.
- 새 계산기 완료 보고에는 적용한 `adLayout`, 광고 개수와 위치, 모바일·데스크톱 확인, ESLint·TypeScript·테스트·Production build 결과를 포함한다.

## Git 규칙

- 작은 목적 단위로 커밋한다.
- 커밋 메시지는 변경 결과를 명확하게 설명한다.
- 생성 파일, 비밀 정보와 로컬 환경 파일은 커밋하지 않는다.
- 기능 또는 정책 변경은 `CHANGELOG.md`에 기록한다.
