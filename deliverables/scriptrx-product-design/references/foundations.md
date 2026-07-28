# ScriptRx foundations

## Brand character

ScriptRx should feel:

- Calm, direct, contemporary
- Premium without looking exclusive or ornamental
- Human without becoming playful
- Clinical without becoming sterile
- Confident without making medical promises

## Color tokens

Use this starting palette and map it into the project’s token system.

```css
:root {
  --srx-ink: #111111;
  --srx-ink-soft: #3f3f3f;
  --srx-muted: #71716f;
  --srx-line: #dededb;
  --srx-canvas: #ffffff;
  --srx-warm: #f8f7f3;
  --srx-lavender: #c4c8ee;
  --srx-lavender-soft: #eef0ff;
  --srx-mint: #dcebdc;
  --srx-blue: #d8edf0;
  --srx-peach: #f6e7dd;
  --srx-lime: #d7f36c;
  --srx-danger: #b42318;
  --srx-success: #16794a;
}
```

White is the primary canvas. Use pastel colors as contained product or category surfaces. Reserve lime for small conversion accents, progress, or numbered steps. Never flood the whole interface with the accent.

## Typography

- Use a clean neo-grotesk sans serif; prefer the existing project font.
- Display headings: weight 400–500, tight tracking, compact line-height.
- Interface headings: weight 500–600, normal-to-tight tracking.
- Body: 14–18px, line-height 1.5–1.7.
- Labels and metadata: 9–12px; uppercase only for short category labels.
- Avoid bolding every element. Hierarchy must also come from size, placement, and space.

Suggested responsive scale:

```css
--display-xl: clamp(3.25rem, 5.3vw, 4.75rem);
--display-lg: clamp(2.625rem, 4vw, 3.75rem);
--title-lg: clamp(1.75rem, 2.4vw, 2.5rem);
--title-md: 1.375rem;
--body-lg: 1.125rem;
--body: 0.9375rem;
--meta: 0.75rem;
```

## Spacing and layout

- Use an 8px spacing rhythm with 4px for micro-adjustments.
- Marketing content width: 1180–1280px.
- Dashboard content width may be fluid, with 24–32px page padding.
- Major landing sections: 96–144px vertical padding desktop; 64–88px mobile.
- Dashboard sections: 24–32px separation.
- Card gaps: 12–20px.
- Prefer asymmetric editorial grids on marketing pages and predictable utility grids in dashboards.

## Radius

- Marketing feature cards: 18–26px.
- Product art panels: 18–24px.
- FAQ rows: 22–28px.
- Dashboard cards: 10–14px.
- Inputs: 8–10px.
- Pills and primary compact CTAs: fully rounded.

## Depth and imagery

- Let contrast and spacing create most depth.
- Use borders such as `1px solid rgba(0,0,0,.08)` for dashboard separation.
- Use restrained shadows only for floating product renders, overlays, and menus.
- Product imagery should be large, transparent, sharp, and centered inside a warm-white or pale category surface.
- Pair floating product objects with soft contact shadows. Animate only the object, never the entire content card.

## Motion

- Standard transition: 180–260ms ease.
- Product hover: translate upward 8–16px with a subtle rotation; soften or compress the contact shadow.
- Buttons: move at most 1–2px.
- Accordions: rotate plus 45 degrees and reveal content without layout jank.
- Avoid continuous motion until hover/focus.
- Disable decorative animation for `prefers-reduced-motion: reduce`.

## Shared component rules

### Buttons

- Primary: black fill, white text, pill shape, 38–48px height.
- Secondary: white or transparent, dark border or text.
- Accent: lime only when a high-attention conversion action is justified.
- Use sentence-case, action-led labels.
- Keep one primary action in each local decision area.

### Forms

- Labels remain visible; placeholders never replace them.
- Use 44px minimum target height.
- Put validation near the field and explain recovery.
- Mark optional fields explicitly.
- For medical intake, explain why sensitive information is requested.

### Status

- Combine color with text and, where useful, an icon.
- Use soft background badges rather than saturated blocks.
- Keep status vocabulary stable across screens.

### Icons

- Use one outline icon family.
- Keep interface icons 14–20px.
- Never mix emoji with product UI icons.
