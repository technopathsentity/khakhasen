// Palette:
// #FFF6EA  cream background
// #FFD230  signature yellow (primary)
// #242020  deep charcoal (primary text / dark surfaces)
// #000000  true black (accents, borders, high-contrast text)

export const colors = {
  // Surfaces
  background: '#FFF6EA',       // app background (warm cream)
  card: '#FFFFFF',             // elevated cards on cream
  surfaceDark: '#242020',      // premium dark cards / hero panels
  surfaceBlack: '#000000',     // accent bars, badges, deepest surfaces

  // Brand
  primary: '#FFD230',          // signature yellow
  primaryDark: '#E6B800',      // pressed / hover state for yellow
  onPrimary: '#242020',        // text/icons on yellow

  // Text
  text: '#242020',             // primary text on light bg
  textInverse: '#FFF6EA',      // text on dark/black surfaces
  textMuted: '#6B655F',        // secondary text on light bg
  textMutedInverse: '#B8B2AA', // secondary text on dark bg

  // Feedback
  success: '#1F8A4C',
  danger:  '#C0392B',
  warning: '#E6B800',

  // Lines & subtle fills
  border: '#EADFC7',           // hairline on cream
  borderStrong: '#242020',     // premium 1px black outline
  divider: 'rgba(36, 32, 32, 0.08)',
  overlay: 'rgba(36, 32, 32, 0.55)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const typography = {
  display: { fontSize: 34, fontWeight: '800' as const, letterSpacing: -0.8, color: colors.text },
  h1:      { fontSize: 24, fontWeight: '700' as const, letterSpacing: -0.4, color: colors.text },
  h2:      { fontSize: 18, fontWeight: '700' as const, color: colors.text },
  body:    { fontSize: 14, fontWeight: '500' as const, color: colors.text },
  caption: { fontSize: 12, fontWeight: '500' as const, color: colors.textMuted },
  label:   { fontSize: 11, fontWeight: '700' as const, letterSpacing: 1, textTransform: 'uppercase' as const, color: colors.textMuted },
};

export const shadow = {
  card: {
    shadowColor: '#242020',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  premium: {
    shadowColor: '#000000',
    shadowOpacity: 0.14,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
};
