import { OperationalPageLayout } from "@/components/operational-page-layout";
import { createPageMetadata } from "@/config/site";
import type { Metadata } from "next";

const title = "이용약관 및 면책 | Hooind";
const description =
  "Hooind 계산기와 정보 서비스 이용 조건 및 참고용 계산 결과에 관한 면책 사항을 안내합니다.";
const updatedAt = "2026년 7월 29일";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/terms",
});

const sections = [
  {
    title: "1. 서비스 목적",
    content:
      "Hooind는 설치 없이 사용할 수 있는 계산기와 생활형 웹 도구를 제공해 이용자가 일반적인 정보를 간편하게 확인하도록 돕습니다.",
  },
  {
    title: "2. 무료 정보 제공",
    content:
      "현재 제공되는 계산기와 안내 콘텐츠는 별도 고지가 없는 한 무료로 이용할 수 있습니다. 서비스 운영 방식과 제공 범위는 향후 변경될 수 있습니다.",
  },
  {
    title: "3. 계산 결과의 성격",
    content:
      "모든 계산 결과는 이용자가 입력한 값과 공개된 간편 산식을 바탕으로 한 참고용 예상값입니다. 실제 지급액, 세금, 보험료와 법적 판단은 계약 조건, 적용 시점, 기관 해석과 개별 사정에 따라 달라질 수 있습니다.",
  },
  {
    title: "4. 전문 자문이 아님",
    content:
      "Hooind의 콘텐츠는 법률·세무·노무·재무 자문이나 행정기관의 공식 판단을 대신하지 않습니다. 중요한 의사결정 전에는 관련 기관 또는 자격 있는 전문가에게 확인해야 합니다.",
  },
  {
    title: "5. 사용자 입력 책임",
    content:
      "계산 결과의 정확성은 입력값에 영향을 받습니다. 이용자는 날짜, 금액, 근로시간과 가족 정보 등을 사실에 맞게 입력하고 결과를 별도로 확인할 책임이 있습니다.",
  },
  {
    title: "6. 서비스 변경과 중단",
    content:
      "기능 개선, 유지보수, 보안, 외부 서비스 장애 또는 운영상 필요에 따라 서비스 일부가 변경되거나 일시적으로 중단될 수 있습니다.",
  },
  {
    title: "7. 외부 링크",
    content:
      "서비스는 법령, 행정기관 또는 외부 제공자의 페이지로 연결될 수 있습니다. 외부 사이트의 내용, 이용 가능 여부와 개인정보 처리에는 해당 운영자의 정책이 적용됩니다.",
  },
  {
    title: "8. 책임 제한",
    content:
      "Hooind는 합리적인 범위에서 정확하고 안정적인 서비스를 제공하기 위해 노력하지만 모든 결과의 완전성, 최신성 또는 특정 목적 적합성을 보장하지 않습니다. 관련 법령이 허용하는 범위에서 참고 결과만을 근거로 한 결정이나 손실에 대한 책임은 제한될 수 있습니다.",
  },
  {
    title: "9. 약관 변경",
    content:
      "서비스 범위 또는 운영 방식이 바뀌면 이 약관과 최종 수정일을 갱신합니다. 이용자는 중요한 결정 전에 최신 내용을 확인해야 합니다.",
  },
];

export default function TermsPage() {
  return (
    <OperationalPageLayout
      description={description}
      title="이용약관 및 면책"
      updatedAt={updatedAt}
    >
      <p className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
        계산 결과는 참고용 예상값이며 전문 자문이나 공식 확인을 대신하지
        않습니다.
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
