import React from "react";
import localization from "@/src/lib/localization.json";
import { MobileNav } from "@/src/ui/Layout/mobileNav";
import { ThemeToggle } from "@/src/ui/shared/themeToggle";
import { SidebarNav } from "@/src/ui/Layout/sidebarNav";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-border bg-card lg:block">
        <div className="flex h-full flex-col">
          {/* Logo/Header */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <h1 className="text-xl font-bold text-foreground">
              {localization.app.name}
            </h1>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <SidebarNav />
          </div>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <p className="text-xs text-muted-foreground">
              {localization.app.tagline}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="flex items-center gap-4">
            <MobileNav />
            <h1 className="text-lg font-bold lg:hidden">
              {localization.app.name}
            </h1>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
