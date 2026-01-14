# Design Guidelines: Network Troubleshooting & Subnet Calculator

## Design Approach
**Selected System**: Material Design principles adapted for technical/educational applications, inspired by developer tools like Linear, Vercel Dashboard, and technical documentation sites.

**Rationale**: Utility-focused application requiring clear information hierarchy, efficient data display, and systematic form interactions. Clean, functional design prioritizes usability over aesthetic flourishes.

## Typography System

**Font Family**: 
- Primary: Inter (via Google Fonts CDN)
- Monospace: JetBrains Mono (for IP addresses, network data, technical values)

**Hierarchy**:
- Page Headers: text-3xl font-bold (Desktop), text-2xl (Mobile)
- Section Headers: text-xl font-semibold
- Subsection/Card Titles: text-lg font-medium
- Body Text: text-base font-normal
- Input Labels: text-sm font-medium
- Technical Data/Results: text-sm font-mono
- Helper Text: text-xs

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, and 8
- Component padding: p-4 to p-6
- Section spacing: space-y-6 to space-y-8
- Card gaps: gap-4
- Form field spacing: space-y-4

**Container Structure**:
- Max width: max-w-6xl mx-auto
- Page padding: px-4 md:px-6
- Two-column layout on desktop (lg:grid-cols-2) for calculator input/results
- Single column on mobile

## Core Components

**Navigation**:
- Top navigation bar with logo and section links
- Sticky header (sticky top-0)
- Hamburger menu for mobile
- Active state indicators for current section

**Calculator Interface**:
- Left panel: Input form with clearly labeled fields
- Right panel: Results display in structured card format
- Input fields: Full-width with clear labels above
- Calculate button: Prominent, full-width on mobile, right-aligned on desktop

**Input Fields**:
- Text inputs with border, rounded corners (rounded-md)
- Focus state with ring effect
- Inline validation indicators
- Helper text beneath inputs for format guidance (e.g., "Format: 192.168.1.0")
- Monospace font for IP address inputs

**Results Display**:
- Card-based layout with subtle borders
- Key-value pairs in two-column grid
- Technical values in monospace font
- Copy-to-clipboard buttons for each result value
- Visual grouping with dividers between result sections

**Troubleshooting Interface**:
- Step-by-step accordion or expandable panels
- Checkbox indicators for completed steps
- Clear visual hierarchy for diagnostic flow
- Collapsible sections to manage information density

**Cards/Panels**:
- Subtle border treatment (border rounded-lg)
- Padding: p-6
- Shadow: shadow-sm for depth
- Organized with header and content sections

**Buttons**:
- Primary (Calculate/Submit): Solid with medium weight text
- Secondary (Reset/Clear): Outline style
- Icon buttons for copy/expand actions: Rounded with subtle hover states
- Consistent height: h-10 for standard buttons

**Icons**: Heroicons via CDN
- Calculator icon for subnet section
- Wrench/tools for troubleshooting
- Copy icon for clipboard actions
- Chevron icons for expandable sections
- Check/X icons for validation states

## Page Structure

**Hero Section** (if included):
- Clean, technical aesthetic
- Headline explaining tool purpose
- Subtitle with key benefits
- Quick-start CTA button
- Optional: Abstract network diagram illustration
- Height: 60vh on desktop, auto on mobile

**Main Calculator Section**:
- Two-column layout (input | results) on desktop
- Stacked on mobile
- Sticky results panel on desktop for long forms

**Troubleshooting Section**:
- Sequential step layout
- Expandable diagnostic categories
- Clear visual progression indicators

**Footer**:
- Minimal: Credits, GitHub link, documentation link
- Educational resources or related tools

## Responsive Behavior

**Breakpoints**:
- Mobile: base (single column, stacked layouts)
- Tablet: md (begin introducing two-column where appropriate)
- Desktop: lg (full two-column calculator layout, sidebar navigation)

**Mobile Optimizations**:
- Full-width inputs and buttons
- Collapsible sections default to closed
- Sticky calculate button at bottom
- Larger touch targets (min h-12 for interactive elements)

## Form UX Patterns

- Real-time validation with clear error messages
- Auto-formatting for IP addresses (add dots automatically)
- Clear button in inputs for quick reset
- Keyboard navigation support
- Enter key triggers calculation
- Focus management after calculation

## Data Display

- Tables for subnet ranges with alternating row treatment
- Monospace alignment for numerical columns
- Highlight important values (network address, broadcast)
- Responsive tables: horizontal scroll on mobile or card transformation

## Accessibility

- ARIA labels for all interactive elements
- Keyboard navigation throughout
- Focus indicators on all interactive elements
- Error messages announced to screen readers
- Sufficient contrast ratios for text
- Form validation tied to ARIA attributes

## Images

**Hero Section**: Optional abstract network topology illustration showing interconnected nodes/subnets - clean, minimal line art style. If included, place as background with overlay for text readability.

No additional images required - this is a data/utility-focused application where clarity trumps visual decoration.