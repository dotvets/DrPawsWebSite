# DR PAWS VETERINARY CLINIC - HOMEPAGE DESIGN GUIDELINES

## Design Approach
**Reference-Based**: Veterinary clinic with established brand identity requiring exact adherence to provided brand guidelines. Drawing inspiration from healthcare/wellness sites like Zocdoc and modern service providers with warm, trustworthy aesthetics.

## Brand Colors (Exact HSL Format)
**Primary Colors:**
- Pigment Green: 143 76% 38% (rgb(24, 172, 97) / #18ac61)
- Charcoal: 199 37% 24% (rgb(38, 70, 83) / #264653)

**Accent Colors:**
- Saffron: 43 75% 66% (rgb(233, 196, 106) / #e9c46a)
- Sandy Brown: 27 87% 67% (rgb(244, 162, 97) / #f4a261)

**Usage:**
- Primary CTA buttons: Pigment Green backgrounds with white text
- Headings: Charcoal for strong contrast
- Warm accents: Saffron and Sandy Brown for highlights, icons, and decorative elements
- Light backgrounds: Off-white (#fdfcfb) with subtle warmth
- Dark mode not required for this veterinary clinic site

## Typography
**Primary (Headlines):** Rubik
- H1: 3.5rem (56px) / font-medium
- H2: 2.25rem (36px) / font-medium
- H3: 1.5rem (24px) / font-normal

**Secondary (Body):** Poppins
- Body large: 1.125rem (18px) / font-normal / line-height relaxed
- Body regular: 1rem (16px) / font-normal
- Small text: 0.875rem (14px) / font-light

**Font Loading:** Via Google Fonts CDN
- Rubik: weights 400, 500
- Poppins: weights 300, 400, 600, 700

## Layout System
**Spacing Scale:** Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Section padding: py-20 (desktop), py-12 (mobile)
- Container max-width: max-w-7xl
- Content sections: max-w-6xl
- Card spacing: gap-8 (desktop), gap-6 (mobile)

## Component Library

### Hero Section with Slider
- Full-width background slider with veterinary clinic imagery
- Overlay: Charcoal gradient (from 199 37% 24% / 0.7 to 199 37% 24% / 0.4)
- Centered content with max-w-4xl
- Headline: Rubik 3.5rem white
- Subheadline: Poppins 1.5rem white/90% opacity
- Subtext: Poppins 1.125rem white/80% opacity
- CTA: Large button (px-8 py-4) Pigment Green background, white text, rounded-lg
- Height: 85vh with flex centering

### Introduction/About Section
- Two-column grid (image left, content right on desktop, stacked mobile)
- Headline: Rubik 2.25rem Charcoal
- Body text: Poppins 1.125rem Charcoal/80%
- Background: White
- Image: Warm, professional veterinary care photo with rounded-xl corners
- CTA: Outline button with Pigment Green border

### Service Categories Section
- Background: Subtle warm gradient (Saffron at 5% opacity)
- Headline: Rubik 2.25rem Charcoal, centered
- Intro paragraph: Poppins 1.125rem, centered, max-w-3xl
- Service cards: 3-column grid (2-col tablet, 1-col mobile)
- Card design: White background, rounded-xl, shadow-md, hover:shadow-lg transition
- Card icons: Sandy Brown colored, 48px size
- Card titles: Poppins 1.25rem Charcoal bold
- Card descriptions: Poppins 1rem Charcoal/70%

### Why Choose Us Section
- Background: White
- Headline: Rubik 2.25rem Charcoal, centered
- 2x2 grid of feature cards (desktop), 1-column (mobile)
- Feature cards: Icon (Pigment Green), title (Poppins 1.125rem bold), description
- Icons: Use Heroicons for consistent style
- Spacing: gap-12 between cards

### Contact Form Section
- Background: Charcoal dark
- Two-column layout (form left, info right on desktop)
- Headline: Rubik 2.25rem white
- Form styling:
  - Input fields: White backgrounds, border border-gray-300, rounded-lg, px-4 py-3
  - Labels: Poppins white/90%
  - Textarea: min-h-32
  - Submit button: Pigment Green background, white text, full-width, py-4
- Right column: Contact information in white text with icons

### Footer
- Background: Charcoal
- Three-column grid (logo/tagline, contact info, hours)
- Logo: White version
- Text: Poppins 0.875rem white/80%
- Section headings: Poppins 1rem white bold
- Contact details with icons (Heroicons)
- Social media: Icon row with hover:opacity-80 transition
- Bottom copyright bar: Charcoal darker shade, centered text

## Images
**Hero Slider (3 images):**
1. Veterinarian examining a happy golden retriever in bright, modern clinic
2. Compassionate vet with cat owner consultation in warm, welcoming room
3. State-of-the-art veterinary equipment and clean examination room

**About Section Image:**
Professional veterinary team photo with diverse staff showing warmth and expertise

**Service Cards:**
Use Heroicons for service category icons (stethoscope, heart, clipboard, etc.)

## Animations
Minimal, professional animations:
- Hero slider: 6-second fade transitions
- Buttons: hover:scale-105 subtle lift
- Service cards: hover:shadow-lg smooth transition
- Scroll-triggered fade-ins for sections (opacity 0 to 1, 0.6s ease)

## Accessibility
- Maintain WCAG AA contrast ratios (all combinations pass)
- Focus states: 2px Pigment Green outline with offset
- Touch targets: minimum 44px height for mobile
- Alt text for all images describing veterinary context
- Semantic HTML structure with proper heading hierarchy