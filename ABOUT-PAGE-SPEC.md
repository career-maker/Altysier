# Altysier Group — Inner Page Specification: About Us (`about.html`)

This document defines the architecture, content hierarchy, design system rules, and animation specifications for the **About Us** inner page of Altysier Group.

---

## 1. Design System & Global Standards

All inner pages must strictly adhere to the established homepage design language:

- **Typography**:
  - **Display / Nav / Buttons / Numbers**: `Bebas Neue, sans-serif` (uppercase)
  - **Section Headings (Title Case)**: `Oswald, sans-serif` (weight: 600/700)
  - **Body Copy / Labels / Eyebrows**: `Inter, sans-serif` (weight: 400, 500, 600, 700)
- **Palette**:
  - Primary Brand Ink: `#900909` (`--ink`)
  - Accent Red: `#dc080c` (`--accent`)
  - Dark Slate / Footer: `#141414` (`--near-black`)
  - Clean Light Surfaces: `#ffffff` (`--paper`) and `#FAF4F4` (soft brand tint)
- **Fluid Sizing Scale**:
  - Authored in `rem` units where `1rem == 1px` at 1920px reference viewport.
- **Section Watermarks**:
  - Upper-case background watermarks (`.section-watermark`) in `Bebas Neue`, semi-transparent.
- **In-Animation System**:
  - **Section label**: Fade + slight slide (`0.5s`)
  - **Main title**: Masked slide-up (`0.8s`, `cubic-bezier(0.16, 1, 0.3, 1)`) with `0.1s` stagger per line
  - **Description**: Fade-up (`0.6s`)
  - **Buttons**: Fade-up + slight scale (`0.5s`)
  - **Cards / Highlights**: Fade-up stagger (`0.5s`)
- **Shared Template Parts**:
  - Header: `parts/header.html`
  - Footer: `parts/footer.html`

---

## 2. Page Structure & Content Blueprint

### Section 01 — Inner Hero (`.inner-hero`)
- **Watermark**: `ABOUT US`
- **Breadcrumb**: `Home / About Us`
- **Heading**: `Creating Opportunities Across Markets`
- **Supporting Copy**:
  *Altysier Group brings together specialized businesses across international trade, industrial investment, manufacturing and distribution, supporting essential industries across international markets.*
- **Visual**: Full-width cinematic background photo with balanced gradient scrim for instant contrast and readability.

### Section 02 — Who We Are (`.about-intro`)
- **Watermark**: `WHO WE ARE`
- **Eyebrow**: `Who We Are`
- **Heading**: `A Trusted International Business Group`
- **Layout**:
  - Left column: Large editorial statement:
    *A diversified group connecting specialized businesses across international trade, industrial investment, manufacturing and distribution.*
  - Right column: In-depth narrative:
    *Altysier Group operates as an integrated holding enterprise, anchoring essential supply chains and facilitating high-value cross-border commerce. Through strategic investments and disciplined operational leadership, we foster growth across energy, agriculture, food security, healthcare, transportation and industrial infrastructure.*
  - Full-width / editorial supporting photography showcasing operational capacity.

### Section 03 — What Defines Altysier (`.about-statement`)
- **Watermark**: `WHAT DEFINES US`
- **Eyebrow**: `Our Foundation`
- **Heading / Big Statement**: `Established for Long-Term Growth`
- **Supporting Copy**:
  *Building sustainable trade relationships through integrity, consistency and operational excellence.*
- **Design**: Immersive photographic backdrop with soft dark scrim, serving as an atmospheric transition between company identity and values.

### Section 04 — Our Culture (`.about-culture`)
- **Watermark**: `OUR CULTURE`
- **Eyebrow**: `Our Culture & Values`
- **Heading**: `Built on Trust. Driven by Excellence.`
- **Interactive Composition**:
  - `TRUST`: Building lasting partnerships grounded in transparency, commitment, and mutual respect.
  - `EXCELLENCE`: Upholding the highest standards of operational precision and technical execution.
  - `ACCOUNTABILITY`: Taking ownership of outcomes and delivering on every promise across all markets.
  - `COLLABORATION`: Connecting diverse capabilities and teams to achieve shared, compounding success.
  - `INTEGRITY`: Conducting ethical business across international jurisdictions and trade routes.
  - `LONG-TERM VALUE`: Focusing on generational stability, economic resilience, and sustainable impact.

### Section 05 — Vision, Mission & Motto (`.about-vmm`)
- **Watermark**: `VISION & MISSION`
- **Eyebrow**: `Our Purpose`
- **Heading**: `Guiding Principles for Enduring Impact`
- **Three-Stage Editorial Composition**:
  - **01 — Vision**: *To be a trusted global business group delivering essential products and industrial value through reliable partnerships and responsible trade.*
  - **02 — Mission**: *To create long-term value by connecting markets, optimizing supply chains, and investing in industries that support economic stability and growth across regions.*
  - **03 — Motto**: *We bridge industries and markets through smart trading and industrial investments.*

### Section 06 — Executive Leadership (`.about-leadership`)
- **Watermark**: `OUR LEADERSHIP`
- **Eyebrow**: `Executive Leadership`
- **Heading**: `A Word From Our Leadership`
- **Layout**: High-end editorial spread:
  - Executive Photo: Portrait of leadership.
  - Message:
    *"At Altysier Group, our foundation is built on the belief that enduring business is forged through unwavering integrity, strategic foresight, and disciplined execution. As we expand across critical sectors and global borders, our focus remains clear: building businesses that empower economies, connecting markets that need reliable supply, and creating value that stands the test of time for our partners and communities."*
  - Sign-off:
    **Omer Mahmoud Yousif Ali**
    *Chief Executive Officer, Altysier Group*

### Section 07 — Our Business Ecosystem (`.about-ecosystem`)
- **Watermark**: `OUR ECOSYSTEM`
- **Eyebrow**: `Group Structure`
- **Heading**: `One Group. Multiple Capabilities.`
- **Intro**: *Connecting specialized industry leaders under a shared institutional vision.*
- **7 Sectors Overview Grid**:
  1. International Trade
  2. Industrial Investment
  3. Manufacturing
  4. Transportation & Logistics
  5. Agriculture & Food Security
  6. Healthcare & Medical Supplies
  7. Mobility & Vehicle Distribution
- **Action**: Primary CTA button linking to `group-of-companies.html` (*Explore Our Companies*).

### Section 08 — Partnership Call to Action (`.about-cta`)
- **Watermark**: `PARTNERSHIP`
- **Eyebrow**: `Work With Us`
- **Heading**: `Let's Build Strong Trade Partnerships Together.`
- **Intro**: *Whether you are seeking supply chain resilience, market expansion, or strategic co-investment, our leadership team is ready to connect.*
- **Action**: Primary CTA button linking to `contact.html` (*Partner With Us*).
