# Hooind

Hooind는 게임, 계산기, 테스트, 생성기 등 사용자가 브라우저에서 바로 이용할 수 있는 인터랙티브 콘텐츠를 만드는 웹 서비스 프로젝트입니다. Project PlayAds라는 내부 제작 체계를 통해 콘텐츠를 빠르고 일관되게 개발하고, Hooind Interactive 브랜드로 제공합니다.

## 목표

검색 유입, 반복 사용, 광고 수익을 기반으로 지속 가능한 수익형 웹 서비스를 구축하는 것이 목표입니다. 단일 콘텐츠 제작에 그치지 않고 공통 UI, 기능, 분석 및 광고 구조를 재사용할 수 있는 생산 체계를 만듭니다.

## 기술 스택

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint 9
- Prettier 3
- npm Workspaces
- GitHub Actions

## 프로젝트 구조

```text
.
├─ apps/
│  └─ web/                 # Next.js 웹 애플리케이션
├─ packages/               # 공통 UI 및 공유 모듈
├─ public/                 # 프로젝트 공용 원본 정적 자산
├─ docs/                   # 브랜드 및 개발 정책 문서
├─ .github/
│  └─ workflows/           # CI 워크플로우
├─ README.md
├─ LICENSE
└─ .gitignore
```

웹에서 직접 제공할 정적 자산은 `apps/web/public`에 배치합니다. 루트 `public`은 여러 앱에서 공유할 원본 자산을 관리하기 위한 공간입니다.

## 실행 방법

Node.js 20.9 이상과 npm이 필요합니다.

```bash
npm install
npm run dev
```

개발 서버가 시작되면 브라우저에서 `http://localhost:3000`을 엽니다.

품질 확인 명령은 다음과 같습니다.

```bash
npm run format:check
npm run lint
npm run build
```

## 향후 개발 예정 기능

- 인터랙티브 콘텐츠 공통 레이아웃과 디자인 시스템
- 게임·계산기·테스트·생성기용 재사용 템플릿
- 광고 슬롯 및 레이아웃 이동 방지 구조
- SEO 메타데이터와 구조화 데이터 자동화
- 관련 콘텐츠 추천과 탐색 기능
- 방문 및 콘텐츠 이용 성과 분석
- WordPress 연동 및 배포 방식
- 향후 AI 기반 인터랙티브 기능

자세한 브랜드 방향과 개발 원칙은 `docs` 디렉터리의 문서를 참고합니다.
