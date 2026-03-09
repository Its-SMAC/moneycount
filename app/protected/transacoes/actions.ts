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

export async function apagarTransacao(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("auth/login");

  const id = formData.get("id") as string;

  await supabase
    .from("transacoes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  redirect("/protected/transacoes");
}

export async function editarTransacao(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("auth/login");

  const id = formData.get("id") as string;

  const { error } = await supabase
    .from("transacoes")
    .update({
      valor: Number(formData.get("valor")),
      descricao: formData.get("descricao") as string,
      tipo: formData.get("tipo") as string,
      data: formData.get("data") as string,
      categoria_id: formData.get("categoria_id") as string,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  redirect("/protected/transacoes");
}
