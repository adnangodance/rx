export function footerRevealOffset(top: number, height: number, viewportHeight: number) {
  const progress = Math.max(0, Math.min(1, (viewportHeight - top) / Math.max(height, 1)));
  return 200 * (1 - progress) ** 2;
}
