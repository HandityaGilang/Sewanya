"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur">
      <div className="container-editorial relative flex h-16 items-center justify-between sm:h-20 lg:h-24">
        {/* MOBILE MENU TRIGGER */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Buka menu navigasi"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <SheetHeader className="mb-8 border-b border-line pb-4">
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Navigasi seluler">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href} className="border-b border-line-light">
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center py-4 text-sm font-semibold tracking-wider uppercase transition-colors",
                            active ? "text-brand" : "text-ink",
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        {/* DESKTOP LEFT NAV */}
        <nav aria-label="Navigasi utama" className="hidden lg:block lg:flex-1">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.slice(0, 4).map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors hover:text-brand",
                      active ? "text-brand" : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CENTER LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo className="text-xl sm:text-2xl lg:text-3xl" />
        </div>

        {/* RIGHT UTILITIES */}
        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Search className="size-[18px]" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <User className="size-[18px]" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="size-[18px]" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="size-[18px]" />
            <span className="absolute top-1.5 right-1.5 flex size-3.5 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-white">
              0
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
