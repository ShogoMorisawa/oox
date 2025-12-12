export const OOX_TIER = {
  DOMINANT: "Dominant",
  HIGH: "High",
  MIDDLE: "Middle",
  LOW: "Low",
} as const;

export type Tier = (typeof OOX_TIER)[keyof typeof OOX_TIER];
