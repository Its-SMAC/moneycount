"use client";

import { PieChart, Pie, Cell } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface Props {
  receitas: number;
  despesas: number;
}

export function SaldoDonut({ receitas, despesas }: Props) {
  const saldo = receitas - despesas;
  const dados = [
    { name: "Receitas", value: receitas || 0.001 },
    { name: "Despesas", value: despesas || 0.001 },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: 220, height: 220 }}>
        <ChartContainer config={{}} className="w-full h-full">
          <PieChart width={220} height={220}>
            <Pie
              data={dados}
              cx={110}
              cy={110}
              innerRadius={70}
              outerRadius={100}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill="#22c55e" />
              <Cell fill="#ef4444" />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-sm text-muted-foreground">Saldo</span>
          <span className={`text-xl font-bold ${saldo > 0 ? "text-green-500" : saldo < 0 ? "text-red-500" : "text-foreground"}`}>
            {saldo > 0 ? "+" : saldo < 0 ? "-" : ""}{Math.abs(saldo).toFixed(2)}€
          </span>
        </div>
      </div>
    </div>
  );
}