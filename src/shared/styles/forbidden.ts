// 旅记 TravelLog — Editorial Style Compliance Checker
// Runtime and development-time checks to enforce FORBIDDEN rules.
// Run: checkEditorialStyle(componentName, styleObject) before render.

import { Colors, Borders, FORBIDDEN } from './editorial';

export interface StyleViolation {
  component: string;
  rule: string;
  message: string;
  actual: any;
}

const violations: StyleViolation[] = [];

/**
 * Check a style object against Editorial FORBIDDEN rules.
 * Returns violations array. Empty array = compliant.
 */
export function checkEditorialStyle(
  componentName: string,
  style: Record<string, any>,
): StyleViolation[] {
  const issues: StyleViolation[] = [];

  // 1. Border radius check
  if (style.borderRadius !== undefined && style.borderRadius !== 0) {
    issues.push({
      component: componentName,
      rule: 'NO rounded corners',
      message: FORBIDDEN.borderRadius,
      actual: `borderRadius: ${style.borderRadius}`,
    });
  }

  // 2. Shadow check
  const shadowProps = ['shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius', 'elevation'];
  for (const prop of shadowProps) {
    if (style[prop] !== undefined) {
      issues.push({
        component: componentName,
        rule: 'NO shadows',
        message: FORBIDDEN.shadow,
        actual: `${prop}: ${style[prop]}`,
      });
    }
  }

  // 3. Gradient check (backgroundImage with linear-gradient)
  if (typeof style.backgroundImage === 'string' && style.backgroundImage.includes('gradient')) {
    issues.push({
      component: componentName,
      rule: 'NO gradients',
      message: FORBIDDEN.gradient,
      actual: style.backgroundImage,
    });
  }

  // 4. Color background check (not strictly forbidden, but warn if not monochrome)
  if (style.backgroundColor && typeof style.backgroundColor === 'string') {
    const color = style.backgroundColor.toLowerCase();
    const isMonochrome =
      color === Colors.bg.toLowerCase() ||
      color === Colors.bgAlt.toLowerCase() ||
      color === Colors.black.toLowerCase() ||
      color === Colors.white.toLowerCase() ||
      color.startsWith('rgba(28,28,28') ||
      color.startsWith('rgb(28,28,28') ||
      color === '#1c1c1c' ||
      color === '#f9f8f6' ||
      color === '#ffffff' ||
      color === 'transparent';
    if (!isMonochrome) {
      issues.push({
        component: componentName,
        rule: 'WARNING: Non-monochrome background',
        message: FORBIDDEN.coloredBackgrounds,
        actual: `backgroundColor: ${style.backgroundColor}`,
      });
    }
  }

  // 5. Thick border check
  if (style.borderWidth !== undefined && style.borderWidth > 1) {
    issues.push({
      component: componentName,
      rule: 'NO thick borders',
      message: FORBIDDEN.thickBorders,
      actual: `borderWidth: ${style.borderWidth}`,
    });
  }

  // Log violations in development
  if (issues.length > 0 && __DEV__) {
    console.warn(`[Editorial] ${componentName}: ${issues.length} style violation(s):`);
    issues.forEach(i => console.warn(`  - ${i.rule}: ${i.actual}`));
  }

  violations.push(...issues);
  return issues;
}

/**
 * Get all accumulated violations across components.
 */
export function getAllViolations(): StyleViolation[] {
  return [...violations];
}

/**
 * Reset violation log (e.g., between test runs).
 */
export function resetViolations(): void {
  violations.length = 0;
}

/**
 * Pre-commit editorial checklist. Run this before git commit.
 * Returns true if all checks pass.
 */
export function runEditorialChecklist(): { passed: boolean; issues: string[] } {
  const allIssues: string[] = [];

  for (const v of violations) {
    allIssues.push(`[${v.component}] ${v.rule}: ${v.actual}`);
  }

  return {
    passed: allIssues.length === 0,
    issues: allIssues,
  };
}
