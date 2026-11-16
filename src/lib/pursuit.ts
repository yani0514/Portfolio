export const WHEELBASE = 0.31;
export const MAX_STEERING = 0.42;
export function pursuitGeometry(lookahead: number, bend: number) {
  if (!Number.isFinite(lookahead) || lookahead <= 0 || !Number.isFinite(bend))
    throw new RangeError('Lookahead must be positive and inputs finite.');
  // Solve the intersection of x² + y² = Ld² with y = bend * x².
  // Rationalized form avoids cancellation as bend approaches zero.
  const x2 = (2 * lookahead ** 2) / (1 + Math.sqrt(1 + 4 * bend ** 2 * lookahead ** 2));
  const x = Math.sqrt(x2);
  const y = bend * x2;
  const curvature = (2 * y) / (x2 + y ** 2);
  const rawSteering = Math.atan(WHEELBASE * curvature);
  const steering = Math.max(-MAX_STEERING, Math.min(MAX_STEERING, rawSteering));
  const arc = Array.from({ length: 50 }, (_, i) => {
    const s = (i / 49) * lookahead * 1.7;
    return Math.abs(curvature) < 1e-8
      ? { x: s, y: 0 }
      : { x: Math.sin(curvature * s) / curvature, y: (1 - Math.cos(curvature * s)) / curvature };
  });
  const path = Array.from({ length: 65 }, (_, i) => {
    const x = (i / 64) * 5;
    return { x, y: bend * x * x };
  });
  return { x, y, curvature, steering, rawSteering, arc, path };
}
