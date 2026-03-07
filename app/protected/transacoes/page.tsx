import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

async function ListaTransacoes() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("auth/login");

  const { data: transacoes } = await supabase
    .from("transacoes")
    .select("id, valor, descricao, tipo, data, categorias(nome)")
    .eq("user_id", user.id)
    .order("data", { ascending: false });

  return (
    <div className="flex flex-col gap-4">
      {transacoes?.length === 0 && (
        <p className="text-center text-muted-foreground">
          Ainda não existe transações
        </p>
      )}
      {transacoes?.map((t) => (
        <div
          key={t.id}
          className="flex justify-between items-center p-4 rounded-lg border"
        >
          <div className="flex flex-col">
            <span className="font-medium">
              {t.descricao || "Sem descrição"}
            </span>
            <span className="text-sm text-muted-foreground">
              {t.categorias?.nome} ·{" "}
              {new Date(t.data).toLocaleDateString("pt-PT")}
            </span>
          </div>
          <span
            className={
              t.tipo === "receita"
                ? "text-green-700 font-bold"
                : "text-red-800 font-bold"
            }
          >
            {t.tipo === "receita" ? "+" : "-"}
            {Number(t.valor).toFixed(2)}€
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TransacoesPage() {
  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Transações</h1>
        <Link
          href="/protected/transacoes/nova"
          className="bg-slate-700 px-2 py-2 m-2 rounded-lg hover:bg-slate-600 transition-colors duration-200"
        >
          + Nova
        </Link>
      </div>
      <Suspense fallback={<p>A carregar...</p>}>
        <ListaTransacoes />
      </Suspense>
    </div>
  );
}
