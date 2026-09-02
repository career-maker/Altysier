# WordPress Conversion & CRUD Section Design Rules

When designing, coding, and updating any HTML pages, inner templates, components, or blocks for Altysier Group, adhere strictly to these rules so that converting the static website into a fully functional WordPress theme (ACF Pro Flexible Content / Gutenberg / Block Theme) allows site administrators to **Add, Edit, Update, Reorder, and Delete every single section, image, and text block**.

---

## 1. Modular Inner Page Banners
- **Banner Separation**: Banners must never be hard-coded into individual page layouts without modular structure.
- **Two Reusable Banner Template Parts**:
  1. `template-parts/banner-inner.php` (for general inner pages: About Us, CSR, Contact, 404, etc.):
     - Background image (`banner_bg_image` - Image)
     - Watermark background typography (`watermark_text` - Text)
     - Breadcrumb navigation (`breadcrumbs` - Array/Object)
     - Section eyebrow (`banner_eyebrow` - Text)
     - Page Title (`page_title` - Text)
     - Supporting positioning statement (`lead_text` - Textarea)
  2. `template-parts/banner-company.php` (for subsidiary company detail pages):
     - Background image (`banner_bg_image` - Image)
     - Watermark background typography (`watermark_text` - Text)
     - Breadcrumb navigation (`breadcrumbs` - Array/Object)
     - Sector pill tag (`sector_tag` - Text)
     - Company Title (`company_title` - Text)
     - Company positioning statement (`positioning_statement` - Textarea)

---

## 2. Universal Semantic Data Attributes
Every section, field, repeater, and post relation must be annotated with clear `data-wp-*` attributes:
- `data-wp-section="<layout_name>"`: Corresponds 1:1 with an ACF Flexible Content layout name or Gutenberg Block name (e.g. `inner_banner`, `contact_locations`, `contact_form`, `b2b_enquiries`, `location_maps`, `contact_cta`).
- `data-wp-field="<field_name>"`: Corresponds 1:1 with an ACF sub-field (e.g. `heading`, `eyebrow`, `statement`, `photo`, `btn_label`, `btn_url`).
- `data-wp-repeater="<repeater_name>"`: Wraps any loop of repeatable items (e.g. `story_steps`, `area_panels`, `locations_list`, `partnership_routes`).
- `data-wp-item="<item_name>"`: Applied to each repeatable child inside the loop.
- `data-wp-relationship="<cpt_name>"`: Applied to relationship fields linking to Custom Post Types (e.g., `related_companies` linking to `company` CPT).

---

## 3. WordPress Admin Full CRUD Capability Checklist
For every section created, verify that a non-technical WordPress editor can:
1. **Edit Text**: Headings, eyebrows, descriptions, and buttons are editable via standard Text or Textarea fields.
2. **Replace Images**: Background images, editorial photos, and card thumbnails are editable via standard Image fields with responsive sizes.
3. **Add/Delete Items**: Grid items, value cards, timeline steps, FAQ items, and company highlights use ACF Repeaters with `row_min` and `row_max` controls.
4. **Reorder Sections**: Sections are built as independent Flexible Content layouts so admins can drag and drop sections up or down on the page.
5. **Hide/Toggle Sections**: Admins can remove or deactivate any optional section without breaking layout styling or JavaScript.

---

## 4. Reusable Template Parts Consistency
- Always use common header: `parts/header.html` (`template-parts/header.php`).
- Always use common footer: `parts/footer.html` (`template-parts/footer.php`).
- Maintain consistent design system tokens: `var(--ink)`, `var(--paper)`, `var(--accent)`, typography (`Bebas Neue`, `Oswald`, `Inter`), spacing scale, watermarks, and reveal animations.
- All forms must map cleanly to WordPress Contact Form 7 or WPForms with semantic field names.
