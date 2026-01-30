import { useMemo, useState } from 'react';
import { GaugeChart } from './GaugeChart.organism';
import { Box, Text, Button, Input } from '../../../atoms';

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

/* ================= Card ================= */

const Card = ({ children }: { children: React.ReactNode }) => (
  <Box
    p="lg"
    bg="WHITE"
    radius="md"
    border="1px solid #e2e8f0"
    shadow="sm"
  >
    {children}
  </Box>
);

/* ================= Playground ================= */

export const GaugeChartPlayground = () => {
  const [value, setValue] = useState(75);
  const [tempValue, setTempValue] = useState(20);
  const [speedValue, setSpeedValue] = useState(450);

  /* ================= Segments ================= */

  const performanceSegments = useMemo(
    () => [
      { percent: 33, color: '#ef4444', name: 'Poor' },
      { percent: 34, color: '#facc15', name: 'Average' },
      { percent: 33, color: '#22c55e', name: 'Good' },
    ],
    []
  );

  const temperatureSegments = useMemo(
    () => [
      {
        percent: 28.5,
        name: 'Freezing',
        gradient: { start: '#60a5fa', end: '#3b82f6' },
        color: '#3b82f6',
      },
      {
        percent: 42.9,
        name: 'Normal',
        gradient: { start: '#4ade80', end: '#22c55e' },
        color: '#22c55e',
      },
      {
        percent: 28.6,
        name: 'Hot',
        gradient: { start: '#f87171', end: '#ef4444' },
        color: '#ef4444',
      },
    ],
    []
  );

  const networkSegments = useMemo(
    () => [
      { percent: 20, color: '#94a3b8', name: 'Slow' },
      { percent: 20, color: '#facc15', name: 'Fair' },
      { percent: 20, color: '#a3e635', name: 'Good' },
      { percent: 20, color: '#4ade80', name: 'Fast' },
      { percent: 20, color: '#22c55e', name: 'Excellent' },
    ],
    []
  );

  /* ================= Render ================= */

  return (
    <Box p="xl" bg="NEUTRAL_LIGHT">
      <Box mb="xl">
        <Text as="h2" size="2xl" weight="bold">
          🎛️ GaugeChart Playground
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="xl">

        {/* ================= Interactive ================= */}
        <Card>
          <Box mb="sm">
            <Text weight="semibold">Interactive Performance</Text>
          </Box>

          <Text size="sm" color="SECONDARY">
            Adjust value manually or randomize to see needle animation.
          </Text>

          <Box display="flex" alignItems="center" gap="sm" mb="md">
            <Button size="sm" onClick={() => setValue(v => clamp(v - 10, 0, 100))}>
              −10
            </Button>

            <Box w="80px">
              <Input
                type="number"
                min={0}
                max={100}
                value={value}
                onChange={(e) =>
                  setValue(clamp(Number(e.target.value) || 0, 0, 100))
                }
                style={{ textAlign: 'center' }} // Input component might not support align prop yet, keep style
              />
            </Box>

            <Button size="sm" onClick={() => setValue(v => clamp(v + 10, 0, 100))}>
              +10
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setValue(Math.floor(Math.random() * 101))}
            >
              🎲 Random
            </Button>

            <Box
              ml="md"
              pt="xs"
              pb="xs"
              pl="sm"
              pr="sm"
              bg="NEUTRAL_LIGHT"
              radius="sm"
            >
              <Text size="sm" weight="bold">
                {value}%
              </Text>
            </Box>
          </Box>

          <GaugeChart
            value={value}
            units="%"
            label="Performance Score"
            segments={performanceSegments}
            showMinMax
          />
        </Card>

        {/* ================= Temperature ================= */}
        <Card>
          <Box mb="sm">
            <Text weight="semibold">🌡️ Temperature Monitor</Text>
          </Box>

          <Box display="flex" alignItems="center" gap="sm" mb="md">
            <Box w="200px">
              <Input
                type="range"
                min={-20}
                max={50}
                value={tempValue}
                onChange={(e) => setTempValue(Number(e.target.value))}
              />
            </Box>
            <Text weight="bold">{tempValue}°C</Text>
          </Box>

          <GaugeChart
            value={tempValue}
            min={-20}
            max={50}
            units="°C"
            label="Current Temperature"
            segments={temperatureSegments}
            showMinMax
          />
        </Card>

        {/* ================= Network ================= */}
        <Card>
          <Box mb="sm">
            <Text weight="semibold">📶 Network Speed</Text>
          </Box>

          <Box display="flex" alignItems="center" gap="sm" mb="md">
            <Box w="240px">
              <Input
                type="range"
                min={0}
                max={1000}
                step={10}
                value={speedValue}
                onChange={(e) => setSpeedValue(Number(e.target.value))}
              />
            </Box>
            <Text weight="bold" align="right" sx={{ width: 80 }}>{speedValue} Mbps</Text>
          </Box>

          <GaugeChart
            value={speedValue}
            min={0}
            max={1000}
            units=" Mbps"
            label="Download Speed"
            segments={networkSegments}
            showMinMax
          />
        </Card>

        {/* ================= Sizes ================= */}
        <Card>
          <Box mb="md">
            <Text weight="semibold">📐 Size Variants</Text>
          </Box>

          <Box
            display="grid"
            gap="xl"
            sx={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
          >
            <Box textAlign="center">
              <GaugeChart value={30} size="sm" showMinMax />
              <Text size="sm">Small</Text>
            </Box>

            <Box textAlign="center">
              <GaugeChart value={55} size="md" showMinMax />
              <Text size="sm">Medium</Text>
            </Box>

            <Box textAlign="center">
              <GaugeChart value={85} size="lg" showMinMax />
              <Text size="sm">Large</Text>
            </Box>
          </Box>
        </Card>

        {/* ================= Loading ================= */}
        <Card>
          <Box mb="md">
            <Text weight="semibold">⏳ Loading State</Text>
          </Box>
          <GaugeChart value={0} isLoading />
        </Card>

      </Box>
    </Box>
  );
};
