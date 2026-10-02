import { Server, Monitor, Smartphone, BrainCircuit, Sparkles } from "lucide-react";
import { skillGroups, SkillGroup } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

const icons: Record<SkillGroup["icon"], typeof Server> = {
  server: Server,
  monitor: Monitor,
  smartphone: Smartphone,
  brain: BrainCircuit,
};

export default function Skills() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        icon={Sparkles}
        eyebrow="Capabilities"
        title="Skills & Tech Stack"
        description="Production-tested tools, language frameworks, and development environments."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => {
          const Icon = icons[group.icon];
          return (
            <div
              key={group.title}
              className="rounded-2xl border border-border-subtle bg-surface p-5"
            >
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mb-1.5 text-base font-semibold text-ink">{group.title}</h3>
              <p className="mb-4 text-xs leading-relaxed text-ink-muted">
                {group.description}
              </p>
              <ul className="space-y-2">
                {group.tags.map((tag) => (
                  <li
                    key={tag}
                    className="flex items-center justify-between text-xs text-ink-muted"
                  >
                    <span>{tag}</span>
                    <span className="h-1 w-1 rounded-full bg-accent" />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
