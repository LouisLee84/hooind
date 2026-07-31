# Changelog

이 프로젝트의 주요 변경사항을 기록합니다.

형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/)를 따르며 버전은 [Semantic Versioning](https://semver.org/lang/ko/)을 기준으로 관리합니다.

## [Unreleased]

### Added

- 네이버 서치어드바이저 사이트 소유권 확인 메타 태그
- 계산기 페이지에서 재사용할 수 있는 Production 전용 반응형 AdSense 배너 컴포넌트
- 중앙 사이트 설정과 환경변수 기반 운영 URL·문의 정보 관리
- 루트 메타데이터, sitemap, robots와 Search Console 인증 기반
- 개인정보처리방침, 이용약관·면책, 문의 페이지
- 전역 운영 Footer와 사용자 정의 404·오류 화면
- 환경변수 기반 GA4·AdSense 조건부 스크립트 로딩 기반
- Vercel 배포 가이드와 운영 체크리스트
- 홈 계산기 탐색 영역과 `/calculators` 계산기 목록 페이지
- 주휴수당 지급 예상 여부, 주급과 월 환산 참고 금액을 제공하는 주휴수당 계산기 MVP
- 주휴수당 계산 단위 테스트, 탐색·계산·모바일 Playwright 테스트
- 주휴수당 계산기 SEO 메타데이터와 FAQ·WebApplication 구조화 데이터
- 연봉 실수령액 계산기 MVP와 2026년 보험료·간이 소득세 계산 로직
- 연봉 계산기 SEO 메타데이터, FAQ·WebApplication 구조화 데이터
- 상단·본문·하단 고정 높이 광고 영역
- 계산기 공통 UI 컴포넌트와 연봉 계산 단위·브라우저 테스트
- 첫 번째 수익형 콘텐츠인 퇴직금 계산기 MVP
- 퇴직금 계산 공통 유틸리티와 단위·브라우저 테스트
- pnpm Workspace 기반 개발 환경
- Husky와 lint-staged 커밋 전 검사
- Vitest 단위 테스트 환경
- Playwright 브라우저 테스트 환경
- Pull Request용 GitHub Actions 품질 검사
- 공유 UI, 유틸리티와 타입 패키지 기본 구조

### Changed

- 연봉 실수령액·주휴수당 계산기에 기본 `full` 공용 AdSense 레이아웃 정책 적용
- 신규 계산기·도구에 `full`, `compact`, `tool`, `none` 공용 AdSense 레이아웃 정책을 기본 적용
- 퇴직금 계산기에 실제 AdSense Slot ID를 연결하고 제목·결과·FAQ 전 광고 높이를 반응형으로 예약
- 계산기 canonical, OpenGraph와 JSON-LD URL을 중앙 사이트 설정으로 통합
- 계산기 상세 페이지 헤더에 전체 계산기 목록 탐색 링크 추가
- 퇴직금 계산기를 공통 입력, 결과, 레이아웃, FAQ 컴포넌트로 리팩터링
- 모든 Pull Request에서 GitHub Actions 품질 검사가 실행되도록 워크플로우 확장
