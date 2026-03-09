import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { editarTransacao } from "../../actions";
export const dynamic = "force-dynamic";

async function FormularioEditar({ id }: { id: string }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: transacao } = await supabase
    .from("transacoes")
    .select("id, valor, descricao, tipo, data, categoria_id")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!transacao) redirect("/protected/transacoes");

  const { data: categorias } = await supabase
    .from("categorias")
    .select("id, nome")
    .or(`user_id.eq.${user.id},user_id.is.null`)
    .order("nome");

  return (
    <div className="max-w-md mx-auto flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center">Editar Transação</h1>

      <form action={editarTransacao} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={transacao.id} />

        <div className="flex flex-col gap-1 ">
          <label htmlFor="tipo">Tipo</label>
          <select
            className="rounded-sm p-2"
            name="tipo"
            id="tipo"
            defaultValue={transacao.tipo}
            required
          >
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="valor">Valor (€)</label>
          <input
            className="rounded-sm p-2"
            type="number"
            name="valor"
            id="valor"
            step="0.01"
            min="0"
            defaultValue={transacao.valor}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="categoria_id">Categoria</label>
          <select
            className="rounded-sm p-2"
            name="categoria_id"
            id="categoria_id"
            defaultValue={transacao.categoria_id}
            required
          >
            {categorias?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="descricao">Descrição</label>
          <input
            className="rounded-sm p-2"
            type="text"
            name="descricao"
            id="descricao"
            defaultValue={transacao.descricao ?? ""}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="data">Data</label>
          <input
            className="rounded-sm p-2"
            type="date"
            name="data"
            id="data"
            defaultValue={transacao.data}
            required
          />
        </div>

        <button
          className="bg-slate-700 mt-4 p-2 rounded-lg hover:bg-slate-600 transition-colors duration-200 text-2xl"
          type="submit"
        >
          Guardar
        </button>
        <Link
          href="/protected/transacoes"
          className="text-center text-base text-muted-foreground hover:underline hover:text-red-500 transition-colors duration-500"
        >
          Voltar
        </Link>
      </form>
    </div>
  );
}

export default async function EditarTransacaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<p>A carregar...</p>}>
      <FormularioEditar id={id} />
    </Suspense>
  );
}
