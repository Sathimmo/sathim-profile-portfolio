import { Mail, Send, ArrowUpRight, MessageSquareText } from "lucide-react";
import { contactMethods, ContactMethod } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/ui/BrandIcons";

const icons: Record<ContactMethod["icon"], React.ComponentType<{ className?: string }>> = {
  mail: Mail,
  send: Send,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  facebook: FacebookIcon,
};

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-border-subtle bg-gradient-to-b from-accent/[0.07] to-transparent p-8 sm:p-12">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent">
            <MessageSquareText className="h-3.5 w-3.5" />
            Direct Inquiries
          </div>
          <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Let&apos;s collaborate on an architectural challenge or frontend project.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
            Whether you need a high-scale Spring Boot service, a performant Next.js
            user experience, or local AI pipeline integration, I&apos;m ready to ship
            clean code.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactMethods.map((method) => {
            const Icon = icons[method.icon];
            return (
              <a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-border-subtle bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-semibold text-ink">{method.label}</h3>
                <p className="mb-2 text-xs text-ink-muted">{method.handle}</p>
                <p className="mb-4 text-xs leading-relaxed text-ink-faint">
                  {method.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                  {method.actionLabel}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
