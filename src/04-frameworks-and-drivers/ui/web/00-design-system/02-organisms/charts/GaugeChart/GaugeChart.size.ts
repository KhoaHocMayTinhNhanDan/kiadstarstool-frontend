// src/04-frameworks-and-drivers/ui/web/components/organisms/charts/GaugeChart/GaugeChart.size.ts
export const GAUGE_SIZE_CONFIG = {
  sm: {
    height: 180,
    needle: {
      length: '32%',
      width: 3,
      knob: 10,
    },
    value: {
      size: 'lg',
      offset: -6,
    },
    labelSize: 'xs',
    minMaxSize: 'xs',
  },

  md: {
    height: 220,
    needle: {
      length: '40%',
      width: 4,
      knob: 12,
    },
    value: {
      size: '2xl',
      offset: -10,
    },
    labelSize: 'sm',
    minMaxSize: 'sm',
  },

  lg: {
    height: 300,
    needle: {
      length: '48%',
      width: 5,
      knob: 14,
    },
    value: {
      size: '3xl',
      offset: -14,
    },
    labelSize: 'md',
    minMaxSize: 'sm',
  },
} as const;

export type GaugeSize = keyof typeof GAUGE_SIZE_CONFIG;
