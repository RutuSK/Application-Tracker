---
name: Academic Precision
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.5rem
    fontWeight: '700'
    lineHeight: 3rem
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.625rem
    fontWeight: '700'
    lineHeight: 2.125rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
  data-mono:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.125rem
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system serves ambitious international postgraduates navigating the strict, data-intensive terrain of German higher education (APS certification, ECTS credit mapping, uni-assist, and NC cutoffs).

The aesthetic marries **academic institutional rigor** with **high-velocity AI productivity tooling**. It borrows the systematic density of developer consoles and terminal-adjacent dashboards while retaining an ultra-polished, reassuring fintech finish. 

Key attributes:
- **Calm, High-Stakes Authority:** Replaces anxiety with structured clarity through crisp typographic hierarchy and precise data indicators.
- **Architectural Density:** Information-dense layouts without visual clutter; uses micro-borders, clean alignment lines, and distinct data badges over decorative fluff.
- **Dynamic Diagnostics:** Visual cues immediately communicate eligibility thresholds, credit mismatches, and deadline proximity using semantic status tokens.

## Colors

The palette uses a dominant dark foundation to reduce eye strain during prolonged application prep, complemented by stark high-contrast foreground surfaces:

- **Canvas & Structural Layers:**
  - Base Ground: `#0F172A` (deep slate navy canvas)
  - Surface Raised / Sidebars: `#1E293B`
  - Surface Overlay / Cards: `#334155` at low opacity or solid `#1E293B`
  - High-Contrast Light Surface (for document export views & certificates): `#FFFFFF` and `#F8FAFC`
- **Primary Accent:** `#3B82F6` (Electric Cobalt) for primary AI actions, active step states, and selected states. Hover/glow state shifts to `#2563EB` and `#60A5FA`.
- **Secondary (Admissions Clearance / Success):** `#10B981` (Emerald) for verified APS checks, credit equivalence matches, and passed requirements.
- **Tertiary (Attention / Deadlines):** `#F59E0B` (Amber) for pending document uploads, missing syllabus modules, and upcoming deadlines (<14 days).
- **Critical / Ineligible:** `#EF4444` (Crimson) for hard criteria mismatches (e.g., inadequate theoretical ECTS credits).
- **Text & Borders:**
  - Foreground High-Emphasis: `#F8FAFC`
  - Foreground Medium-Emphasis: `#94A3B8`
  - Foreground Subdued / Monospace Data: `#64748B`
  - Structural Divider: `rgba(148, 163, 184, 0.12)`

## Typography

The typography pairs **Plus Jakarta Sans** for structural headlines and milestones with **Inter** for readable, dense body copy, checklist trees, and metadata tables.

- **Headlines (Plus Jakarta Sans):** Set with tight tracking (-0.02em to -0.03em) to convey modern digital engineering confidence.
- **Body & Data Tables (Inter):** Leveraged for high legibility at 12px to 15px. Numeric values (ECTS credits, GPA conversions via modified Bavarian formula, application dates) make use of tabular figures (`font-variant-numeric: tabular-nums`) to align perfectly inside structured modules.
- **Labels & Micro-Tokens:** Set in semibold with slight positive tracking (+0.04em) in uppercase or capitalized badge styles to maintain legibility against dark slate backdrops.

## Layout & Spacing

A 12-column fluid grid anchors desktop workspace dashboards, compressing to an 8-column layout on tablet and a single-column 4-unit flow on mobile devices.

- **Breakpoints:**
  - Mobile: `< 640px` (Full-width cards, edge margin of `1rem`, compact `12px` to `16px` padding inside containers)
  - Tablet: `640px – 1024px` (Collapsible navigation, dual-pane document checklist and credit match views)
  - Desktop: `> 1024px` (Persistent navigation sidebar, centralized evaluation workspace, persistent AI context drawer)
- **Rhythm Rules:**
  - Card interiors use a compact `1rem` (16px) padding rule on mobile to maximize viewport density for long course requirements.
  - Micro-spacing (`0.25rem` – `0.5rem`) controls relations between badge tags, checklist icons, and credit chips.
  - Section-to-section flows maintain `1.5rem` to `2rem` vertical breathing room.

## Elevation & Depth

Visual hierarchy uses **tonal layer stepping** paired with **crisp low-contrast outlines** rather than heavy drop shadows:

- **Level 0 (App Canvas):** Pure background `#0F172A`.
- **Level 1 (Standard Card / Section Layer):** `#1E293B` bounded by a 1px hairline border of `rgba(255, 255, 255, 0.08)`.
- **Level 2 (Interactive Floating / Active Item):** `#1E293B` with border `rgba(59, 130, 246, 0.35)` and a soft cobalt ambient halo (`box-shadow: 0 4px 20px -2px rgba(59, 130, 246, 0.12)`).
- **Level 3 (Modals / Flyouts / Command K):** High-density surface `#1E293B` backed by a 12px blur backdrop (`backdrop-filter: blur(12px); background: rgba(15, 23, 42, 0.85)`), ringed with `rgba(255, 255, 255, 0.12)` and a deep grounding shadow (`0 20px 35px -5px rgba(0, 0, 0, 0.5)`).

## Shapes

The design system maintains controlled roundedness:
- Cards, containers, modal dialogues, and evaluation tiles consistently adopt `12px` to `16px` (`0.75rem` to `1rem`) corner radii.
- Form inputs, action buttons, and segmented controls use `8px` (`0.5rem`) for a tailored, utilitarian instrument feel.
- Badge indicators, status pills, and counter tags leverage full pill radii (`9999px`) to create clear differentiation between data markers and clickable functional containers.

## Components

### Buttons
- **Primary Action (e.g., "Run ECTS Analysis", "Sync uni-assist"):** Background `#3B82F6`, text `#FFFFFF`, font `label-md`. 8px border-radius. Subtle top-edge inner highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.2)`). Hover: `#2563EB`. Active: Scale to `0.98`.
- **Secondary / Ghost:** Background `rgba(30, 41, 59, 0.6)`, border `1px solid rgba(148, 163, 184, 0.2)`, text `#F8FAFC`. Hover: Border `#94A3B8`.
- **Destructive:** Border `1px solid rgba(239, 68, 68, 0.3)`, text `#EF4444`, background `rgba(239, 68, 68, 0.08)`.

### Badge Pills & Status Tags
- **Eligible / Matched:** Emerald tint `rgba(16, 185, 129, 0.12)`, text `#10B981`, border `1px solid rgba(16, 185, 129, 0.25)`. Pill radius. Includes a leading 6px glowing indicator dot.
- **Review Required / Missing:** Amber tint `rgba(245, 158, 11, 0.12)`, text `#F59E0B`, border `1px solid rgba(245, 158, 11, 0.25)`.
- **Deficit / Incompatible:** Crimson tint `rgba(239, 68, 68, 0.12)`, text `#EF4444`, border `1px solid rgba(239, 68, 68, 0.25)`.
- **Neutral Attribute (e.g., "English C1", "Wintersemester"):** Slate tint `rgba(148, 163, 184, 0.1)`, text `#94A3B8`, border `1px solid rgba(148, 163, 184, 0.15)`.

### Progress Bars (ECTS Equivalence & APS Milestones)
- Dual-segment progress bar with base track `#0F172A` (or `rgba(255, 255, 255, 0.06)`), height `8px`, rounded `9999px`.
- Fill track dynamically blends or steps into `#3B82F6` (completed modules) and `#10B981` (verified transferred credits). If deficit exists against requirements, target milestone indicator displays as a vertical `#F59E0B` tick line.

### Document Checklist Items
- Compact card row: `16px` padding, flexbox alignment, 12px rounded corners, background `#1E293B`, border `1px solid rgba(255, 255, 255, 0.06)`.
- Interactive custom square checkbox (20x20px, 6px radius) with checkmark animation on complete.
- Micro-actions pinned right: quick-preview icon button, AI extraction validation pill, and upload timestamp in `data-mono`.

### Structured Credit Tables
- Alternating subtle rows (`#1E293B` and `#182234`), 1px bottom border `rgba(148, 163, 184, 0.08)`.
- Numeric columns (Indian Credits, Conversion Multiplier, Resulting ECTS) right-aligned using tabular figures with high vertical padding efficiency (`10px 14px`).

### Cards & AI Assistant Prompts
- Background `#1E293B`, 12px–16px border-radius, `16px` inner padding on mobile, `24px` on desktop.
- AI Chat / Co-pilot input: High-contrast field `#0F172A`, integrated prompt suggestions as horizontal scrolling pill chips with cobalt focus rings.