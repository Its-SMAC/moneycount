"use client";

interface Props {
  receitas: number;
  despesas: number;
}

export function SaldoDonut({ receitas, despesas }: Props) {
  const saldo = receitas - despesas;
  const total = receitas + despesas || 1;
  const raio = 80;
  const circunferencia = 2 * Math.PI * raio;
  const percentReceitas = receitas / total;
  const dashReceitas = percentReceitas * circunferencia;
  const dashDespesas = circunferencia - dashReceitas;

  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: 220, height: 220 }}>
        <svg width="220" height="220" viewBox="0 0 220 220">
          {/* Arco despesas */}
          <circle
            cx="110"
            cy="110"
            r={raio}
            fill="none"
            stroke="#ef4444"
            strokeWidth="12"
            strokeDasharray={`${dashDespesas} ${dashReceitas}`}
            strokeDashoffset={-dashReceitas}
            strokeLinecap="round"
            transform="rotate(-90 110 110)"
          />
          {/* Arco receitas */}
          <circle
            cx="110"
            cy="110"
            r={raio}
            fill="none"
            stroke="#22c55e"
            strokeWidth="12"
            strokeDasharray={`${dashReceitas} ${dashDespesas}`}
            strokeLinecap="round"
            transform="rotate(-90 110 110)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm text-muted-foreground">Saldo</span>
          <span
            className={`text-xl font-bold ${saldo >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {saldo >= 0 ? "+" : ""}
            {saldo.toFixed(2)}€
          </span>
        </div>
      </div>
    </div>
  );
}
