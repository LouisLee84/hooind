import { siteConfig } from "@/config/site";
import Link from "next/link";

const footerLinks = [
  { href: "/calculators", label: "계산기 목록" },
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/terms", label: "이용약관·면책" },
  { href: "/contact", label: "문의" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <nav aria-label="운영 정보">
          <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  className="rounded-md font-medium text-slate-600 outline-none hover:text-blue-700 focus-visible:ring-4 focus-visible:ring-blue-200"
                  href={href}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 space-y-2 text-xs leading-6 text-slate-500">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. by{" "}
            {siteConfig.operatorName}
          </p>
          <p>
            계산 결과는 참고용 예상값이며 실제 계약과 적용 기준에 따라 달라질 수
            있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
