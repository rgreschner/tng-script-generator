/**
 * Return a promise which delays execution by milliseconds.
 * @param ms Delay time.
 * @param value Resolved value.
 */
export const delay = (ms: number, value?: any) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));
