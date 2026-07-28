interface Props {
  className?: string;
  /** Accessible label when the mark stands in for the brand name. */
  title?: string;
  /** Purely decorative (background texture): hidden from assistive tech. */
  decorative?: boolean;
}

// Vector reconstruction of the bbbb wordmark (measured from the brand mark):
// four monoline "b"s — a full-height stem + a ring bowl. Crisp at any scale.
const STEMS = [20, 109, 198, 286];

export function BbbbMark({ className, title = 'bbbb', decorative }: Props) {
  const a11y = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img', 'aria-label': title };
  return (
    <svg
      className={className}
      viewBox="12 13 343 106"
      fill="none"
      stroke="currentColor"
      strokeWidth={13}
      strokeLinecap="round"
      {...a11y}
    >
      {STEMS.map((sx) => (
        <g key={sx}>
          <line x1={sx} y1={21.5} x2={sx} y2={110.5} />
          <circle cx={sx + 30} cy={81} r={29.5} />
        </g>
      ))}
    </svg>
  );
}
