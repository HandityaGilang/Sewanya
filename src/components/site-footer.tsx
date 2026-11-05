import Link from "next/link";
import {
  ArrowRight,
  AtSign,
  Mail,
  MessageCircle,
  Share2,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { TahunBerjalan } from "@/components/tahun-berjalan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NAV_ITEMS, SITE } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-white text-ink">
      <div className="container-editorial grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-24">
        {/* BRAND & SOCIAL */}
        <div>
          <Logo className="text-xl" iconOnly />
          <p className="mt-6 text-sm leading-relaxed text-ink-soft">
            {SITE.tagline} Designed for life. Made to last.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#" className="text-ink-soft hover:text-brand">
              <AtSign className="size-5" />
            </a>
            <a href="#" className="text-ink-soft hover:text-brand">
              <Share2 className="size-5" />
            </a>
            <a href="#" className="text-ink-soft hover:text-brand">
              <MessageCircle className="size-5" />
            </a>
            <a href="#" className="text-ink-soft hover:text-brand">
              <Mail className="size-5" />
            </a>
          </div>
        </div>

        {/* SHOP LINKS */}
        <div>
          <h3 className="text-sm font-bold tracking-widest uppercase">Shop</h3>
          <ul className="mt-6 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-soft transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/katalog"
                className="text-sm text-ink-soft transition-colors hover:text-brand"
              >
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        {/* HELP LINKS */}
        <div>
          <h3 className="text-sm font-bold tracking-widest uppercase">Help</h3>
          <ul className="mt-6 flex flex-col gap-3 text-sm text-ink-soft">
            <li>
              <Link href="/syarat-ketentuan" className="hover:text-brand">
                Size Guide
              </Link>
            </li>
            <li>
              <Link href="/syarat-ketentuan" className="hover:text-brand">
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link href="/syarat-ketentuan" className="hover:text-brand">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="/fitting" className="hover:text-brand">
                FAQ
              </Link>
            </li>
            <li>
              <Link href={SITE.whatsappLink} className="hover:text-brand">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-sm font-bold tracking-widest uppercase">
            Newsletter
          </h3>
          <p className="mt-6 text-sm text-ink-soft">
            Be the first to know about new arrivals, offers and more.
          </p>
          <form className="mt-6 flex max-w-sm items-center border-b border-line pb-1">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-10 border-none bg-transparent px-0 text-sm focus-visible:ring-0"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-ink-soft hover:bg-transparent hover:text-brand"
            >
              <ArrowRight className="size-5" />
            </Button>
          </form>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-line-light py-8">
        <div className="container-editorial flex flex-col gap-6 text-[11px] font-medium tracking-wide text-ink-soft uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© <TahunBerjalan /> {SITE.nama}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/syarat-ketentuan" className="hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="/syarat-ketentuan" className="hover:text-ink">
              Terms & Conditions
            </Link>
            <Link href="/syarat-ketentuan" className="hover:text-ink">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
