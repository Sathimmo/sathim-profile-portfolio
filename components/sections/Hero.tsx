import { ArrowDown, Mail, Zap } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/portfolio";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {profile.availability.toUpperCase()}
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {profile.name}
            </h1>
            <span className="inline-flex items-center rounded-md bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">
              {profile.role}
            </span>
          </div>

          <p className="mb-8 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
            {profile.description}
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            <Button href="#projects" variant="primary" icon={ArrowDown}>
              Explore Projects
            </Button>
            <Button href="#contact" variant="outline" icon={Mail} iconPosition="left">
              Get in Touch
            </Button>
          </div>

          <div className="grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
            {profile.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border-subtle bg-surface px-3 py-3 sm:px-5 sm:py-4"
              >
                <div className={`text-xl font-bold sm:text-2xl ${stat.colorClass}`}>
                  {stat.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-ink-faint sm:text-[11px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border-subtle bg-surface">
            <Image
              src={profile.avatarSrc}
              alt={profile.name}
              fill
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-5 left-1/2 flex w-[88%] -translate-x-1/2 items-center gap-2 rounded-xl border border-border-subtle bg-surface/95 px-4 py-3 shadow-xl backdrop-blur">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <Zap className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ink-faint">
                {profile.coreStackLabel}
              </div>
              <div className="text-sm font-medium text-ink">{profile.coreStack}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
