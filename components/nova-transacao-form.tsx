"use client";

import { useActionState } from "react";
import { criarTransacao } from "@/app/protected/transacoes/actions";

export function NovaTransacaoForm({
  categorias,
}: {
  categorias: { id: string; nome: string }[];
}) {
  const [state, formAction] = useActionState(criarTransacao, null);

  return (
    <div className="max-w-md mx-auto flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center">Nova Transação</h1>

      {state?.erro && <p className="text-red-500 text-sm">{state.erro}</p>}

      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="tipo">Tipo</label>
          <select className="rounded-sm p-2" name="tipo" id="tipo" required>
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
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="categoria_id">Categoria</label>
          <select
            className="rounded-sm p-2"
            name="categoria_id"
            id="categoria_id"
            required
          >
            {categorias.map((cat) => (
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
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="data">Data</label>
          <input
            className="rounded-sm p-2"
            type="date"
            name="data"
            id="data"
            required
          />
        </div>

        <button
          className="bg-slate-700 mt-4 p-2 rounded-lg hover:bg-slate-600 transition-colors duration-200 text-2xl"
          type="submit"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
