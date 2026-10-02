import { footer } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-ink-faint sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 text-[11px] font-semibold text-accent">
            {footer.initials}
          </span>
          <span>{footer.credit}</span>
        </div>
        <span className="font-mono">{footer.stack}</span>
      </div>
    </footer>
  );
}
