import { Mail, Send, ArrowUpRight, MessageSquareText } from "lucide-react";
import { contactMethods, ContactMethod } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/ui/BrandIcons";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

const icons: Record<ContactMethod["icon"], React.ComponentType<{ className?: string }>> = {
  mail: Mail,
  send: Send,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  facebook: FacebookIcon,
};

/**
 * Flex-wrap rather than a fixed grid: with 5 cards a 3-up grid leaves a ragged
 * hole in the last row, whereas `justify-center` centres whatever is left over.
 * Widths reproduce a 1 / 2 / 3-up grid exactly, accounting for the gap.
 */
const CARD_WIDTH =
  "w-full sm:w-[calc((100%_-_1rem)/2)] lg:w-[calc((100%_-_2rem)/3)]";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal direction="up" scale>
        <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-b from-accent/[0.07] to-transparent p-6 sm:rounded-3xl sm:p-8 lg:p-12">
          <span
            aria-hidden="true"
            // A 36rem blurred orb is costly to rasterise; on phones it holds
            // still and blurs less, and only animates where there's headroom.
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] max-w-[150%] -translate-x-1/2 rounded-full bg-accent/20 blur-[55px] sm:blur-[90px] md:animate-float"
          />

          <div className="mb-10 text-center">
            <Reveal direction="down" delay={80}>
              <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-accent sm:text-xs">
                <MessageSquareText className="h-3.5 w-3.5 shrink-0 animate-float" />
                Direct Inquiries
              </div>
            </Reveal>

            <Reveal direction="up" delay={160}>
              <h2 className="mx-auto max-w-2xl text-balance text-xl font-semibold tracking-tight text-ink sm:text-2xl lg:text-3xl">
                Let&apos;s collaborate on an architectural challenge or frontend project.
              </h2>
            </Reveal>

            <Reveal direction="up" delay={240}>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-ink-muted">
                Whether you need a high-scale Spring Boot service, a performant Next.js
                user experience, or local AI pipeline integration, I&apos;m ready to ship
                clean code.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {contactMethods.map((method, index) => {
              const Icon = icons[method.icon];
              return (
                <Reveal
                  key={method.label}
                  direction="up"
                  delay={320 + index * 100}
                  className={CARD_WIDTH}
                >
                  <SpotlightCard
                    as="a"
                    tilt={7}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${method.actionLabel} — ${method.label}`}
                    className="group/contact flex h-full min-w-0 flex-col rounded-2xl border border-border-subtle bg-surface/85 p-5 glass"
                  >
                    <span className="mb-4 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent transition-all duration-500 ease-spring group-hover/contact:scale-110 group-hover/contact:bg-accent group-hover/contact:text-canvas">
                      <Icon className="h-4 w-4" />
                    </span>

                    <h3 className="text-sm font-semibold text-ink">{method.label}</h3>

                    {/* Long addresses must wrap instead of overflowing the card. */}
                    <p className="mb-2 break-words text-xs text-ink-muted">
                      {method.handle}
                    </p>

                    {/* flex-1 absorbs the uneven copy lengths so every CTA
                        lands on the same baseline across a row. */}
                    <p className="mb-4 flex-1 text-pretty text-xs leading-relaxed text-ink-faint">
                      {method.description}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-accent">
                      {method.actionLabel}
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-spring group-hover/contact:translate-x-1 group-hover/contact:-translate-y-1" />
                    </span>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
