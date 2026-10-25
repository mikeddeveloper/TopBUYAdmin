"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setLoading(false);
      setError(
        signInError.message === "Invalid login credentials"
          ? "Wrong email or password."
          : signInError.message
      );
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-soft">Email address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@topbuy.ng"
          className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/25"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-soft">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••••"
          className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand/25"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-wash px-3.5 py-2.5 text-sm text-red">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-brand py-2.5 text-sm font-medium text-white hover:bg-brand-deep disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
