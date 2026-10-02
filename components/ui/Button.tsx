import { LucideIcon } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
};

const variants = {
  primary:
    "bg-accent text-canvas font-semibold hover:bg-accent-muted",
  outline:
    "border border-border text-ink hover:border-accent/50 hover:text-accent",
  ghost: "text-ink-muted hover:text-accent",
};

export default function Button({
  children,
  href = "#",
  variant = "primary",
  icon: Icon,
  iconPosition = "right",
  className = "",
}: ButtonProps) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-colors ${variants[variant]} ${className}`}
    >
      {Icon && iconPosition === "left" && <Icon className="h-4 w-4" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="h-4 w-4" />}
    </a>
  );
}
