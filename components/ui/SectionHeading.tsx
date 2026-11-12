import { LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

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
      <Reveal direction="right" delay={0}>
        <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent">
          <Icon className="h-3.5 w-3.5 animate-float" />
          <span>{eyebrow}</span>
          <span className="ml-1 h-px w-10 bg-gradient-to-r from-accent to-transparent" />
        </div>
      </Reveal>

      <Reveal direction="up" delay={90}>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal direction="up" delay={180}>
          <p className="mt-3 max-w-2xl text-sm text-ink-muted sm:text-base">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
