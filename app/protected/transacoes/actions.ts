"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function criarTransacao(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { error } = await supabase.from("transacoes").insert({
    user_id: user.id,
    valor: Number(formData.get("valor")),
    descricao: formData.get("descricao") as string,
    tipo: formData.get("tipo") as string,
    data: formData.get("data") as string,
    categoria_id: formData.get("categoria_id") as string,
  });

  if (error) return { erro: error.message };

  redirect("/protected/transacoes");
}
