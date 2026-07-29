import { OperationalPageLayout } from "@/components/operational-page-layout";
import { createPageMetadata, siteConfig } from "@/config/site";
import type { Metadata } from "next";

const title = "개인정보처리방침 | Hooind";
const description =
  "Hooind의 현재 정보 처리 방식과 향후 분석·광고 서비스 사용 가능성을 안내합니다.";
const updatedAt = "2026년 7월 29일";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/privacy",
});

const sections = [
  {
    title: "1. 수집하는 정보",
    content:
      "현재 Hooind 계산기는 회원가입, 로그인, 문의 양식 또는 계산값 저장 기능을 제공하지 않으며 이용자가 계산기에 입력한 값을 서버로 직접 전송하거나 계정 정보와 결합해 수집하도록 설계되어 있지 않습니다.",
  },
  {
    title: "2. 자동 수집 정보와 접속 로그",
    content:
      "서비스 제공 과정에서 호스팅 사업자 또는 네트워크 시스템이 IP 주소, 브라우저 종류, 접속 시각, 요청 URL, 오류 기록 같은 기술 정보를 자동으로 처리할 수 있습니다. 이는 보안, 장애 대응과 서비스 품질 유지를 위해 사용될 수 있습니다.",
  },
  {
    title: "3. 쿠키와 분석 도구",
    content:
      "현재 분석 ID가 설정되지 않으면 별도 분석 스크립트를 불러오지 않습니다. 향후 Google Analytics 4 등 분석 도구를 활성화하는 경우 방문 통계와 이용 흐름 측정을 위해 쿠키 또는 유사 기술이 사용될 수 있으며, 적용 범위는 실제 설정과 해당 제공자의 정책에 따릅니다.",
  },
  {
    title: "4. 광고 서비스",
    content:
      "현재 페이지에는 광고 공간만 마련되어 있으며 광고 클라이언트 ID가 설정되지 않으면 AdSense 스크립트를 불러오지 않습니다. 향후 광고가 활성화되면 Google 등 광고 제공자가 광고 제공과 측정을 위해 쿠키 또는 기기 정보를 사용할 수 있습니다.",
  },
  {
    title: "5. 정보 이용 목적",
    content:
      "처리되는 정보는 서비스 제공, 접속 통계 확인, 오류 분석, 보안 유지, 콘텐츠 개선과 광고 성과 측정 등의 목적으로 사용될 수 있습니다. Hooind는 실제로 활성화된 기능의 범위를 넘어 개인정보를 수집한다고 단정하지 않습니다.",
  },
  {
    title: "6. 보관과 파기",
    content:
      "Hooind가 별도로 개인정보를 보관하는 기능은 현재 없습니다. 호스팅·분석·광고 제공자가 처리하는 정보의 보관 기간과 삭제 방식은 각 제공자의 설정 및 정책에 따를 수 있습니다.",
  },
  {
    title: "7. 외부 서비스 제공자",
    content:
      "서비스 운영에는 Vercel 등 호스팅 사업자와, 설정 시 Google Analytics 또는 Google AdSense 같은 외부 서비스가 사용될 수 있습니다. 각 서비스는 자체 개인정보처리방침에 따라 정보를 처리할 수 있습니다.",
  },
  {
    title: "8. 이용자의 권리",
    content:
      "이용자는 브라우저 설정에서 쿠키 저장을 제한하거나 삭제할 수 있습니다. 개인정보 처리와 관련한 확인 또는 요청은 아래 문의 방법을 이용할 수 있으며, 외부 제공자가 보유한 정보는 해당 제공자의 절차가 적용될 수 있습니다.",
  },
  {
    title: "9. 문의 방법",
    content: siteConfig.contactEmail
      ? `개인정보 관련 문의는 ${siteConfig.contactEmail}로 보내 주세요.`
      : "현재 공개 문의 이메일이 설정되지 않았습니다. 문의 채널이 준비되면 이 방침과 문의 페이지에 안내하겠습니다.",
  },
  {
    title: "10. 변경 고지",
    content:
      "서비스 기능이나 외부 도구 사용 방식이 변경되면 이 페이지의 내용과 최종 수정일을 갱신합니다. 중요한 변경은 서비스 내 적절한 방법으로 안내할 수 있습니다.",
  },
];

export default function PrivacyPage() {
  return (
    <OperationalPageLayout
      description={description}
      title="개인정보처리방침"
      updatedAt={updatedAt}
    >
      <p className="rounded-2xl bg-blue-50 p-5 text-sm leading-7 text-blue-950">
        이 문서는 현재 서비스 구조를 설명하기 위한 운영 안내이며 법률 자문을
        대신하지 않습니다.
      </p>
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-xl font-bold text-slate-950">{section.title}</h2>
          <p className="mt-3">{section.content}</p>
        </section>
      ))}
    </OperationalPageLayout>
  );
}
