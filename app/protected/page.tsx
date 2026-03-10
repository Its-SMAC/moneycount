import { SaldoDonutWrapper } from "@/components/saldo-donut-wrapper";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const agora = new Date();
  const primeiroDiaMes = new Date(agora.getFullYear(), agora.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const ultimoDiaMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  const { data: transacoes } = await supabase
    .from("transacoes")
    .select("id, valor, descricao, tipo, data, categorias(nome)")
    .eq("user_id", user.id)
    .gte("data", primeiroDiaMes)
    .lte("data", ultimoDiaMes)
    .order("data", { ascending: false });

  const receitas =
    transacoes
      ?.filter((t) => t.tipo === "receita")
      .reduce((acc, t) => acc + Number(t.valor), 0) ?? 0;
  const despesas =
    transacoes
      ?.filter((t) => t.tipo === "despesa")
      .reduce((acc, t) => acc + Number(t.valor), 0) ?? 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Dashboard </h1>
        <span className="text-sm text-muted-foreground m-2">
          {agora.toLocaleString("pt-PT", { month: "long", year: "numeric" })}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <SaldoDonutWrapper receitas={receitas} despesas={despesas} />
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-1 p-4 rounded-lg border">
            <span className="text-sm text-muted-foreground">Receitas</span>
            <span className="text-2xl font-bold text-green-500">
              {receitas > 0 ? "+" : ""}
              {receitas.toFixed(2)}€
            </span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-lg border">
            <span className="text-sm text-muted-foreground">Despesas</span>
            <span className="text-2xl font-bold text-red-500">
              {despesas > 0 ? "-" : ""}
              {despesas.toFixed(2)}€
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Transações do mês</h2>
          <Link
            href="/protected/transacoes"
            className="text-sm text-muted-foreground hover:underline"
          >
            Ver todas
          </Link>
        </div>

        {transacoes?.length === 0 && (
          <p className="text-center text-muted-foreground">
            Sem transações este mês.
          </p>
          <Link
            href="/protected/transacoes"
            className="text-sm text-muted-foreground hover:underline"
          >
            Adicionar transação
          </Link>
        )}

        {transacoes?.slice(0, 5).map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center p-4 rounded-lg border"
          >
            <div className="flex flex-col">
              <span className="font-medium">
                {t.descricao || "Sem descrição"}
              </span>
              <span className="text-sm text-muted-foreground">
                {(t.categorias as unknown as { nome: string } | null)?.nome} ·{" "}
                {new Date(t.data).toLocaleDateString("pt-PT")}
              </span>
            </div>
            <span
              className={
                t.tipo === "receita"
                  ? "text-green-500 font-bold"
                  : "text-red-500 font-bold"
              }
            >
              {t.tipo === "receita" ? "+" : "-"}
              {Number(t.valor).toFixed(2)}€
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProtectedPage() {
  return (
    <Suspense fallback={<p>A carregar...</p>}>
      <Dashboard />
    </Suspense>
  );
}
