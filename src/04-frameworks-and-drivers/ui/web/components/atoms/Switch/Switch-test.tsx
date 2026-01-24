// src/04-frameworks-and-drivers/ui/web/components/atoms/Switch/Switch-test.tsx
import { useState, useCallback } from 'react';
import { Switch, SwitchGroup } from './Switch';
import { useI18n } from '@/shared/i18n';

import {
  SWITCH_SIZES,
  SWITCH_VARIANTS,
  SWITCH_CONFIG,
} from './Switch.constants';

import type {
  SwitchSize,
  SwitchVariant,
  SwitchLabelPosition,
} from './Switch.types';

// ===== ICONS =====
const MoonIcon = () => <span style={{ fontSize: 14 }}>🌙</span>;
const SunIcon = () => <span style={{ fontSize: 14 }}>☀️</span>;
const BellIcon = () => <span style={{ fontSize: 14 }}>🔔</span>;
const ShieldIcon = () => <span style={{ fontSize: 14 }}>🛡️</span>;
const CloudIcon = () => <span style={{ fontSize: 14 }}>☁️</span>;
const WifiOffIcon = () => <span style={{ fontSize: 14 }}>🚫📶</span>;

export function SwitchTest() {
  const { t, locale, setLocale } = useI18n();

  // ===== STATE =====
  const [states, setStates] = useState<Record<string, boolean>>({
    basic: true,
    disabledOn: true,
    disabledOff: false,
    loading: false,
    required: false,
    darkMode: false,
    customColor: true,
    push: true,
    email: false,
    sms: true,
    twoFactor: false,
    sync: true,
  });

  const [loadingKeys, setLoadingKeys] = useState<Record<string, boolean>>({});
  const [visibleSizes, setVisibleSizes] = useState<SwitchSize[]>(['sm', 'md', 'lg']);
  const [visibleVariants, setVisibleVariants] = useState<SwitchVariant[]>([
    'primary',
    'success',
    'warning',
    'error',
  ]);

  // ===== HELPERS =====
  const toggle = useCallback((key: string, value: boolean) => {
    setStates(prev => ({ ...prev, [key]: value }));
  }, []);

  const simulateLoading = useCallback(
    (key: string) => {
      setLoadingKeys(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setLoadingKeys(prev => ({ ...prev, [key]: false }));
        toggle(key, !states[key]);
      }, 1200);
    },
    [states, toggle]
  );

  const toggleAll = useCallback((target: boolean) => {
    setStates(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => {
        if (k !== 'darkMode') next[k] = target;
      });
      return next;
    });
  }, []);

  const isDark = states.darkMode;

  // ===== DATA =====
  const labelPositions: SwitchLabelPosition[] = ['left', 'right', 'top', 'bottom'];

  const customThemes = [
    {
      key: 'switch.test.theme.purple',
      checked: '#8b5cf6',
      unchecked: '#ede9fe',
      thumb: '#ffffff',
    },
    {
      key: 'switch.test.theme.emerald',
      checked: '#10b981',
      unchecked: '#d1fae5',
      thumb: '#ffffff',
    },
    {
      key: 'switch.test.theme.rose',
      checked: '#f43f5e',
      unchecked: '#ffe4e6',
      thumb: '#ffffff',
    },
  ];

  // ===== RENDER =====
  return (
    <div
      style={{
        padding: 24,
        minHeight: '100vh',
        background: isDark ? '#111827' : '#f9fafb',
        color: isDark ? '#e5e7eb' : '#111827',
        transition: 'all 0.3s',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* ===== HEADER ===== */}
      <header style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>
          🔘 Switch Test Suite – {locale.toUpperCase()}
        </h1>

        <p style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>
          {t('switch.test.description')}
        </p>

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          {(['en', 'vi', 'ja', 'zh'] as const).map(lang => (
            <button
              key={lang}
              onClick={() => setLocale(lang)}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                cursor: 'pointer',
                border: '1px solid #ccc',
                background: locale === lang ? '#3b82f6' : 'transparent',
                color: locale === lang ? '#fff' : 'inherit',
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      {/* ===== GLOBAL ===== */}
      <section style={{ marginBottom: 40 }}>
        <Switch
          checked={isDark}
          onChange={v => toggle('darkMode', v)}
          label={t('switch.darkMode')}
          withIcons
          checkedIcon={<MoonIcon />}
          uncheckedIcon={<SunIcon />}
        />

        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <button onClick={() => toggleAll(true)}>ON</button>
          <button onClick={() => toggleAll(false)}>OFF</button>
        </div>
      </section>

      {/* ===== STATES ===== */}
      <section style={{ marginBottom: 48 }}>
        <h2>{t('switch.sections.states')}</h2>

        <Switch
          checked={states.basic}
          onChange={v => toggle('basic', v)}
          label={t('switch.basic')}
        />

        <Switch checked disabled label={t('switch.disabledOn')} />
        <Switch checked={false} disabled label={t('switch.disabledOff')} />

        <Switch
          checked={states.loading}
          loading={loadingKeys.loading}
          onChange={() => simulateLoading('loading')}
          label={t('switch.loading')}
        />

        <Switch
          checked={states.required}
          onChange={v => toggle('required', v)}
          label={t('switch.required')}
          required
        />

        <Switch checked readOnly label={t('switch.readonly')} />
      </section>

      {/* ===== I18N FALLBACK ===== */}
      <section style={{ marginBottom: 48 }}>
        <h2>🌐 i18n fallback</h2>

        <Switch checked size="sm" />
        <Switch checked={false} size="sm" />
        <Switch checked size="md" disabled />
        <Switch checked={false} size="lg" />

        <p style={{ fontSize: 13 }}>
          {t(SWITCH_I18N_KEYS.on)} / {t(SWITCH_I18N_KEYS.off)} | {locale}
        </p>
      </section>

      {/* ===== SIZES ===== */}
      <section style={{ marginBottom: 48 }}>
        <h2>{t('switch.sections.sizes')}</h2>

        {visibleSizes.map(size => (
          <Switch
            key={size}
            size={size}
            checked
            label={t(`switch.size.${size}`)}
            description={`Size: ${size}`}
          />
        ))}
      </section>

      {/* ===== VARIANTS ===== */}
      <section style={{ marginBottom: 48 }}>
        <h2>{t('switch.sections.variants')}</h2>

        {visibleVariants.map(v => (
          <Switch
            key={v}
            variant={v}
            checked
            label={t(`switch.variant.${v}`)}
          />
        ))}
      </section>

      {/* ===== CUSTOM COLORS ===== */}
      <section style={{ marginBottom: 48 }}>
        <h2>{t('switch.sections.customColors')}</h2>

        {customThemes.map(th => (
          <Switch
            key={th.key}
            checked={states.customColor}
            onChange={v => toggle('customColor', v)}
            label={t(th.key)}
            checkedColor={th.checked}
            uncheckedColor={th.unchecked}
            thumbColor={th.thumb}
          />
        ))}
      </section>

      {/* ===== GROUPS ===== */}
      <section>
        <h2>{t('switch.sections.groups')}</h2>

        <SwitchGroup label={t('switch.groups.notifications')}>
          <Switch
            checked={states.push}
            onChange={v => toggle('push', v)}
            label={t('switch.push')}
            withIcons
            checkedIcon={<BellIcon />}
          />
          <Switch
            checked={states.email}
            onChange={v => toggle('email', v)}
            label={t('switch.email')}
          />
          <Switch
            checked={states.sms}
            onChange={v => toggle('sms', v)}
            label={t('switch.sms')}
          />
        </SwitchGroup>

        <SwitchGroup label={t('switch.groups.security')} direction="horizontal">
          <Switch
            checked={states.twoFactor}
            onChange={v => toggle('twoFactor', v)}
            label={t('switch.twoFactor')}
            withIcons
            checkedIcon={<ShieldIcon />}
          />
          <Switch
            checked={states.sync}
            onChange={v => toggle('sync', v)}
            label={t('switch.sync')}
            withIcons
            checkedIcon={<CloudIcon />}
            uncheckedIcon={<WifiOffIcon />}
          />
        </SwitchGroup>
      </section>
    </div>
  );
}
