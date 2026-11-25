import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/animations/Magnetic";
import { trackPressClick, type PressPlacement } from "@/lib/analytics";
import { formatPressDate, type PressItem } from "@/data/press";

// Gold is the only accent on press cards (authority element). Every link out
// opens the publication in a new tab and fires `press_click`.

interface PressCardProps {
  item: PressItem;
  placement: PressPlacement;
  /** "featured": large /press card. "compact": small text-only strip card. */
  variant?: "featured" | "compact";
}

const GOLD = "#c9a96e";

const PressCard = ({ item, placement, variant = "featured" }: PressCardProps) => {
  const onClick = () => trackPressClick(item.publication, placement);
  const external = { href: item.url, target: "_blank", rel: "noopener noreferrer", onClick } as const;

  if (variant === "compact") {
    return (
      <a
        {...external}
        className="group block p-5 transition-all duration-500 hover:-translate-y-1"
        style={{ background: "#111", borderRadius: "16px", border: "1px solid rgba(201,169,110,0.18)" }}
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: GOLD }}>
          {item.publication} · {formatPressDate(item.date)}
        </p>
        <p className="font-serif text-[16px] md:text-[17px] font-bold text-foreground leading-snug mb-3">
          {item.title}
        </p>
        <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] transition-all group-hover:gap-2.5" style={{ color: GOLD }}>
          Read the article <ArrowRight size={12} />
        </span>
      </a>
    );
  }

  const cta = (
    <div className="flex flex-wrap items-center gap-5">
      <Magnetic>
        <a
          {...external}
          className="inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.15em] px-7 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #dfc08a 0%, #c9a96e 100%)",
            color: "#0a0a0a",
            boxShadow: "0 10px 30px rgba(201,169,110,0.3)",
          }}
        >
          {item.image ? "Read the Feature" : "Read the Article"} <ArrowRight size={14} />
        </a>
      </Magnetic>
      {item.book === "cultivate-her" && (
        <Link
          to="/book#the-cultivate-her"
          className="font-sans text-[13px] font-medium transition-colors"
          style={{ color: GOLD, borderBottom: "1px solid rgba(201,169,110,0.4)", paddingBottom: "2px" }}
        >
          The Cultivate Her is out now →
        </Link>
      )}
    </div>
  );

  const cardStyle = { background: "#111", borderRadius: "24px", border: "1px solid rgba(201,169,110,0.18)" };

  // Text-only featured card
  if (!item.image) {
    return (
      <article className="p-8 md:p-12 transition-all duration-500 hover:-translate-y-1" style={cardStyle}>
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] mb-4" style={{ color: GOLD }}>
          {item.publication} · {formatPressDate(item.date)}
        </p>
        <h3 className="font-serif text-2xl md:text-[34px] font-bold text-foreground leading-tight mb-6 max-w-[820px]">
          {item.title}
        </h3>
        <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.9] mb-8 max-w-[680px]">
          {item.summary}
        </p>
        {cta}
      </article>
    );
  }

  // Rich print-feature card (portrait + outlet badge) — the original LeadHer layout
  return (
    <article
      className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] overflow-hidden transition-all duration-500 hover:-translate-y-1"
      style={cardStyle}
    >
      {/* Portrait + outlet badge */}
      <div className="relative min-h-[360px] md:min-h-[520px]">
        <img
          src={item.image}
          alt={item.imageAlt ?? ""}
          width={800}
          height={1035}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div
          className="absolute top-5 left-5 flex items-center gap-3 px-3 py-2"
          style={{
            background: "rgba(10,10,10,0.85)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(201,169,110,0.4)",
            borderRadius: "10px",
          }}
        >
          {item.cover && (
            <img
              src={item.cover}
              alt={`${item.publication} cover`}
              width={240}
              height={311}
              loading="lazy"
              className="h-11 w-auto object-cover"
              style={{ borderRadius: "3px" }}
            />
          )}
          <div className="flex flex-col">
            <span className="font-sans text-[12px] font-semibold tracking-[0.05em] text-foreground">
              {item.publication}
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.15em]" style={{ color: GOLD }}>
              {item.issue ?? formatPressDate(item.date)}
            </span>
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="p-8 md:p-12 flex flex-col justify-between gap-8">
        <div>
          {item.pages && (
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] mb-4" style={{ color: GOLD }}>
              {item.pages}
            </p>
          )}
          <h3 className="font-serif text-2xl md:text-[34px] font-bold text-foreground leading-tight mb-6">
            {item.title}
          </h3>
          {item.quote && (
            <blockquote
              className="pl-5 mb-6 text-[22px] md:text-[26px] leading-[1.4] italic"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "#e0e0e0",
                borderLeft: `2px solid ${GOLD}`,
              }}
            >
              "{item.quote}"
            </blockquote>
          )}
          <p className="font-sans text-[14px] text-muted-foreground leading-[1.9]">{item.summary}</p>
        </div>
        {cta}
      </div>
    </article>
  );
};

export default PressCard;
