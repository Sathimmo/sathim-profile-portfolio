import { Server, Monitor, Smartphone, BrainCircuit, Sparkles } from "lucide-react";
import { skillGroups, SkillGroup } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

const icons: Record<SkillGroup["icon"], typeof Server> = {
  server: Server,
  monitor: Monitor,
  smartphone: Smartphone,
  brain: BrainCircuit,
};

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        icon={Sparkles}
        eyebrow="Capabilities"
        title="Skills & Tech Stack"
        description="Production-tested tools, language frameworks, and development environments."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => {
          const Icon = icons[group.icon];
          return (
            <Reveal
              key={group.title}
              direction="up"
              delay={index * 110}
              scale
              className="h-full"
            >
              <SpotlightCard
                tilt={6}
                className="group/card h-full rounded-2xl border border-border-subtle bg-surface/80 p-5 glass"
              >
                <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent transition-all duration-500 ease-spring group-hover/card:scale-110 group-hover/card:bg-accent/25 group-hover/card:shadow-[0_0_20px_-4px_rgba(52,211,153,0.8)]">
                  <Icon className="h-5 w-5 transition-transform duration-500 ease-spring group-hover/card:rotate-[-8deg]" />
                </span>
                <h3 className="mb-1.5 text-base font-semibold text-ink">{group.title}</h3>
                <p className="mb-4 text-xs leading-relaxed text-ink-muted">
                  {group.description}
                </p>
                <ul className="space-y-2">
                  {group.tags.map((tag) => (
                    <li
                      key={tag}
                      className="group/tag flex items-center justify-between text-xs text-ink-muted transition-all duration-300 ease-smooth hover:translate-x-1 hover:text-ink"
                    >
                      <span>{tag}</span>
                      <span className="h-1 w-1 rounded-full bg-accent transition-all duration-300 group-hover/tag:w-3" />
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
