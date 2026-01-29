"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  Receipt,
  Zap,
  PiggyBank,
  BarChart3,
  Calculator,
} from "lucide-react";
import localization from "@/src/lib/localization.json";

const navItems = [
  {
    title: localization.nav.overview,
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: localization.nav.income,
    href: "/income",
    icon: TrendingUp,
  },
  {
    title: localization.nav.expenses,
    href: "/expenses",
    icon: Receipt,
  },
  {
    title: localization.nav.utilities,
    href: "/utilities",
    icon: Zap,
  },
  {
    title: localization.nav.savings,
    href: "/savings",
    icon: PiggyBank,
  },
  {
    title: localization.nav.analytics,
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: localization.nav.taxPlanner,
    href: "/tax-planner",
    icon: Calculator,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
