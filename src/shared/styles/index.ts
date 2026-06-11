// 旅记 TravelLog — Shared Styles Index
// Unified export of all Editorial Design System modules

export {
  Colors,
  Fonts,
  TypeScale,
  Spacing,
  Borders,
  Animation,
  Touch,
  ComponentPresets,
  FORBIDDEN,
  editorialText,
} from './editorial';

export {
  checkEditorialStyle,
  getAllViolations,
  resetViolations,
  runEditorialChecklist,
} from './forbidden';

export type { StyleViolation } from './forbidden';

export { useEditorialFonts } from './fonts';
