import { NovaTransacaoForm } from "@/components/nova-transacao-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function FormularioComDados() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: categorias } = await supabase
    .from("categorias")
    .select("id, nome")
    .or(`user_id.eq.${user.id},user_id.is.null`)
    .order("nome");

  return <NovaTransacaoForm categorias={categorias ?? []} />;
}

export default function NovaTransacaoPage() {
  return (
    <Suspense fallback={<p>A carregar...</p>}>
      <FormularioComDados />
    </Suspense>
  );
}
