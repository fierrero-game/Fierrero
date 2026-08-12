export type OvrTone = 'bronze' | 'green' | 'blue' | 'gold' | 'purple';

export function getOvrTone(ovr?: number | string): OvrTone {
  const n = typeof ovr === 'number' ? ovr : Number(ovr);
  if (Number.isNaN(n)) return 'bronze';
  if (n >= 95) return 'purple';
  if (n >= 85) return 'gold';
  if (n >= 70) return 'blue';
  if (n >= 50) return 'green';
  return 'bronze';
}