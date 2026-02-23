"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from "@/lib/admin-actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(loginAction, { error: undefined });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl text-[var(--color-gold)] mb-2">
            Mudita Minerals
          </h1>
          <p className="text-[var(--color-muted)] text-sm">Admin Panel</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-[var(--color-bone)] mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full px-3 py-2 bg-[var(--color-charcoal)] border border-[var(--color-stone)] rounded text-[var(--color-bone)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
              placeholder="Enter admin password"
            />
          </div>

          {state?.error && (
            <p className="text-red-400 text-sm">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-[var(--color-gold)] text-[#0A0A0A] font-semibold rounded hover:bg-[var(--color-gold-light)] transition-colors disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
