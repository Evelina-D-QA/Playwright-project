import { test } from '@playwright/test';

/**
 * Method decorator to create a Playwright test.step around the decorated method.
 *
 * Usage:
 *   @step('Open signup form')
 *   async openSignUpForm() { ... }
 *
 * If called outside of a Playwright test context (no test.step available), the
 * original method is executed directly.
 */
export function step(name?: string) {
  return function (target: any, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void {
    let d: PropertyDescriptor | undefined = descriptor;

    if (!d) {
      d = Object.getOwnPropertyDescriptor(target, propertyKey as string) as PropertyDescriptor | undefined;
    }

    if (!d) return;

    const original = d.value;

    if (typeof original !== 'function') return;

    d.value = async function (...args: any[]) {
      const autoName = `${String(propertyKey)}(${args.map((a) => {
        try {
          return typeof a === 'string' ? a : JSON.stringify(a);
        } catch {
          return String(a);
        }
      }).join(', ')})`;

      const stepName = name && name.length ? name : autoName;

      // If test.step exists (we're running inside a Playwright test), use it.
      if (test && typeof (test as any).step === 'function') {
        // Playwright's test.step returns the value of the callback.
        return await (test as any).step(stepName, async () => await original.apply(this, args));
      }

      // Fallback: simply call original method
      return await original.apply(this, args);
    };

    // redefine the property with the wrapped function
    Object.defineProperty(target, propertyKey, d);

    return;
  };
}

export default step;
