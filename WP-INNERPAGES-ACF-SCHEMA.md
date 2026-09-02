# WordPress Inner Pages & ACF Architecture Specification

This document details how all inner pages and their individual sections are structured for WordPress conversion, ensuring full administrator control to **add, edit, update, reorder, or delete** any section or content element.

---

## 1. Banner Architecture (Isolated Reusable Template Parts)

All inner page banners/heroes are separated into modular template parts located in `parts/`:

| HTML Source Part | WordPress Template Part | Purpose |
|---|---|---|
| `parts/banner-inner.html` | `template-parts/banner-inner.php` | Standard pages (About Us, CSR, Contact, etc.) |
| `parts/banner-company.html` | `template-parts/banner-company.php` | Company detail pages (`single-company.php`) |

### In WordPress:
```php
<?php
// On standard pages:
get_template_part( 'template-parts/banner', 'inner' );

// On company pages:
get_template_part( 'template-parts/banner', 'company' );
?>
```

### Banner ACF Fields (`banner_fields` / `company_banner_fields`):
| Field Label | Field Name | Type | Options / Instructions |
|---|---|---|---|
| **Background Image** | `banner_bg_image` | Image | Return Format: Image Array or ID |
| **Watermark Text** | `banner_watermark` | Text | E.g. "ABOUT US", "GENERAL TRADING" |
| **Breadcrumb Title** | `breadcrumb_custom_title` | Text | Optional override for breadcrumb |
| **Sector / Eyebrow Tag** | `banner_sector_tag` | Text | Category or sector tag |
| **Page Title** | `banner_title` | Text / Textarea | Page H1 title (defaults to `get_the_title()`) |
| **Positioning / Subtitle** | `banner_text` | Textarea | Short introductory paragraph |

---

## 2. Company Detail Pages (`single-company.php`)

All 6 company detail pages use a shared `single-company.php` template driven by an ACF Flexible Content field: `company_page_sections`. This allows the administrator to:
- **Add** any section at will.
- **Delete** any section without breaking the layout.
- **Update** every headline, paragraph, badge, number, link, and photo.
- **Reorder** sections via drag-and-drop.

### Flexible Content Layouts Overview

```
Flexible Content Field: company_page_sections
├── Layout 01: section_intro (Company Overview)
├── Layout 02: section_story (Journey / Timeline Steps)
├── Layout 03: section_areas (Core Business / Service Panels)
├── Layout 04: section_value_prop (Value Proposition Highlight)
├── Layout 05: section_markets (Operational Footprint Cards)
├── Layout 06: section_showcase (Visual Editorial Photo Grid)
├── Layout 07: section_ecosystem (Group Integration Chain & Links)
└── Layout 08: section_cta (Call to Action Banner)
```

---

## 3. Section-by-Section Field Definitions

### Section 02: Company Introduction (`section_intro`)
- **Eyebrow Text** (`intro_eyebrow` - Text): default "Company Overview"
- **Section Heading** (`intro_heading` - Text): e.g. "About [Company Name]"
- **Lead Statement** (`intro_statement` - Textarea): Large editorial callout paragraph.
- **Narrative Content** (`intro_narrative` - WYSIWYG Editor): Detailed descriptive copy.
- **Operational Photo** (`intro_photo` - Image): High-res wide operational photo.

### Section 03: Company Story (`section_story`)
- **Eyebrow Text** (`story_eyebrow` - Text): default "Our Journey"
- **Heading** (`story_heading` - Text): default "Built With Purpose"
- **Subheading** (`story_subheading` - Textarea): Introductory sentence.
- **Watermark** (`story_watermark` - Text): e.g. "PURPOSE"
- **Timeline Steps Repeater** (`story_steps` - Repeater):
  - `step_badge` (Text): e.g. "Phase 01 / Foundation"
  - `step_title` (Text): e.g. "Origin", "Development", "Current Role"
  - `step_text` (Textarea): Descriptive summary of that phase.

### Section 04: Business / Service Areas (`section_areas`)
- **Eyebrow Text** (`areas_eyebrow` - Text): e.g. "Core Business" / "Core Capabilities"
- **Heading** (`areas_heading` - Text): e.g. "Key Trading Areas" / "Key Service Areas"
- **Subheading** (`areas_subheading` - Textarea)
- **Watermark** (`areas_watermark` - Text): e.g. "TRADING" / "SERVICES"
- **Panels Repeater** (`area_panels` - Repeater, 1-4 items):
  - `panel_photo` (Image): Landscape card photo.
  - `panel_number` (Text): e.g. "01", "02", "03", "04"
  - `panel_title` (Text): Area title.
  - `panel_description` (Textarea): Explanatory copy.

### Section 05: Key Capability / Value Proposition (`section_value_prop`)
- **Eyebrow Text** (`value_eyebrow` - Text): default "Core Advantage"
- **Heading** (`value_heading` - Text): Signature capability headline.
- **Description** (`value_description` - Textarea): Detailed value proposition copy.
- **Watermark** (`value_watermark` - Text): default "CAPABILITY"

### Section 06: Markets & Operational Reach (`section_markets`)
- **Eyebrow Text** (`markets_eyebrow` - Text): default "Geographic Footprint"
- **Heading** (`markets_heading` - Text): default "Markets & Operational Reach"
- **Subheading** (`markets_subheading` - Textarea)
- **Watermark** (`markets_watermark` - Text): default "REACH"
- **Market Cards Repeater** (`markets_list` - Repeater):
  - `market_icon` (Select or SVG Textarea): Globe, Port, Building, Route, etc.
  - `market_title` (Text): Location or Corridor title.
  - `market_text` (Textarea): Operational description.

### Section 07: Visual Showcase (`section_showcase`)
- **Eyebrow Text** (`showcase_eyebrow` - Text): default "Operations in Motion"
- **Heading** (`showcase_heading` - Text): e.g. "Trading & Logistics Showcase"
- **Watermark** (`showcase_watermark` - Text): default "OPERATIONS"
- **Lead Image** (`showcase_lead_image` - Image): Large featured photo (left/wide).
- **Side Images** (`showcase_side_images` - Gallery / 2 Images): Two stacked secondary photos.

### Section 08: Part of Altysier Group (`section_ecosystem`)
- **Eyebrow Text** (`ecosystem_eyebrow` - Text): default "Group Integration"
- **Heading** (`ecosystem_heading` - Text): default "Part of a Bigger Business Ecosystem"
- **Subheading** (`ecosystem_subheading` - Textarea)
- **Watermark** (`ecosystem_watermark` - Text): default "ECOSYSTEM"
- **Ecosystem Nodes** (`ecosystem_node_company`, `ecosystem_node_sector`, `ecosystem_node_group` - Text): Labels in the connection chain.
- **Other Companies Selection** (`related_companies` - Relationship field):
  - Filters by post type `company` (excluding current post).
  - Automatically queries and renders the title, sector, and permalink.

### Section 09: Call to Action (`section_cta`)
- **Background Image** (`cta_bg_image` - Image)
- **Eyebrow Text** (`cta_eyebrow` - Text): default "Work With Us"
- **Heading** (`cta_heading` - Text): default "Let's Build Stronger Partnerships Together."
- **Description** (`cta_text` - Textarea)
- **Button Label** (`cta_btn_label` - Text): default "Contact Us"
- **Button Link** (`cta_btn_link` - Link / URL): default `/contact/`
- **Watermark** (`cta_watermark` - Text): default "PARTNERSHIP"

---

## 4. About Us Page (`page-about.php`)

Similarly, `about.html` maps to `page-about.php` with modular layouts:
1. `template-parts/banner-inner.php` (Inner Hero / Banner)
2. `template-parts/about/intro.php` (Who We Are statement + narrative + photo)
3. `template-parts/about/purpose.php` (Vision, Mission, Leadership Commitments)
4. `template-parts/about/pillars.php` (4 Strategic Pillars with icon + title + copy)
5. `template-parts/about/culture.php` (Culture & Values with hover red fill animation)
6. `template-parts/about/timeline.php` (Milestone History timeline)
7. `template-parts/about/ecosystem.php` (Governance & Group operating model)
8. `template-parts/about/cta.php` (Partnership Call to Action)

## 5. CSR & Sustainability Page (`page-csr.php`)

`csr.html` maps to `page-csr.php` using Flexible Content layouts for the 4 established pillars plus group impact:
1. `template-parts/banner-inner.php`: Reusable Inner Hero (`banner_bg_image`, `watermark_text`, `breadcrumbs`, `page_title`, `lead_text`).
2. `csr_ethical_business` (Pillar 01 · Doing Business the Right Way):
   - Eyebrow (`ethical_eyebrow` - Text)
   - Title (`ethical_heading` - Text)
   - Editorial Statement (`ethical_statement` - Textarea)
   - Supporting Narrative (`ethical_narrative` - WYSIWYG)
   - Principles Repeater (`ethical_principles` - Repeater): `number`, `title`, `text`
3. `csr_economic_growth` (Pillar 02 · Creating Opportunity. Supporting Growth.):
   - Statement (`economic_statement` - Textarea)
   - Lead copy (`economic_lead` - Textarea)
   - Photo (`economic_photo` - Image)
   - Points Repeater (`economic_points` - Repeater): `title`, `desc`
4. `csr_food_security` (Pillar 03 · Strengthening Food Security):
   - Statement (`food_statement` - Textarea)
   - Lead copy (`food_lead` - Textarea)
   - Photo (`food_photo` - Image)
   - Points Repeater (`food_points` - Repeater): `title`, `desc`
5. `csr_environmental` (Pillar 04 · Operating With Greater Responsibility):
   - Eyebrow, Heading, Subheading
   - Operational Initiatives Repeater (`env_initiatives` - Repeater): `photo`, `number`, `title`, `desc`
6. `csr_group_impact` (Integrated Group Impact):
   - Group Impact Cards Repeater (`group_impact_cards` - Repeater): `source`, `arrow`, `target`, `title`, `text`, `link`
7. `csr_cta` (Partner With Purpose CTA):
   - Editable background image, watermark, eyebrow, heading, text, button label & link

## 6. Contact Us Page (`page-contact.php`)

`contact.html` maps to `page-contact.php` with modular layouts:
1. `template-parts/banner-inner.php`: Reusable Inner Hero (`banner_bg_image`, `watermark_text`, `breadcrumbs`, `page_title`, `lead_text`).
2. `contact_locations` (Section 02 · Our Strategic Locations):
   - Eyebrow (`locations_eyebrow` - Text)
   - Title (`locations_heading` - Text)
   - Subheading (`locations_subheading` - Textarea)
   - Watermark (`locations_watermark` - Text): "PRESENCE"
   - Dubai Card (`dubai_location` - Group): `bg_image`, `city`, `role`, `address`, `phone`, `email`
   - Khartoum Card (`khartoum_location` - Group): `bg_image`, `city`, `role`, `address`, `phone`, `email`
3. `contact_form` (Section 03 · Direct Engagement):
   - Eyebrow (`form_eyebrow` - Text)
   - Title (`form_heading` - Text)
   - Statement (`statement` - Textarea)
   - Description (`description` - Textarea)
   - Form Shortcode (`form_embed` - Text): WPForms / Contact Form 7 integration
4. `b2b_enquiries` (Section 04 · Engagement Pathways):
   - Eyebrow, Title, Subheading
   - Routes Repeater (`b2b_routes` - Repeater): `icon`, `title`, `text`, `action_label`, `action_subject`
5. `contact_maps` (Section 05 · Geographic Coordinates):
   - Dubai Map Embed (`dubai_map_embed` - Textarea / iframe)
   - Khartoum Map Embed (`khartoum_map_embed` - Textarea / iframe)
6. `contact_cta` (Section 06 · Final Partnership CTA):
   - Editable background, watermark, eyebrow, heading, text, button

---

## 7. 404 Error Page (`404.php`)

`404.html` maps directly to `404.php`:
- Editable background image
- Error code (`404`) and title (`Destination Unavailable`)
- Explanation copy
- Dynamic quick links pointing to core site areas (Home, About, Companies, CSR, Contact)

All sections include corresponding `data-wp-section` and `data-wp-field` semantic attributes in the static markup for zero-guesswork developer implementation.
