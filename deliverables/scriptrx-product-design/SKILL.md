---
name: scriptrx-product-design
description: Design, implement, critique, or refine ScriptRx patient-facing landing pages and ScriptLinkRx clinical/commerce dashboards. Use for UI/UX work involving healthcare conversion flows, product catalogues, intake journeys, dashboards, orders, pharmacies, patients, responsive layouts, design tokens, or visual consistency across the ScriptRx ecosystem.
---

# ScriptRx Product Design

Create calm, credible, conversion-focused healthcare experiences with editorial landing pages and efficient operational dashboards.

## Start every task

1. Inspect the existing interface, routes, components, tokens, and assets before changing code.
2. Identify the surface:
   - Read `references/landing-system.md` for marketing, catalogue, FAQ, or patient acquisition pages.
   - Read `references/dashboard-system.md` for ScriptLinkRx application and operational workflows.
   - Read `references/foundations.md` for tokens and shared component rules.
3. Read `references/ux-checklist.md` before finalizing important flows or reviewing an implementation.
4. Preserve existing product imagery and brand assets when they are available.
5. Prefer the current project stack and components. Do not introduce a second design system.

## Design direction

- Make the experience feel modern, premium, human, and medically credible.
- Use white space, black typography, restrained pastel surfaces, real product imagery, and subtle motion.
- Build original compositions. Use Hims, Ro, and similarly polished healthcare products only as quality references; do not copy layouts, copywriting, trade dress, or distinctive brand devices.
- Keep content concise and scannable. Lead with the user outcome, then explain trust, process, and next action.
- Avoid generic SaaS visuals, excessive gradients, glassmorphism, heavy shadows, crowded cards, and decorative elements without a UX purpose.

## Workflow

### Create or refine

1. Establish hierarchy and primary user action.
2. Lay out the page with grid or flex; avoid absolute positioning except for contained product art.
3. Apply the shared foundations and the correct surface reference.
4. Implement complete interaction states: default, hover, focus-visible, active, loading, empty, error, and disabled when relevant.
5. Make responsive behavior intentional at desktop, tablet, and mobile sizes.
6. Use semantic HTML, keyboard-operable controls, descriptive labels, and sufficient contrast.
7. Render or run the interface and visually inspect it. Iterate on spacing, wrapping, alignment, image scale, and interaction feedback.

### Review

Report issues in this order:

1. Task completion and conversion blockers
2. Clinical trust, safety, or misleading-content risks
3. Accessibility and responsive failures
4. Hierarchy, spacing, consistency, and polish

Give concrete changes rather than subjective reactions.

## Non-negotiables

- Keep one obvious primary action per section or workflow step.
- Do not imply guaranteed outcomes or unsupported medical claims.
- Do not invent provider credentials, nationwide availability, prices, insurance coverage, ratings, or regulatory approvals.
- Keep medication and treatment eligibility conditional on licensed-provider review.
- Never use color alone to communicate status.
- Respect reduced-motion preferences.
- Keep destructive dashboard actions explicit and confirm consequential operations.
- Do not conceal totals, recurring charges, fulfillment constraints, or important treatment qualifiers.

## Output expectations

When implementing, deliver working responsive code and verify it. When proposing designs, include a short rationale, page structure, component behavior, and exact tokens. When information is missing, use clearly labeled placeholders rather than fabricating healthcare facts.
