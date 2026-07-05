import Link from "next/link";
import { IconSupport } from "@/components/icons/DemoIcons";

export default function KioskHeader() {
  return (
    <header className="border-b border-black/5 bg-brand-light">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-brand-dark">
          ThisOne<span className="text-brand">.ai</span>
        </Link>

        <Link
          href="/contact-us"
          className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand"
        >
          <IconSupport className="h-4 w-4" />
          Support
        </Link>
      </div>
    </header>
  );
}
