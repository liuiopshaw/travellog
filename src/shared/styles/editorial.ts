// 旅记 TravelLog — Editorial Design System Tokens
// Style: Swiss Modernism 2.0 / Editorial Magazine
// Fonts: Noto Serif SC (headings) + Noto Sans SC (body)

// ── Color System ──
// Monochrome #1C1C1C palette with opacity tiers
// Warm beige #F9F8F6 background (paper-like)

export const Colors = {
  // Background
  bg: '#F9F8F6' as const,
  bgAlt: '#FFFFFF' as const,

  // Text — single source color #1C1C1C (soft black, never pure #000)
  text: '#1C1C1C' as const,

  // Opacity tiers (used as rgba or with opacity modifier)
  textPrimary: '#1C1C1C' as const,       // 100% — primary text
  textSecondary: 'rgba(28,28,28,0.80)' as const, // 80% — body text
  textTertiary: 'rgba(28,28,28,0.60)' as const,  // 60% — meta info
  textMuted: 'rgba(28,28,28,0.40)' as const,     // 40% — auxiliary
  textDisabled: 'rgba(28,28,28,0.10)' as const,  // 10% — placeholder

  // Borders — opacity-based on #1C1C1C
  border: 'rgba(28,28,28,0.10)' as const,        // default border
  borderHover: '#1C1C1C' as const,               // hover/focus border (full)
  borderAccent: 'rgba(28,28,28,0.20)' as const,  // slightly stronger

  // Interactive
  surfaceActive: 'rgba(28,28,28,0.05)' as const, // press/hover surface
  overlay: 'rgba(28,28,28,0.40)' as const,       // modal overlay

  // Feedback (monochrome-editorial — no bright colors)
  success: '#1C1C1C' as const,
  error: '#1C1C1C' as const,  // Uses border accent + bold weight, not red
  info: '#1C1C1C' as const,

  // Platform
  white: '#FFFFFF' as const,
  black: '#1C1C1C' as const,
} as const;

// ── Typography System ──
// Noto Serif SC (serif) — headings, titles, hero
// Noto Sans SC (sans-serif) — body, labels, UI
// JetBrains Mono (monospace) — numbers, data, code

export const Fonts = {
  serif: {
    regular: 'NotoSerifSC-Regular',
    medium: 'NotoSerifSC-Medium',
    semiBold: 'NotoSerifSC-SemiBold',
    bold: 'NotoSerifSC-Bold',
  },
  sans: {
    light: 'NotoSansSC-Light',
    regular: 'NotoSansSC-Regular',
    medium: 'NotoSansSC-Medium',
    semiBold: 'NotoSansSC-SemiBold',
    bold: 'NotoSansSC-Bold',
  },
  mono: {
    regular: 'JetBrainsMono-Regular',
  },
} as const;

// ── Type Scale ──
// Editorial hierarchy: Hero → H1 → H2 → H3 → Body → Small → Caption

export const TypeScale = {
  hero: {
    fontSize: 36,
    lineHeight: 44,
    fontFamily: 'serif',
    fontWeight: 'bold' as const,
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: 28,
    lineHeight: 36,
    fontFamily: 'serif',
    fontWeight: 'bold' as const,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 22,
    lineHeight: 30,
    fontFamily: 'serif',
    fontWeight: 'semiBold' as const,
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: 'serif',
    fontWeight: 'semiBold' as const,
    letterSpacing: -0.1,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    fontFamily: 'sans',
    fontWeight: 'regular' as const,
    letterSpacing: 0,
  },
  bodySmall: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'sans',
    fontWeight: 'regular' as const,
    letterSpacing: 0,
  },
  label: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: 'sans',
    fontWeight: 'medium' as const,
    letterSpacing: 2.4, // 0.2em ≈ 2.4px at 12px
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: 'mono',
    fontWeight: 'regular' as const,
    letterSpacing: 0,
  },
} as const;

// ── Spacing System ──
// Based on 4pt grid. Section spacing is generous per Editorial style.

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,

  // Semantic
  sectionY: 48,        // py-16 equivalent (scaled for mobile)
  sectionYLarge: 64,   // py-24
  containerX: 24,      // px-6
  containerXWide: 48,  // px-12
  cardPadding: 24,     // p-6
  stackSm: 12,         // gap-4
  stackMd: 24,         // gap-8
  stackLg: 32,         // gap-12
} as const;

// ── Border System ──
// ALL borders use #1C1C1C with opacity. NEVER use rounded corners.
// NEVER use shadow. NEVER use gradient backgrounds.

export const Borders = {
  // Width
  thin: 1,
  thick: 2,

  // Radius — FORCED to 0 for Editorial hard-edge aesthetic
  radius: 0, // ALWAYS 0 — rounded-none everywhere

  // Border color presets
  default: 'rgba(28,28,28,0.10)',
  hover: '#1C1C1C',
  accent: 'rgba(28,28,28,0.20)',
  focus: '#1C1C1C',
} as const;

// ── Animation Tokens ──
// Editorial motion: subtle, refined, never decorative

export const Animation = {
  duration: {
    fast: 150,     // micro-interactions
    normal: 200,   // standard transitions
    slow: 300,     // deliberate reveals
    image: 700,    // image hover scale (per spec)
  },
  easing: {
    default: 'ease-out' as const,
    enter: 'ease-out' as const,
    exit: 'ease-in' as const,
  },
  scale: {
    press: 0.95,   // active:scale-95
    hover: 1.05,   // image hover scale
  },
} as const;

// ── Hit Targets (Touch) ──
// iOS minimum 44pt, minimum 8pt spacing between targets

export const Touch = {
  minSize: 44,
  minSpacing: 8,
} as const;

// ── Component Presets ──
// These are the "REQUIRED" class equivalents translated to RN styles

export const ComponentPresets = {
  // Primary button: black bg → white text
  buttonPrimary: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.black,
    borderWidth: 0,
  },
  // Secondary button: outline
  buttonSecondary: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: 'transparent',
    borderWidth: Borders.thin,
    borderColor: Borders.default,
  },
  // Text button: minimal
  buttonText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  // Card
  card: {
    padding: Spacing.cardPadding,
    borderWidth: Borders.thin,
    borderColor: Borders.default,
    backgroundColor: Colors.bgAlt,
  },
  // Input
  input: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderWidth: Borders.thin,
    borderColor: Borders.default,
    backgroundColor: 'transparent',
    fontSize: TypeScale.body.fontSize,
    lineHeight: TypeScale.body.lineHeight,
  },
  // Section
  section: {
    paddingVertical: Spacing.sectionY,
    paddingHorizontal: Spacing.containerX,
  },
} as const;

// ── FORBIDDEN Values (for runtime/stylelint checks) ──
// These MUST NOT appear in any component styles

export const FORBIDDEN = {
  borderRadius: 'NEVER use borderRadius except 0' as const,
  shadow: 'NEVER use shadow* styles' as const,
  gradient: 'NEVER use gradient backgrounds' as const,
  coloredBackgrounds: 'NEVER use bg-blue-*, bg-green-*, bg-yellow-*, bg-red-*, etc.' as const,
  roundedClasses: 'NEVER use rounded-sm, rounded, rounded-md, rounded-lg, rounded-xl, rounded-2xl, rounded-3xl, rounded-full' as const,
  shadowClasses: 'NEVER use shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl, shadow-2xl' as const,
  thickBorders: 'NEVER use border-2, border-4, border-8' as const,
  emojiIcons: 'NEVER use emoji as UI icons — use @expo/vector-icons instead' as const,
} as const;

// ── Helper: build a complete text style ──

export function editorialText(
  level: keyof typeof TypeScale,
  overrides: Record<string, any> = {},
) {
  const scale = TypeScale[level];
  const familyKey = scale.fontFamily as 'serif' | 'sans' | 'mono';
  const weightMap: Record<string, Record<string, string>> = {
    serif: Fonts.serif,
    sans: Fonts.sans,
    mono: Fonts.mono,
  };

  const weight = scale.fontWeight;
  let fontName: string;
  if (familyKey === 'serif') {
    fontName = weight === 'bold' ? Fonts.serif.bold
      : weight === 'semiBold' ? Fonts.serif.semiBold
      : weight === 'medium' ? Fonts.serif.medium
      : Fonts.serif.regular;
  } else if (familyKey === 'sans') {
    fontName = weight === 'bold' ? Fonts.sans.bold
      : weight === 'semiBold' ? Fonts.sans.semiBold
      : weight === 'medium' ? Fonts.sans.medium
      : (weight === 'light' as any) ? Fonts.sans.light
      : Fonts.sans.regular;
  } else {
    fontName = Fonts.mono.regular;
  }

  return {
    fontFamily: fontName,
    fontSize: scale.fontSize,
    lineHeight: scale.lineHeight,
    letterSpacing: scale.letterSpacing,
    color: Colors.text,
    ...overrides,
  };
}
