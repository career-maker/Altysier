# Altysier Group — WordPress Conversion Notes

Static build lives here for direct preview (open `index.html` in a browser,
no build step needed — fonts load from Google Fonts CDN, the motion system
is local with no animation library, and every section now carries
photography hotlinked from Unsplash as a placeholder — see "Photography"
below). Below is the map for turning it into a WordPress block theme.

Section order and copy follow the approved homepage brief (story arc: Who
We Are → What We Do → How We Create Value → Our Companies → Our Reach &
Impact → Why Trust Us → Insights & FAQs → Partnership).

## File map → WP block theme

```
index.html        → templates/front-page.html (Group Companies data-driven
                     from a "company" CPT instead of hardcoded articles)
parts/header.html → parts/header.html   (templateParts, area: header)
parts/footer.html → parts/footer.html   (templateParts, area: uncategorized/footer)
css/styles.css     → theme's assets/css/base.css (enqueue via
                     wp_enqueue_style; fold color/font tokens into theme.json)
js/main.js         → assets/js/main.js  (enqueue via wp_enqueue_script;
                     split per-block into view.js files once each section
                     becomes its own block/pattern)
```

## Section → block/pattern mapping

| # | Section | Suggested WP unit |
|---|---|---|
| 01 | Hero | Pattern (`patterns/hero.php`); background photo as a single image field; the Group section's 4 stats (`.stat-grid`) live here too, as a repeater — see design-decisions note below |
| 02 | The Group (statement + sector explorer) | Pattern; stats moved to Hero (see row 01); sector explorer as a `sector` CPT/repeater (icon key + name + copy + **photo field**, crossfaded per active sector) |
| 03 | How We Create Value | Pattern, steps as a repeater field (label + short copy + **thumbnail photo**); renders as the horizontal scroll-snap strip |
| 04 | Our Business Ecosystem | Query Loop / custom `company` CPT (name, sector, tag, excerpt, permalink, icon key, **featured image** for the card's photo header) — also feeds the footer's "Group Companies" list and a future Group Of Companies page; renders as the horizontal alternating-card strip |
| 05 | Global Reach + Impact | Pattern; background photo as a single image field; stats as repeater; CSR pillars as repeater (title + copy) |
| 06 | Why Altysier + Testimonials | Pattern; background photo as a single image field; principles as repeater; testimonials as a `testimonial` CPT — **ships empty** until real, client-approved testimonials exist (see note below) |
| 07 | FAQ + Partnership CTA | FAQ as repeater (question/answer) — also reusable for an FAQ schema (`FAQPage` JSON-LD); CTA banner has its own background photo field, links to `contact.html`, no inline form on the homepage |

## Design tokens used

- **Direction (current, superseding the note below)**: design system ported
  1:1 from the MVP Trans-logistics reference build (mvplogistics.eu) —
  colors, type, spacing scale, preloader and scroll motion are the source
  site's own; only content, nav items and imagery are Altysier's. This is
  an explicit, full pivot requested by the client, not a partial patch —
  the "flat corporate minimal" direction described below is retired.
- **Brand palette (client-supplied logo)**: `ink #900909` and `accent
  #dc080c` are sampled directly, pixel-for-pixel, from the client's own
  logo file (the "A6" gradient icon) — `#dc080c` at its brightest corner
  down to `#900909` at its darkest, replacing an earlier MVP-inspired navy
  placeholder palette. `ink` carries the same structural role the navy
  did (default text color, dark button/card fills, border tint at reduced
  opacity — same ~13.5:1 contrast on white), `accent` is the brighter red
  used for the hero gradient's top stop. `ink-2 #8a1912` (borders on
  ink-colored cards), `near-black #141414` (footer / dark strip
  background — left neutral, not red-tinted, matching the source site),
  `paper #ffffff`, `paper-200 #f4f4f7` (pill backgrounds, light cards).
  Logo assets live in `img/` (`logo-icon.png` — the mark alone, transparent
  background, used in the header/footer lockups next to CSS text so the
  wordmark stays crisp and theme-colorable in both light and dark headers;
  `logo-full.png` — full lockup incl. Arabic subtitle, used for `og:image`
  only; `favicon.png` — the mark padded onto a square canvas).
- **Type**: display face is **Bebas Neue** (Google Fonts — a free
  metric-comparable stand-in for the source site's paid BebasNeuePro),
  used uppercase for every button, nav item, card title and big number.
  Body copy is **Inter** (400–700). A third face, **Oswald** (600/700), is
  used specifically for the 7 section titles (Hero, Group, Journey/
  Businesses strip, Reach, Why, FAQ, CTA) so they can display in Title
  Case — Bebas Neue is a caps-only font with no lowercase letterforms at
  all (verified directly: `text-transform: none` vs `uppercase` render
  pixel-identical on it), so it physically cannot show mixed case. Oswald
  was picked as the closest match to Bebas Neue's condensed/bold/all-caps-
  native weight and feel among fonts that actually have lowercase — see
  the shared selector block at the top of `css/styles.css` (right after
  `.eyebrow`) for the full rationale and the exact selector list. All
  three loaded via one Google Fonts `<link>`; self-host with `@font-face`
  in the WP theme for production.
- **Fluid `rem` scale**: `html { font-size }` is set by two formulas (one
  above/below the 1024px breakpoint) so that `1rem == 1px` at a 1920px-wide
  reference viewport. Every size in `css/styles.css` is authored in `rem`
  at that 1:1 ratio instead of `px`/`clamp()` — this is the actual
  mechanism behind the source site's pixel-perfect responsive feel. Keep
  using `rem` for any new component; don't mix in raw `px` for layout
  sizing (px is fine for hairline borders/box-shadows only).
- **Radius**: `20rem` on section-level cards, `10–16rem` on smaller cards,
  `999rem` (pill) on buttons, chips and the header nav segments.
- **Motion — deliberately no external library**: an earlier pass used
  GSAP + ScrollTrigger + Swiper from a CDN to match the source site's own
  stack, but a CDN hiccup or a pin-math edge case could leave the page
  scroll-locked with invisible content — exactly the bug reports that led
  to this rewrite. `js/main.js` reproduces the same effects with plain
  JS/CSS: a split-char preloader with a counted percentage
  (`requestAnimationFrame` + CSS transitions), a header that hides on
  scroll-down / reveals on scroll-up (plain scroll listener), per-element
  scroll reveals (`IntersectionObserver` + `.reveal`, with `nth-child`
  `--reveal-delay` stagger rules on every card grid — stat cards, reach
  stats/pillars, why principles — so they cascade in rather than fade as
  one flat block), and native CSS scroll-snap (no JS needed for the
  scrolling itself) for the two horizontal strips plus a plain
  `setInterval` carousel for the hero sector slider. Every feature is
  wrapped in its own `try/catch` and gated behind a `js-ready`/
  `js-reveal-ready` class the script adds itself — the default (pre-JS, or
  JS-failed) state of every section is a normal, fully visible,
  non-overlapping static layout. See the header comments in
  `css/styles.css` and `js/main.js` for the fallback contract before
  adding any new animated section.
- **Anchor scrolling under the fixed header**: the header is a floating
  pair of pills with transparent gaps between them, not a solid bar — page
  content scrolls directly underneath it. Anchor jumps (nav links,
  "Explore Our Group", the footer's "Up" button) need clearance so a
  section heading doesn't land flush against the viewport top, right where
  it visually collides with the header. This is `html { scroll-padding-top
  }` (110px desktop / 76px mobile), **not** `scroll-margin-top` on the
  individual section targets — that was tried first and verified, by
  direct test, to not be honored by this Chromium's anchor-scroll/
  `scrollIntoView` landing; `scroll-padding-top` on the scrolling element
  is what actually governs it. Keep using the container-level property for
  any future anchor target.
- **Section watermarks**: a shared `.section-watermark` component — a
  giant (~300rem) low-opacity numeral bleeding off one edge, `z-index:-1`
  behind a `position:relative` section — carries the brief's own section
  numbering (02 Group, 03 Journey, 04 Businesses, 06 Why, 07 FAQ). Skipped
  on Hero and Reach, which already carry the SVG "route" graphic plus a
  background photo and didn't need a third decorative layer competing for
  attention. Hidden below 1024px — there isn't enough room for a bleeding
  numeral to read as intentional rather than a layout accident.

## Photography

Every section and every company/journey-step card now carries a photo,
hotlinked directly from Unsplash's CDN (`images.unsplash.com/photo-<id>`)
at a size/quality tuned per usage (`?w=…&q=75&auto=format&fit=crop`).
**These are placeholders** — free-to-use per Unsplash's license for this
kind of hotlinked prototype use, but not the client's own photography.
Swap every one for licensed or Altysier-owned photography before
production launch; the URLs are easy to find (`grep -n
images.unsplash.com index.html`) and each `<img>` sits in a clearly-scoped
wrapper (`.section-photo`, `.business-card__photo`,
`.journey-card__photo`, `.sectors__panel-photo`) so replacement is a
straight `src` swap with no layout changes needed.

- **Full-bleed section photos** (Reach, Why) sit at low opacity (12–22%,
  tuned per photo — a naturally bright photo needs a lower opacity than a
  naturally dark one to read as equally subtle) directly over the
  section's own existing brand-color background, with no separate tint
  layer: the background paints first, so even before/if a photo loads,
  brand color always dominates and text contrast is never at risk. The
  Hero is the one exception, redesigned later to run its photo at
  near-full opacity (94%) under a white gradient scrim instead — see
  "Hero redesign" under intentional design decisions below.
- **Sector explorer panel**: seven photos (one per sector) are all
  present in the DOM as stacked, absolutely-positioned `<img>` elements
  and crossfaded via a `.is-active` class toggle in `js/main.js` — chosen
  over swapping a single `<img src>` because a crossfade never shows a
  flash of blank/broken image while a new photo decodes on a slow
  connection. A dark gradient scrim (`.sectors__panel::after`) sits above
  the photos so the white text stays legible regardless of which one is
  showing.
- **Business cards**: each of the 5 company cards now has a photo header
  strip (`.business-card__photo-wrap`, 190rem tall) above the existing
  icon/tag/name/text content, which moved into a new
  `.business-card__body` wrapper. The alternating light/maroon card
  background (a deliberate design decision from the palette pass) is
  preserved in the body below the photo.
- **Journey cards**: a small rounded-square photo thumbnail
  (`.journey-card__photo`, 72rem) sits top-right of each of the 5 "How We
  Create Value" cards, sized and positioned so it never overlaps the
  card's title/text (`journey-card__title`/`__text` both carry a
  `max-width` that stops short of the thumbnail).

<details>
<summary>Retired direction (pre-MVP-redesign) — kept for history</summary>

- **Direction**: flat corporate minimal (Stripe/Linear-style) — one accent
  color, one radius scale, no photography, icon-driven sections.
- **Neutrals**: `ink #111827` (text), `paper #ffffff` (page background),
  `paper-200 #f9fafb` (section tint), `border #e5e7eb` (all card/panel
  borders — 1px, flat, no shadows).
- **Accent**: one solid brand blue, `accent #2563eb` / `accent-600 #1d4ed8`
  (hover).
- **Type**: Inter only, for headings and body both (weights 400–800).
- **Radius**: `rounded-lg` (8px) on every card, button, icon-button, tag
  chip and panel.
- **No photography**: the hero used a subtle abstract line/dot SVG
  illustration; every sector/company used a small hand-authored line icon
  (24px, `stroke-width: 1.75`, in a `bg-blue-50` rounded square).
- **Spacing**: section vertical padding was `py-14 md:py-20` across all
  content sections.
- **Header**: `sticky` (not fixed), plain white bar with a 1px bottom
  border.

</details>

## Placeholder content to confirm before launch

- `18+ Markets` and `20+ Years of Experience` (About ticker + Reach stats)
  — illustrative only, need real figures.
- Global Reach stats (Countries / Markets / Partners / Sectors) — currently
  `12+ / 18+ / 150+ / 07+`, illustrative only.
- Footer HQ address, email and phone — currently placeholder Dubai/UAE
  contact details, marked `<!-- TODO -->`.
- Testimonial attribution ("Regional Distribution Partner") — swap for a
  real named partner once one is confirmed.
- Social links in the footer point to `#` — wire up real profile URLs.
- Nav targets (`about.html`, `group-of-companies.html`, `csr.html`,
  `contact.html`, `companies/*.html`) are placeholder routes for pages not
  yet built.
- Sector explorer copy for **Healthcare & Medical Supplies** and
  **Mobility & Vehicle Distribution** (the two sectors listed that don't
  yet have a dedicated Group company) is newly written, generic
  placeholder text, marked `<!-- TODO -->` in `index.html` — the other
  five sector descriptions reuse the corresponding company's real
  description verbatim.
- **Testimonials ("Trusted by Our Partners")**: per the brief, no
  fabricated testimonial is shown. The `.testimonials` block in the "Why
  Altysier" section is an intentional empty-state — swap it for a real
  quote/name/designation/company (and logo, where approved) only once a
  client-approved testimonial exists. Do not put placeholder testimonial
  content there in the meantime.
- **All 20 photos are Unsplash placeholders**, not Altysier's own
  photography — see the "Photography" section above for the full list of
  what's used where and how to swap them.

## Notes on intentional design decisions

- **One-screen-per-section (desktop only)**: every section (`.hero`,
  `.group`, `.journey`, `.businesses`, `.reach`, `.why`, `.faq`) is
  `height: 100vh` + `display: flex; align-items: center` at desktop widths
  (≥1025px) — content is centered and sized to fit inside one viewport, no
  scrolling within a section. `.journey`'s 5 cards are noticeably shorter
  than a full screen even after the same round of size cuts, so forcing it
  to 100vh leaves a wide, deliberate band of whitespace above/below the
  card row (verified symmetric with `getBoundingClientRect()`) rather than
  the section growing past the viewport or the cards stretching to fill
  it. Getting here meant cutting card/icon/text
  sizes hard across every section (e.g. the Group section's sector-explorer
  tab rows went from 24rem to 8rem vertical padding, the FAQ accordion's
  question padding from 26rem to 14rem) — verified with
  `getBoundingClientRect()` checks that nothing overflows its section's
  `overflow: hidden` boundary at both 1440×900 and 1366×768 (a second,
  shorter reference size) before treating any section as done.
  **Mobile is explicitly exempt** — every `height: 100vh` rule is reset to
  `height: auto` inside the existing `@media (max-width: 1024px)` blocks,
  because forcing a phone's much shorter viewport to also hold a full
  section without scrolling would mean illegibly tiny text; mobile keeps
  natural document flow, same as before this pass.
- **Footer "Altysier Group" wordmark is now a true watermark**: previously
  solid white at full opacity despite being called a "wordmark" in earlier
  notes — it was really just large branding text, not actually subtle.
  Now `rgba(255, 255, 255, 0.08)`, in line with the `.section-watermark`
  treatment used elsewhere on the page.
- **Hero simplified — sector slider removed, stats moved in**: the hero
  originally paired the headline/CTA column with a full vertical
  auto-advancing sector slider ("01/07 Our Sectors International Trade…").
  Combined with a headline sized for a 1920px canvas, this made the hero
  feel cluttered, especially on mobile (1.6 screens of scrolling just to
  clear it). The slider is gone entirely (markup, its dedicated CSS, and
  the `setInterval` carousel JS all removed together — nothing dormant
  left behind); the sector explorer two sections down already covers the
  same 7 sectors properly, interactively. In its place, the Group
  section's 4 stat cards now live in the hero instead — the wrapper class
  was renamed `.group__stats` → `.stat-grid` since it no longer belongs to
  the Group section.
- **Hero redesign — white-gradient-over-photo, light card treatment**: a
  later pass moved the hero off its dark maroon radial-gradient background
  onto a near-full-opacity photo (`.hero > .hero__bg .section-photo`,
  0.94, scoped so it doesn't leak into `.reach__bg` which shares the
  `.hero__bg` base class) with a white `.hero__scrim` linear-gradient
  washing over the text column and fading out toward the photo on the
  right. Headline/eyebrow/body copy flipped from white to dark `--ink`
  tones to match. The decorative `route-bg` SVG (dashed lines/nodes) was
  dropped from the hero specifically — still present on `.reach`, which
  kept its original dark treatment — since the brief's reference layout
  has no line-graphic overlay. Stat cards dropped the `._on-dark` glass
  modifier for a light `rgba(244,244,247,.88)` card (the modifier's CSS
  rule was removed as unused) and each one gained a `.stat-card__icon`
  (building/pie-chart/globe/award line icons, top-right of the card).
  Buttons swapped from `._light`/`._on-dark` to `._accent`/a new `._outline`
  variant (white fill, visible ink border — added because bare `.btn`'s
  border matches its own fill color and would have blended into a white
  background); both new variants reuse the shared `.btn`/`.btn::after`
  hover-sweep mechanics untouched. Mobile gets its own heavier, top-to-
  bottom `.hero__scrim` (desktop's left-to-right wash isn't enough
  coverage once the layout stacks full-width). Hero and Reach also each
  gained a `.section-watermark` (`01`, `05`) — previously the only two
  sections without one; the hero's needed a `z-index: 1` override (instead
  of the shared -1) to still read at all against a near-opaque photo.
- **Section title sizes reduced**: the 8 Oswald section titles (see the
  shared selector block after `.eyebrow`) were sized quite large in the
  original pass (up to 96rem on the hero) — trimmed by roughly 20% across
  the board (hero 96→76rem, others similarly) for a calmer, less shouty
  hierarchy, with matching reductions on the mobile overrides.
- **No Tailwind**: the MVP-ported design is a bespoke system (fluid `rem`
  scale, pill buttons, split-char motion) that doesn't map cleanly onto
  utility classes, so `css/styles.css` is hand-written CSS with BEM-ish
  class names instead — this also converts more directly into a WP block
  theme's `theme.json` + block styles than a Tailwind utility soup would.
- **Dark strip + light cards, not a single flat ground**: unlike the prior
  all-white pass, the lower half of the page (Reach, Why Altysier) sits on
  a near-black backdrop with light content cards floating on top, then a
  solid `#141414` footer — this is the source site's own structure. FAQ
  and the final CTA sit back on white, matching where they lived in the
  original content structure.
- **Fonts changed on purpose**: Bebas Neue (display) + Inter (body)
  replace the prior Inter-only system, matching the source site's own
  pairing. BebasNeuePro (the source's actual paid font) was not used or
  redistributed — Bebas Neue is Google Fonts' free, metrically similar
  equivalent.
- **FAQ section now carries an inline contact form (left) + the accordion
  (right)**: an earlier pass had removed an MVP-style inline form to keep
  homepage content unchanged, then a later, explicit request asked for a
  form back in this exact spot — so `.faq__col-left` (widened
  300rem → 420rem) now holds a "Let's Build What Comes Next" pitch +
  Name/Email/Message `<form>`, and the accordion moved into a new
  `.faq__col-right` alongside its own heading. The standalone `.cta`
  banner that used to sit below the FAQ grid (photo background, same
  pitch copy, a single "Contact Us" link to `contact.html`) was removed —
  its copy was folded into the new form's heading/intro instead, since a
  real inline form and a link-out button both pointing at "get in touch"
  in the same one-screen section was redundant. `id="contact"` moved from
  the old `.cta` div onto `.faq__col-left`, so the header/hero's `#contact`
  anchor links still land in the right place. The form has no backend on
  this static build — `action="mailto:info@altysiergroup.com"` is the
  interim submission path (opens the visitor's email client, pre-filled);
  swap in a real form endpoint before launch. `.cta`'s CSS rules (and its
  entry in the shared Oswald-title selector list) were removed as unused.
