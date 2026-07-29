import { OperationalPageLayout } from "@/components/operational-page-layout";
import { createPageMetadata, siteConfig } from "@/config/site";
import type { Metadata } from "next";

const title = "문의 | Hooind";
const description =
  "Hooind 서비스와 계산기 오류를 제보하거나 운영 관련 문의를 보내는 방법을 안내합니다.";
const updatedAt = "2026년 7월 29일";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <OperationalPageLayout
      description={description}
      title="문의"
      updatedAt={updatedAt}
    >
      <section>
        <h2 className="text-xl font-bold text-slate-950">운영 정보</h2>
        <dl className="mt-4 grid gap-3 rounded-2xl bg-slate-50 p-5 sm:grid-cols-[140px_1fr]">
          <dt className="font-semibold text-slate-900">서비스</dt>
          <dd>{siteConfig.name}</dd>
          <dt className="font-semibold text-slate-900">운영 표시명</dt>
          <dd>{siteConfig.operatorName}</dd>
          <dt className="font-semibold text-slate-900">문의 이메일</dt>
          <dd>
            {siteConfig.contactEmail ? (
              <a
                className="rounded-md font-semibold text-blue-700 underline underline-offset-4 outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
                href={`mailto:${siteConfig.contactEmail}`}
              >
                {siteConfig.contactEmail}
              </a>
            ) : (
              "문의 이메일 설정이 필요합니다. 운영 준비가 완료되면 이곳에 공개 연락처를 안내합니다."
            )}
          </dd>
        </dl>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-950">
          문의에 포함하면 좋은 정보
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>문제가 발생한 계산기 이름과 페이지 주소</li>
          <li>입력한 값과 예상한 결과</li>
          <li>표시된 결과 또는 오류 메시지</li>
          <li>사용한 기기, 운영체제와 브라우저 종류</li>
          <li>문제를 재현할 수 있는 순서</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-950">버그 제보</h2>
        <p className="mt-3">
          개인정보, 계정 정보 또는 민감한 계약 자료는 보내지 말고 재현에 필요한
          최소한의 정보만 전달해 주세요.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-950">계산 결과 문의</h2>
        <p className="mt-3">
          Hooind는 개별 법률·세무·노무·재무 판단을 제공하지 않습니다. 실제
          지급액이나 신고·계약 관련 판단은 담당 기관 또는 전문가에게 확인해
          주세요.
        </p>
      </section>

      <p className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
        문의 내용을 확인하더라도 개별 답변이나 답변 시점이 보장되지는 않습니다.
      </p>
    </OperationalPageLayout>
  );
}
