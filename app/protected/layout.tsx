import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href="/protected">MoneyCount</Link>
              <Link
                href="/protected/transacoes"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Transações
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              {!hasEnvVars ? null : (
                <Suspense>
                  <AuthButton />
                </Suspense>
              )}
            </div>
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl w-full p-5">
          {children}
        </div>
      </div>
      <footer className="w-full flex items-center justify-center py-4 text-xs text-muted-foreground gap-2 border-t">
        Feito por{" "}
        <a
          href="https://github.com/Its-SMAC"
          target="_blank"
          className="flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/santiago.png"
            alt="Santiago Amador"
            width={20}
            height={20}
            className="rounded-full"
          />
          SMAC
        </a>
      </footer>
    </main>
  );
}
