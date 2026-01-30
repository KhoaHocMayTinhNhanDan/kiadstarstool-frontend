/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import { Box, Text, LoadingSpinner } from '../../../atoms';
import { COLORS } from '../../../atoms/00-core/tokens-constants';
import * as styles from './HeatmapChart.organism.styles';
import type { HeatmapChartProps, HeatmapItem } from './HeatmapChart.types';
import React from 'react';

/* ==========================================================================
 * Helpers
 * ========================================================================== */

// Simple linear interpolation for color (Hex to RGB to Hex)
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
};

const interpolateColor = (color1: string, color2: string, factor: number) => {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const result = c1.map((c, i) => Math.round(c + factor * (c2[i] - c)));
  return `rgb(${result.join(',')})`;
};

/* ==========================================================================
 * Component
 * ========================================================================== */

export const HeatmapChart = ({
  data,
  xLabels,
  yLabels,
  colors = [COLORS.PRIMARY_LIGHT, COLORS.PRIMARY_DARK],
  isLoading = false,
  emptyMessage = 'Không có dữ liệu',
  height = 'auto',
  sx,
}: HeatmapChartProps) => {
  const [hoveredItem, setHoveredItem] = useState<{ item: HeatmapItem; x: number; y: number } | null>(null);

  /* ================= Data Processing ================= */
  const { processedData, xKeys, yKeys, minVal, maxVal } = useMemo(() => {
    if (!data || data.length === 0) {
      return { processedData: {}, xKeys: [], yKeys: [], minVal: 0, maxVal: 0 };
    }

    const xSet = new Set<string>();
    const ySet = new Set<string>();
    let min = Infinity;
    let max = -Infinity;
    const map: Record<string, number> = {};

    data.forEach(d => {
      xSet.add(d.x);
      ySet.add(d.y);
      min = Math.min(min, d.value);
      max = Math.max(max, d.value);
      map[`${d.x}-${d.y}`] = d.value;
    });

    return {
      processedData: map,
      xKeys: xLabels || Array.from(xSet),
      yKeys: yLabels || Array.from(ySet),
      minVal: min,
      maxVal: max,
    };
  }, [data, xLabels, yLabels]);

  /* ================= Loading ================= */
  if (isLoading) {
    return (
      <Box w="100%" h={height} display="flex" alignItems="center" justifyContent="center">
        <LoadingSpinner size="lg" />
      </Box>
    );
  }

  /* ================= Empty ================= */
  if (!data || data.length === 0) {
    return (
      <Box w="100%" h={height} display="flex" alignItems="center" justifyContent="center" bg="LIGHT" radius="md">
        <Text color="SECONDARY">{emptyMessage}</Text>
      </Box>
    );
  }

  /* ================= Render ================= */
  const range = maxVal - minVal || 1;

  return (
    <Box css={[styles.container, sx]} style={{ height }}>
      <div css={styles.grid(xKeys.length, yKeys.length)}>
        
        {/* Header Row (X Axis) */}
        <div /> {/* Empty top-left corner */}
        {xKeys.map(x => (
          <div key={`head-${x}`} css={styles.xAxisLabel}>
            {x}
          </div>
        ))}

        {/* Rows (Y Axis + Cells) */}
        {yKeys.map((y) => (
          <React.Fragment key={`row-${y}`}>
            {/* Y Axis Label */}
            <div css={styles.yAxisLabel}>
              {y}
            </div>

            {/* Cells */}
            {xKeys.map(x => {
              const value = processedData[`${x}-${y}`];
              const hasValue = value !== undefined;
              const factor = hasValue ? (value! - minVal) / range : 0;
              const color = hasValue ? interpolateColor(colors[0], colors[1], factor) : COLORS.NEUTRAL_LIGHT;

              return (
                <div
                  key={`${x}-${y}`}
                  css={styles.cell(color)}
                  onMouseEnter={(e) => {
                    if (hasValue) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const containerRect = e.currentTarget.closest('.heatmap-container')?.getBoundingClientRect() || { top: 0, left: 0 };
                      // Simple positioning relative to cell
                      setHoveredItem({
                        item: { x, y, value }, 
                        x: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth / 2, 
                        y: e.currentTarget.offsetTop 
                      });
                    }
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredItem && (
        <div 
          css={styles.tooltip} 
          style={{ left: hoveredItem.x, top: hoveredItem.y }}
        >
          <div css={styles.tooltipLabel}>{hoveredItem.item.x}, {hoveredItem.item.y}</div>
          <div css={styles.tooltipValue}>Value: {hoveredItem.item.value}</div>
        </div>
      )}
    </Box>
  );
};

HeatmapChart.displayName = 'HeatmapChart';
export default HeatmapChart;