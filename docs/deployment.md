# Vercel 배포 가이드

이 문서는 Hooind 모노레포의 `apps/web` Next.js 애플리케이션을 Vercel에 배포하는 기준을 정리합니다.

## 1. 프로젝트 생성과 저장소 연결

1. Vercel에서 **Add New → Project**를 선택합니다.
2. GitHub의 `LouisLee84/hooind` 저장소를 연결합니다.
3. Production Branch는 `main`으로 설정합니다.
4. Framework Preset이 **Next.js**로 감지되는지 확인합니다.

## 2. 모노레포 설정

Vercel Project Settings에서 다음 값을 사용합니다.

| 항목 | 값 |
|---|---|
| Root Directory | `apps/web` |
| Install Command | `pnpm install --frozen-lockfile` |
| Build Command | `pnpm build` |
| Output Directory | Next.js 기본값 사용, 별도 지정하지 않음 |
| Node.js | 24.x 권장, 최소 20.9 이상 |
| Package Manager | 루트 `packageManager`의 pnpm 11.17.0 |

Vercel의 Root Directory와 프레임워크 자동 감지로 충분하므로 현재 `vercel.json`은 추가하지 않습니다. 설정을 코드로 강제해야 할 실제 요구가 생길 때만 최소 범위로 도입합니다.

## 3. 환경변수

Preview와 Production 환경에 필요한 공개 설정을 각각 등록합니다.

| 변수 | 용도 | 필수 여부 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical, OpenGraph, sitemap, robots 기준 URL | Production 권장 |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 공개 문의 이메일 | 공개 전 권장 |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement ID | 선택 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console HTML 메타 태그 인증값 | 선택 |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | AdSense 클라이언트 ID | 선택 |

`NEXT_PUBLIC_` 값은 빌드 결과에 포함되어 브라우저에 공개됩니다. 비밀키나 관리자 자격증명에는 이 접두사를 사용하지 않습니다. 변수가 없더라도 빌드는 성공하며 관련 스크립트나 메타 태그만 생략됩니다.

Preview 배포에서 운영 canonical을 노출하지 않으려면 `NEXT_PUBLIC_SITE_URL`을 실제로 검색 노출할 대표 도메인으로 명시하고 Preview URL은 외부 색인 대상으로 사용하지 않습니다.

## 4. 운영 도메인

1. Vercel Domains에서 `hooind.com`을 연결합니다.
2. DNS 검증과 SSL 인증서 발급을 확인합니다.
3. canonical 기준은 비-www `https://hooind.com`입니다.
4. `www.hooind.com`도 사용할 경우 Vercel에서 비-www 주소로 영구 리디렉션합니다.
5. `NEXT_PUBLIC_SITE_URL=https://hooind.com`을 Production 환경에 등록합니다.

## 5. 배포 후 점검

- `/`, `/calculators`와 계산기 3종이 200 응답인지 확인
- `/privacy`, `/terms`, `/contact` 접근 확인
- `/sitemap.xml`의 모든 URL이 운영 도메인인지 확인
- `/robots.txt`가 전체 크롤링 허용과 sitemap 주소를 제공하는지 확인
- canonical, OpenGraph와 구조화 데이터 확인
- 존재하지 않는 경로가 사용자 정의 404와 404 상태를 반환하는지 확인
- GA4를 설정한 경우 Realtime 보고서 확인
- AdSense를 설정한 경우 브라우저 콘솔과 정책 상태 확인
- 모바일 390px와 데스크톱에서 가로 넘침 및 CLS 확인

전체 절차는 [운영 체크리스트](./operation-checklist.md)를 함께 사용합니다.

## 6. 롤백

운영 장애가 확인되면 Vercel Deployments에서 마지막 정상 Production 배포를 선택해 **Instant Rollback**을 수행합니다. CLI를 사용하는 경우 연결된 프로젝트에서 `vercel rollback`을 사용할 수 있습니다.

롤백 후에는 다음을 확인합니다.

1. 운영 도메인이 정상 배포를 가리키는지 확인
2. 주요 경로와 계산 흐름 재검증
3. 오류 로그와 변경 커밋 확인
4. 수정 사항을 Preview에서 검증
5. 정상 배포를 다시 Production으로 승격

롤백한 빌드에는 당시 환경변수와 코드가 사용될 수 있으므로 현재 설정과 차이가 없는지 확인합니다.
