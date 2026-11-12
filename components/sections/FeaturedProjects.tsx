import { Folder, Layers, Users, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        icon={Layers}
        eyebrow="Portfolio Highlights"
        title="Featured Projects"
        description="Production software systems, collaborative enterprise RAG platforms, and distributed microservices."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal
            key={project.title}
            direction={index % 2 === 0 ? "right" : "left"}
            delay={index * 120}
            className="h-full"
          >
            <SpotlightCard
              as="article"
              tilt={3}
              className="flex h-full flex-col rounded-2xl border border-border-subtle bg-surface/80 p-6 glass"
            >
              <div className="mb-4 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-md px-2.5 py-1 font-medium transition-colors duration-300 ${
                      project.statusVariant === "active"
                        ? "border border-border text-ink-muted"
                        : "bg-accent/15 text-accent"
                    }`}
                  >
                    {project.statusLabel}
                  </span>
                  <span className="text-ink-faint">{project.group}</span>
                </div>
                {project.statusVariant === "active" ? (
                  <span className="inline-flex items-center gap-1.5 text-accent">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    {project.rightTag}
                  </span>
                ) : (
                  <Tag variant="outline">{project.rightTag}</Tag>
                )}
              </div>

              <h3 className="group/title mb-2 flex items-center gap-2 text-xl font-semibold text-ink">
                <Folder className="h-5 w-5 text-accent transition-transform duration-500 ease-spring group-hover/title:-rotate-6 group-hover/title:scale-110" />
                {project.title}
              </h3>

              <p className="mb-5 text-sm leading-relaxed text-ink-muted">
                {project.description}
              </p>

              {project.role.length > 0 && (
                <div className="mb-5 space-y-3 rounded-xl border border-border-subtle bg-canvas/60 p-4 transition-colors duration-400 hover:border-accent/25">
                  {project.role.map((item) => (
                    <div key={item.heading}>
                      <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
                        <Users className="h-3.5 w-3.5" />
                        {item.heading}
                      </div>
                      <p className="text-xs leading-relaxed text-ink-muted">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {project.highlightTags.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {project.highlightTags.map((tag, tagIndex) => (
                    <Reveal
                      key={tag}
                      direction="up"
                      delay={200 + tagIndex * 70}
                      as="span"
                      className="inline-flex"
                    >
                      <Tag variant="outline">{tag}</Tag>
                    </Reveal>
                  ))}
                </div>
              )}

              {project.mutedTags.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2">
                  {project.mutedTags.map((tag) => (
                    <Tag key={tag} variant="muted">
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                {project.actions.map((action) =>
                  action.variant === "ghost" ? (
                    <Button
                      key={action.label}
                      href={action.href}
                      variant="ghost"
                      icon={Folder}
                      iconPosition="left"
                      className="ml-auto !px-0"
                      magnetic={0}
                    >
                      {action.label}
                    </Button>
                  ) : (
                    <Button
                      key={action.label}
                      href={action.href}
                      variant={action.variant}
                      icon={action.variant === "primary" ? ArrowUpRight : Users}
                      iconPosition={action.variant === "primary" ? "right" : "left"}
                    >
                      {action.label}
                    </Button>
                  )
                )}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
