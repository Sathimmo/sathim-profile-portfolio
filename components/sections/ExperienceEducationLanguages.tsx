import { Briefcase, GraduationCap, Languages as LanguagesIcon } from "lucide-react";
import { experience, education, languages } from "@/data/portfolio";

function PanelHeading({
  icon: Icon,
  title,
}: {
  icon: typeof Briefcase;
  title: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-2">
      <Icon className="h-4 w-4 text-accent" />
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
    </div>
  );
}

function TimelineItem({
  period,
  tag,
  title,
  subtitle,
  description,
}: {
  period: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <div className="relative border-l border-border-subtle pl-5">
      <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-accent" />
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-accent">{period}</span>
        <span className="text-[11px] text-ink-faint">{tag}</span>
      </div>
      <h4 className="text-sm font-semibold text-ink">{title}</h4>
      <p className="mb-1.5 text-xs text-ink-muted">{subtitle}</p>
      <p className="text-xs leading-relaxed text-ink-faint">{description}</p>
    </div>
  );
}

export default function ExperienceEducationLanguages() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-border-subtle bg-surface p-6">
          <PanelHeading icon={Briefcase} title="Experience" />
          <div className="space-y-6">
            {experience.map((item) => (
              <TimelineItem key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border-subtle bg-surface p-6">
          <PanelHeading icon={GraduationCap} title="Education" />
          <div className="space-y-6">
            {education.map((item) => (
              <div key={item.title} className="relative border-l border-border-subtle pl-5">
                <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-accent" />
                <span className="mb-1 inline-block text-xs font-medium text-accent">
                  {item.tag}
                </span>
                <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
                <p className="mb-1.5 text-xs text-ink-muted">{item.subtitle}</p>
                <p className="text-xs leading-relaxed text-ink-faint">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border-subtle bg-surface p-6 md:col-span-2 lg:col-span-1">
          <PanelHeading icon={LanguagesIcon} title="Languages" />
          <div className="grid gap-5 md:grid-cols-2 md:gap-x-8 lg:grid-cols-1">
            {languages.map((lang) => (
              <div key={lang.name}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-ink">{lang.name}</span>
                  <span className="font-medium text-accent">{lang.level}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border-subtle">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${lang.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
