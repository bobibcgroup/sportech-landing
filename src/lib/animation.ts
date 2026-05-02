export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  overshoot: [0.68, -0.3, 0.265, 1.35] as const,
};

export const dur = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  verySlow: 1.2,
};

export const stagger = {
  item: 0.06,
  row: 0.08,
};

export const COUNTER_DURATION = 2000;
export const REVEAL_MARGIN = "-100px" as const;
