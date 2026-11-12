import { Briefcase, GraduationCap, Languages as LanguagesIcon } from "lucide-react";
import { experience, education, languages } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

function PanelHeading({
  icon: Icon,
  title,
}: {
  icon: typeof Briefcase;
  title: string;
}) {
  return (
    <div className="group/head mb-5 flex items-center gap-2">
      <Icon className="h-4 w-4 text-accent transition-transform duration-500 ease-spring group-hover/head:scale-125 group-hover/head:-rotate-6" />
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
    </div>
  );
}

/** Timeline entry: the rail draws itself in and the dot pulses once visible. */
function TimelineEntry({
  delay,
  children,
}: {
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal direction="left" delay={delay} className="relative pl-5">
      <span className="timeline-line absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent/60 via-border-subtle to-transparent" />
      <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-accent shadow-[0_0_12px_rgba(52,211,153,0.8)] transition-transform duration-500 ease-spring hover:scale-150" />
      {children}
    </Reveal>
  );
}

export default function ExperienceEducationLanguages() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Reveal direction="up" delay={0} className="h-full">
          <SpotlightCard
            tilt={3}
            className="h-full rounded-2xl border border-border-subtle bg-surface/80 p-6 glass"
          >
            <PanelHeading icon={Briefcase} title="Experience" />
            <div className="space-y-6">
              {experience.map((item, index) => (
                <TimelineEntry key={item.title} delay={120 + index * 130}>
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-accent">{item.period}</span>
                    <span className="text-[11px] text-ink-faint">{item.tag}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
                  <p className="mb-1.5 text-xs text-ink-muted">{item.subtitle}</p>
                  <p className="text-xs leading-relaxed text-ink-faint">
                    {item.description}
                  </p>
                </TimelineEntry>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal direction="up" delay={120} className="h-full">
          <SpotlightCard
            tilt={3}
            className="h-full rounded-2xl border border-border-subtle bg-surface/80 p-6 glass"
          >
            <PanelHeading icon={GraduationCap} title="Education" />
            <div className="space-y-6">
              {education.map((item, index) => (
                <TimelineEntry key={item.title} delay={200 + index * 130}>
                  <span className="mb-1 inline-block text-xs font-medium text-accent">
                    {item.tag}
                  </span>
                  <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
                  <p className="mb-1.5 text-xs text-ink-muted">{item.subtitle}</p>
                  <p className="text-xs leading-relaxed text-ink-faint">
                    {item.description}
                  </p>
                </TimelineEntry>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal direction="up" delay={240} className="h-full md:col-span-2 lg:col-span-1">
          <SpotlightCard
            tilt={3}
            className="h-full rounded-2xl border border-border-subtle bg-surface/80 p-6 glass"
          >
            <PanelHeading icon={LanguagesIcon} title="Languages" />
            <div className="grid gap-5 md:grid-cols-2 md:gap-x-8 lg:grid-cols-1">
              {languages.map((lang, index) => (
                <div key={lang.name} className="group/lang">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-ink transition-colors duration-300 group-hover/lang:text-accent-muted">
                      {lang.name}
                    </span>
                    <span className="font-medium text-accent">{lang.level}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-border-subtle">
                    <div
                      className="bar-fill h-full rounded-full bg-gradient-to-r from-accent-dark via-accent to-accent-muted shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                      style={
                        {
                          width: `${lang.percent}%`,
                          "--bar-delay": `${320 + index * 150}ms`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
