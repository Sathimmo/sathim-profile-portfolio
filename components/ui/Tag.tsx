type TagProps = {
  children: React.ReactNode;
  variant?: "outline" | "muted" | "solid";
};

export default function Tag({ children, variant = "outline" }: TagProps) {
  if (variant === "solid") {
    return (
      <span className="inline-flex items-center rounded-md bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent transition-transform duration-300 ease-spring hover:scale-105">
        {children}
      </span>
    );
  }

  if (variant === "muted") {
    return (
      <span className="group/muted inline-flex items-center gap-1.5 text-xs text-ink-faint transition-colors duration-300 hover:text-ink-muted">
        <span className="h-1 w-1 rounded-full bg-ink-faint transition-all duration-300 group-hover/muted:w-2.5 group-hover/muted:bg-accent" />
        {children}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-md border border-border px-2.5 py-1 text-xs font-medium text-accent-muted transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/10 hover:shadow-[0_6px_18px_-8px_rgba(52,211,153,0.9)]">
      {children}
    </span>
  );
}
