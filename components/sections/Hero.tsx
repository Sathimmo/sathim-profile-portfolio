import { ArrowDown, Mail, Zap } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/portfolio";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-28 pb-16 sm:pt-36">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <Reveal direction="down" delay={0}>
            <div className="group mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-ink-muted  glass transition-colors duration-300 hover:border-accent/40 hover:text-ink">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {profile.availability.toUpperCase()}
            </div>
          </Reveal>

          <Reveal direction="up" delay={90}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h1 className="text-gradient text-4xl font-bold tracking-tight sm:text-5xl">
                {profile.name}
              </h1>
              <span className="inline-flex items-center rounded-md bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent transition-transform duration-300 ease-spring hover:scale-105">
                {profile.role}
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={180}>
            <p className="mb-8 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
              {profile.description}
            </p>
          </Reveal>

          <Reveal direction="up" delay={270}>
            <div className="mb-10 flex flex-wrap gap-3">
              <Button href="#projects" variant="primary" icon={ArrowDown}>
                Explore Projects
              </Button>
              <Button href="#contact" variant="outline" icon={Mail} iconPosition="left">
                Get in Touch
              </Button>
            </div>
          </Reveal>

          <div className="grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
            {profile.stats.map((stat, index) => (
              <Reveal key={stat.label} direction="up" delay={360 + index * 110} scale>
                <SpotlightCard
                  tilt={8}
                  className="glass h-full rounded-xl border border-border-subtle bg-surface/80 px-3 py-3 sm:px-5 sm:py-4"
                >
                  <div className={`text-xl font-bold sm:text-2xl ${stat.colorClass}`}>
                    <CountUp value={stat.value} />
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-ink-faint sm:text-[11px]">
                    {stat.label}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-5">
          <Reveal direction="none" delay={200} scale>
            <div className="group relative animate-float">
              <div className="halo relative aspect-square w-56 overflow-hidden rounded-full border-4 border-border-subtle bg-surface shadow-xl transition-transform duration-600 ease-spring group-hover:scale-[1.04] sm:w-64 md:w-72">
                <Image
                  src={profile.avatarSrc}
                  alt={profile.name}
                  fill
                  sizes="(min-width: 768px) 288px, 256px"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
                  priority
                />
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-canvas/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={420}>
            <SpotlightCard
              tilt={10}
              className="flex items-center gap-2 rounded-xl border border-border-subtle bg-surface/95 px-4 py-3 shadow-xl glass"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent transition-transform duration-500 ease-spring hover:rotate-12">
                <Zap className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-ink-faint">
                  {profile.coreStackLabel}
                </div>
                <div className="text-sm font-medium text-ink">{profile.coreStack}</div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>

      <Reveal direction="up" delay={700} className="mt-16 flex justify-center">
        <a
          href="#projects"
          aria-label="Scroll to projects"
          className="flex h-10 w-6 items-start justify-center rounded-full border border-border-subtle pt-2 text-ink-faint transition-colors duration-300 hover:border-accent/50 hover:text-accent"
        >
          <ArrowDown className="h-3 w-3 animate-arrow-bob" />
        </a>
      </Reveal>
    </section>
  );
}
