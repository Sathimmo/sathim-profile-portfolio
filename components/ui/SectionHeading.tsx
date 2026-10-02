import { LucideIcon } from "lucide-react";

type SectionHeadingProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent">
        <Icon className="h-3.5 w-3.5" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm text-ink-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
