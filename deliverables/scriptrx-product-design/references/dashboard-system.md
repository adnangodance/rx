# ScriptLinkRx dashboard system

## Product character

The dashboard is the operational counterpart to the editorial ScriptRx landing page. Keep the same restraint and typography, but prioritize speed, state clarity, and dense information over campaign-style expression.

## App shell

- Use a persistent left sidebar on desktop and a drawer on mobile.
- Keep sidebar navigation grouped by user jobs: overview, catalogue, orders, pharmacies, users, support, settings.
- Highlight the current section with a soft neutral or warm surface, not a loud brand block.
- Use a compact top bar for page title, search, notifications, account, and contextual actions.
- Keep content background near white (`#fafafa`) with white cards.

## Page hierarchy

1. Page title and concise context
2. Primary action aligned to the top-right
3. Optional summary metrics
4. Filters, search, and view controls
5. Main table, cards, or workflow
6. Pagination or continuation

Do not place several unrelated primary buttons in the header.

## Cards and metrics

- Use white cards with subtle borders and 10–14px radius.
- Keep stat cards compact; value first, label second, delta third.
- Use colored icon tiles sparingly.
- Avoid oversized marketing headlines inside operational pages.

## Tables and lists

- Optimize for scanning: stable columns, left-aligned text, aligned numbers, predictable row height.
- Keep row actions in a trailing menu unless one action is used constantly.
- Make the whole row clickable only if that behavior is clear and keyboard accessible.
- Preserve filters and search when navigating into detail and back.
- Use skeletons during load, actionable empty states, and visible error recovery.

## Product and order flows

- Product cards may reuse the landing visual system at smaller scale.
- On product detail, pair imagery with pharmacy, strength, size, pricing, and prescribing constraints.
- In carts and checkout, keep patient, product, pharmacy, quantity, and price relationships unmistakable.
- Show order totals and recurring implications before confirmation.
- For multi-patient carts, visually group every item under its patient.
- Use confirmation for deletion, cancellation, and irreversible fulfillment changes.

## Status language

Use a small stable vocabulary. Example:

- Pending
- Processing
- Shipped
- Delivered
- Cancelled
- Active
- Inactive
- Open
- Resolved
- Urgent

Pair text with a dot or icon and a soft status background. Do not rely on color alone.

## Forms and workflows

- Break long clinical or prescribing forms into meaningful sections.
- Maintain entered values when navigating between steps.
- Keep the next required action visible.
- Explain disabled states.
- Validate progressively, not only after submission.
- Provide a review step before consequential submission.

## Responsive dashboard

- Collapse sidebar into an accessible drawer.
- Convert broad tables into priority-column lists or cards; do not simply shrink every column.
- Keep critical action bars visible without covering content.
- Preserve search, status, identity, total, and next action on small screens.
- Test at 1280px, 1024px, 768px, and 390px widths.
