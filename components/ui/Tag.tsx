type TagProps = {
  children: React.ReactNode;
  variant?: "outline" | "muted" | "solid";
};

export default function Tag({ children, variant = "outline" }: TagProps) {
  if (variant === "solid") {
    return (
      <span className="inline-flex items-center rounded-md bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">
        {children}
      </span>
    );
  }

  if (variant === "muted") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-ink-faint">
        <span className="h-1 w-1 rounded-full bg-ink-faint" />
        {children}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-md border border-border px-2.5 py-1 text-xs font-medium text-accent-muted">
      {children}
    </span>
  );
}
