"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/src/ui/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/src/ui/ui/sheet";
import localization from "@/src/lib/localization.json";
import { SidebarNav } from "@/src/ui/Navigation/sidebarNav";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-border px-6">
            <h1 className="text-xl font-bold">{localization.app.name}</h1>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <SidebarNav />
          </div>
          <div className="border-t border-border p-4">
            <p className="text-xs text-muted-foreground">
              {localization.app.tagline}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
