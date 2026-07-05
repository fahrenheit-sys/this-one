export default function KioskFooter() {
  return (
    <footer className="border-t border-black/5 bg-brand-light">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright © ThisOne.ai {new Date().getFullYear()}</p>
        <div className="flex gap-6">
          <a href="#" className="transition hover:text-brand-dark">
            Privacy Policy
          </a>
          <a href="#" className="transition hover:text-brand-dark">
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
