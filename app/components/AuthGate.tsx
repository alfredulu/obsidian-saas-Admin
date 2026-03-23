"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

const PUBLIC_ROUTES = new Set(["/auth"]);

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isPublicRoute = PUBLIC_ROUTES.has(pathname);
  const shouldRedirectToAuth = !loading && !user && !isPublicRoute;
  const shouldRedirectToApp = !loading && !!user && pathname === "/auth";

  useEffect(() => {
    if (shouldRedirectToAuth) {
      router.replace("/auth");
      return;
    }

    if (shouldRedirectToApp) {
      router.replace("/");
    }
  }, [router, shouldRedirectToApp, shouldRedirectToAuth]);

  if (loading || shouldRedirectToAuth || shouldRedirectToApp) {
    return (
      <div className="flex min-h-screen items-center justify-center theme-bg px-6">
        <div className="panel-surface-soft border border-theme rounded-2xl px-6 py-4 text-center">
          <p className="text-sm font-semibold text-theme">Checking authentication…</p>
          <p className="mt-1 text-xs text-muted-theme">
            Please wait while we load your session.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
