import { footer } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <Reveal
        direction="up"
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-ink-faint sm:flex-row"
      >
        <div className="group flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 text-[11px] font-semibold text-accent transition-all duration-500 ease-spring group-hover:scale-110 group-hover:bg-accent group-hover:text-canvas">
            {footer.initials}
          </span>
          <span className="transition-colors duration-300 group-hover:text-ink-muted">
            {footer.credit}
          </span>
        </div>
        <span className="font-mono underline-sweep">{footer.stack}</span>
      </Reveal>
    </footer>
  );
}
