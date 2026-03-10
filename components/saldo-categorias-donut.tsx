interface CategoriaData {
  nome: string;
  valor: number;
}

interface Props {
  dados: CategoriaData[];
}

const CORES = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

export function DespesasPorCategoria({ dados }: Props) {
  if (!dados || dados.length === 0) return null;

  const total = dados.reduce((acc, d) => acc + d.valor, 0);
  const raio = 75;
  const circunferencia = 2 * Math.PI * raio;
  const cx = 110;
  const cy = 110;

  let offsetAcumulado = 0;

  const arcos = dados.map((d, i) => {
    const percentagem = d.valor / total;
    const dash = percentagem * circunferencia;
    const offset = -offsetAcumulado;
    offsetAcumulado += dash;

    return (
      <circle
        key={d.nome}
        cx={cx}
        cy={cy}
        r={raio}
        fill="none"
        stroke={CORES[i % CORES.length]}
        strokeWidth="16"
        strokeDasharray={`${dash} ${circunferencia - dash}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 110 110)"
      />
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Despesas por categoria</h2>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative" style={{ width: 220, height: 220 }}>
          <svg width="220" height="220" viewBox="0 0 220 220">
            {arcos}
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          {dados.map((d, i) => (
            <div key={d.nome} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: CORES[i % CORES.length] }}
              />
              <span className="text-muted-foreground">{d.nome}</span>
              <span className="font-medium ml-auto pl-4">
                {d.valor.toFixed(2)}€
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
