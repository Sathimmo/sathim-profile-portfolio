import { LucideIcon } from "lucide-react";
import MagneticLink from "@/components/ui/MagneticLink";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  /** Pull strength toward the cursor, in pixels. 0 disables the magnetic effect. */
  magnetic?: number;
};

const variants = {
  primary:
    "bg-accent text-canvas font-semibold hover:bg-accent-muted hover:shadow-[0_10px_30px_-10px_rgba(52,211,153,0.7)]",
  outline:
    "border border-border text-ink hover:border-accent/50 hover:text-accent hover:bg-accent/5",
  ghost: "text-ink-muted hover:text-accent",
};

export default function Button({
  children,
  href = "#",
  variant = "primary",
  icon: Icon,
  iconPosition = "right",
  className = "",
  magnetic = 5,
}: ButtonProps) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <MagneticLink
      href={href}
      magnetic={magnetic}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`btn-fx group/btn inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm ${variants[variant]} ${className}`}
    >
      {Icon && iconPosition === "left" && (
        <Icon className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover/btn:-translate-x-0.5 group-hover/btn:scale-110" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === "right" && (
        <Icon className="h-4 w-4 transition-transform duration-300 ease-smooth group-hover/btn:translate-x-0.5 group-hover/btn:scale-110" />
      )}
    </MagneticLink>
  );
}
