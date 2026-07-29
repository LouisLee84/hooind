export interface CalculatorCatalogItem {
  title: string;
  description: string;
  href: string;
  available: boolean;
}

export const calculatorCatalog: CalculatorCatalogItem[] = [
  {
    title: "퇴직금 계산기",
    description: "재직기간과 평균임금을 바탕으로 예상 퇴직금을 계산합니다.",
    href: "/calculators/retirement-pay",
    available: true,
  },
  {
    title: "연봉 실수령액 계산기",
    description: "4대보험과 예상 세금을 반영한 월 실수령액을 확인합니다.",
    href: "/calculators/salary",
    available: true,
  },
  {
    title: "주휴수당 계산기",
    description: "소정근로시간과 개근 여부로 예상 주휴수당을 계산합니다.",
    href: "/calculators/weekly-holiday-pay",
    available: true,
  },
];
