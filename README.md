# Hooind

## 프로젝트 소개

Hooind는 게임, 계산기, 테스트, 생성기처럼 브라우저에서 바로 이용할 수 있는 인터랙티브 콘텐츠를 제공하는 웹 서비스입니다. Project PlayAds라는 내부 생산 체계를 통해 콘텐츠를 빠르고 일관되게 개발하고 Hooind Interactive 브랜드로 제공합니다.

## 목표

검색 유입, 반복 사용과 광고 수익을 기반으로 지속 가능한 수익형 웹 서비스를 구축합니다. 개별 콘텐츠를 단발성으로 만드는 대신 UI, 기능, 분석, SEO와 광고 구조를 재사용할 수 있는 개발 체계를 지향합니다.

## 기술 스택

- Next.js 16.2.12 App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- pnpm Workspace
- ESLint 9, Prettier 3
- Husky, lint-staged
- Vitest, Playwright
- GitHub Actions

## 개발 환경

- Node.js 20.9 이상(Node.js 24 권장)
- pnpm 11.17.0
- Git

Corepack을 사용하는 경우 다음 명령으로 pnpm을 준비합니다.

```bash
corepack enable
corepack prepare pnpm@11.17.0 --activate
```

## 실행 방법

```bash
pnpm install
pnpm dev
```

개발 서버가 시작되면 `http://localhost:3000`을 엽니다.

## 제공 계산기

- `/calculators` — 전체 계산기 목록
- `/calculators/retirement-pay` — 퇴직금 계산기
- `/calculators/salary` — 연봉 실수령액 계산기
- `/calculators/weekly-holiday-pay` — 주휴수당 계산기

운영 안내 페이지:

- `/privacy` — 개인정보처리방침
- `/terms` — 이용약관 및 면책
- `/contact` — 문의

## 운영 환경변수

`.env.example`을 참고해 로컬에서는 `.env.local`, Vercel에서는 Project Settings에 값을 등록합니다. 모든 변수는 선택 사항이며 미설정 상태에서도 빌드됩니다.

| 변수                                   | 설명                                                                |
| -------------------------------------- | ------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | canonical, sitemap과 robots의 대표 URL. 기본값 `https://hooind.com` |
| `NEXT_PUBLIC_CONTACT_EMAIL`            | 문의 페이지에 공개할 이메일                                         |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`        | 프로덕션에서만 로드하는 GA4 Measurement ID                          |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console HTML 메타 태그 인증값                                |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID`        | 프로덕션에서만 로드하는 AdSense 클라이언트 ID                       |

`NEXT_PUBLIC_` 변수는 브라우저에 공개됩니다. 비밀값을 저장하지 마세요.

```bash
pnpm lint          # ESLint
pnpm typecheck     # TypeScript
pnpm test          # Vitest 단위 테스트
pnpm test:e2e      # Playwright 브라우저 테스트
pnpm format:check  # Prettier 검사
pnpm build         # 프로덕션 빌드
```

Playwright를 처음 사용하는 환경에서는 브라우저를 설치합니다.

```bash
pnpm exec playwright install chromium
```

## 배포 및 운영

- [Vercel 배포 가이드](docs/deployment.md)
- [운영 체크리스트](docs/operation-checklist.md)

Vercel에서는 Root Directory를 `apps/web`으로 설정하고 pnpm Workspace를 그대로 사용합니다. 세부 Build·Install 명령, 도메인 연결과 롤백 방법은 배포 가이드를 확인하세요.

## 폴더 구조

```text
.
├─ apps/
│  └─ web/               # Next.js 웹 애플리케이션
├─ packages/
│  ├─ ui/                # 공유 UI
│  ├─ utils/             # 공유 유틸리티
│  └─ types/             # 공유 타입
├─ docs/                 # 브랜드 및 프로젝트 정책
├─ public/               # 여러 앱에서 공유할 원본 정적 자산
├─ tests/
│  └─ e2e/               # Playwright 테스트
└─ .github/workflows/    # PR 검증 자동화
```

웹에서 직접 제공하는 정적 자산은 `apps/web/public`에 배치합니다.

## 개발 규칙

- `main`에 직접 기능을 쌓지 않고 작업 브랜치와 Pull Request를 사용합니다.
- App Router와 서버 컴포넌트를 기본으로 사용합니다.
- 모바일 우선으로 설계하고 접근성과 성능을 함께 검토합니다.
- 공유 가능한 코드와 타입은 `packages`로 분리합니다.
- 커밋 전 Husky와 lint-staged 검사를 통과해야 합니다.
- Pull Request는 Lint, Unit Test, E2E Test와 Build를 통과해야 합니다.
- 변경사항은 `CHANGELOG.md`에 기록합니다.
- 상세 정책은 `AGENTS.md`와 `docs`의 기준 문서를 따릅니다.
