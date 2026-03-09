"use client";

import dynamic from "next/dynamic";

const SaldoDonut = dynamic(
  () => import("@/components/saldo-donut").then((m) => m.SaldoDonut),
  {
    ssr: false,
    loading: () => (
      <div style={{ width: 220, height: 220 }} className="mx-auto" />
    ),
  },
);

export function SaldoDonutWrapper({
  receitas,
  despesas,
}: {
  receitas: number;
  despesas: number;
}) {
  return <SaldoDonut receitas={receitas} despesas={despesas} />;
}
