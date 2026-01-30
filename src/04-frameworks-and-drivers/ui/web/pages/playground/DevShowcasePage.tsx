// src/04-frameworks-and-drivers/ui/web/pages/dev/DevShowcasePage.tsx
import { useState, useMemo } from 'react'
import { AvatarPlayground } from '../../components/atoms/Avatar/Avatar-playground'
import { BadgePlayground } from '../../components/atoms/Badge/Badge-playground'
import { BoxPlayground } from '../../components/atoms/Box/Box-playground'
import { ButtonPlayground } from '../../components/atoms/Button/Button-playground'
import { CardPlayground } from '../../components/atoms/Card/Card-playground'
import { CheckboxPlayground } from '../../components/atoms/Checkbox/Checkbox-playground'
import { ChipPlayground } from '../../components/atoms/Chip/Chip-playground'
import { IconPlayground } from '../../components/atoms/Icon/Icon-playground'
import { IconButtonPlayground } from '../../components/atoms/IconButton/IconButton-playground'
import { InputPlayground } from '../../components/atoms/Input/Input-playground'
import { LoadingSpinnerPlayground } from '../../components/atoms/LoadingSpinner/LoadingSpinner-playground'
import { LogoPlayground } from '../../components/atoms/Logo/Logo-playground'
import { ProgressPlayground } from '../../components/atoms/Progress/Progress-playground'
import { RadioPlayground } from '../../components/atoms/Radio/Radio-playground'
import { SkeletonPlayground } from '../../components/atoms/Skeleton/Skeleton-playground'
import { SelectPlayground } from '../../components/atoms/Select/Select-playground'
import { SliderPlayground } from '../../components/atoms/Slider/Slider-playground'
import { SwitchPlayground } from '../../components/atoms/Switch/Switch-playground'
import { TextPlayground } from '../../components/atoms/Text/Text-playground'
import { TextareaPlayground } from '../../components/atoms/Textarea/Textarea-playground'
import { DividerPlayground } from '../../components/atoms/Divider/Divider-playground'

import { FormFieldPlayground } from '../../components/molecules/FormField/FormField.molecule-playground'
import { ModalPlayground } from '../../components/molecules/Modal/Modal.playground'
import { UserCardPlayground } from '../../components/molecules/UserCard/UserCard.molecule-playground'
import { LanguageSelectorPlayground } from '../../components/molecules/LanguageSelector/LanguageSelector.molecule-playground'
import { SearchInputPlayground } from '../../components/molecules/SearchInput/SearchInput.molecule-playground'
import { ThemeTogglePlayground } from '../../components/molecules/ThemeToggle/ThemeToggle.molecule-playground'
import { DropdownMenuPlayground } from '../../components/molecules/DropdownMenu/DropdownMenu.molecule-playground'
import { ToastPlayground } from '../../components/molecules/Toast/Toast.molecule-playground'

import { LoginFormPlayground } from '../../components/organisms/auth/LoginForm/LoginForm.organism-playground'
import { ForgotPasswordFormPlayground } from '../../components/organisms/auth/ForgotPasswordForm/ForgotPasswordForm.organism-playground'

// Card
import { DashboardCardPlayground } from '../../components/organisms/cards/DashboardCard/DashboardCard.playground'
import { StatsCardPlayground } from '../../components/organisms/cards/StatsCard/StatsCard.playground'
import { UserProfileCardPlayground } from './../../components/organisms/cards/UserProfileCard/UserProfileCard.playground'

// Modal
import { ConfirmDialogPlayground } from '../../components/organisms/modals/ConfirmDialog/ConfirmDialog.playground' 

import { DataTablePlayground } from '../../components/organisms/data/DataTable/DataTable.organism-playground'
import { RadarChartPlayground } from  '../../components/organisms/charts/RadarChart/RadarChart.organism-playground';
import { BarChartPlayground } from './../../components/organisms/charts/BarChart/BarChart.organism-playground';
import { GaugeChartPlayground } from '../../components/organisms/charts/GaugeChart/GaugeChart.organism-playground';
import { HeatmapChartPlayground } from './../../components/organisms/charts/HeatmapChart/HeatmapChart-playground';
import { StackedBarChartPlayground } from '../../components/organisms/charts/StackedBarChart/StackedBarChart-playground'

import { AdvancedFilterPlayground } from '../../components/organisms/forms/AdvancedFilter/AdvancedFilter.form.playground'
import { MultiStepFormPlayground } from '../../components/organisms/forms/MultiStepForm/MultiStepForm.playground'
import { SearchFilterFormPlayground } from './../../components/organisms/forms/SearchFilterForm/SearchFilterForm.playground';

import { LoginPageTest } from '../auth/LoginPage-test'
import { AppContext } from '@/00-core/app-context'

// Type definitions for the sidebar structure
type ComponentItem = {
  id: string;
  label: string;
  component: React.ReactNode;
};

type SubHeaderItem = {
  id: string;
  label: string;
  isHeader: true;
}

type Category = {
  id: string;
  label: string;
  items: (ComponentItem | SubHeaderItem)[];
};

const categories: Category[] = [
  {
    id: 'atoms',
    label: '⚛️ Atoms',
    items: [
      { id: 'avatar', label: 'Avatar', component: <AvatarPlayground /> },
      { id: 'badge', label: 'Badge', component: <BadgePlayground /> },
      { id: 'box', label: 'Box', component: <BoxPlayground /> },
      { id: 'button', label: 'Button', component: <ButtonPlayground /> },
      { id: 'card', label: 'Card', component: <CardPlayground /> },
      { id: 'checkbox', label: 'Checkbox', component: <CheckboxPlayground /> },
      { id: 'chip', label: 'Chip', component: <ChipPlayground /> },
      { id: 'icon', label: 'Icon', component: <IconPlayground /> },
      { id: 'icon-button', label: 'IconButton', component: <IconButtonPlayground /> },
      { id: 'input', label: 'Input', component: <InputPlayground /> },
      { id: 'loading-spinner', label: 'Loading Spinner', component: <LoadingSpinnerPlayground /> },
      { id: 'logo', label: 'Logo', component: <LogoPlayground /> }, 
      { id: 'progress', label: 'Progress', component: <ProgressPlayground /> },
      { id: 'radio', label: 'Radio', component: <RadioPlayground /> },
      { id: 'skeleton', label: 'Skeleton', component: <SkeletonPlayground /> },
      { id: 'select', label: 'Select', component: <SelectPlayground /> },
      { id: 'slider', label: 'Slider', component: <SliderPlayground /> },
      { id: 'switch', label: 'Switch', component: <SwitchPlayground /> },
      { id: 'text', label: 'Text', component: <TextPlayground /> },
      { id: 'textarea', label: 'Textarea', component: <TextareaPlayground /> },
      { id: 'divider', label: 'Divider', component: <DividerPlayground /> },
    ]
  },
  {
    id: 'molecules',
    label: '🧪 Molecules',
    items: [
      { id: 'form-field', label: 'FormField', component: <FormFieldPlayground /> },
      { id: 'modal', label: 'Modal', component: <ModalPlayground /> },
      { id: 'user-card', label: 'UserCard', component: <UserCardPlayground /> },
      { id: 'language-selector', label: 'LanguageSelector', component: <LanguageSelectorPlayground /> },
      { id: 'search-input', label: 'SearchInput', component: <SearchInputPlayground /> },
      { id: 'theme-toggle', label: 'ThemeToggle', component: <ThemeTogglePlayground /> },
      { id: 'dropdown-menu', label: 'DropdownMenu', component: <DropdownMenuPlayground /> },
      { id: 'toast', label: 'Toast', component: <ToastPlayground /> },
    ]
  },
  {
    id: 'organisms',
    label: '🧩 Organisms',
    items: [
      { id: 'org-header-auth', label: 'Authentication', isHeader: true },
      { id: 'login-form', label: 'LoginForm', component: <LoginFormPlayground /> },
      { id: 'forgot-password-form', label: 'ForgotPasswordForm', component: <ForgotPasswordFormPlayground /> },
      
      { id: 'org-header-data', label: 'Data Display', isHeader: true },
      { id: 'data-table', label: 'DataTable', component: <DataTablePlayground /> },
      { id: 'radar-chart', label: 'RadarChart', component: <RadarChartPlayground /> },
      { id: 'bar-chart', label: 'BarChart', component: <BarChartPlayground /> },
      { id: 'gauge-chart', label: 'GaugeChart', component: <GaugeChartPlayground /> },
      { id: 'heatmap-chart', label: 'HeatmapChart', component: <HeatmapChartPlayground /> },
      { id: 'stacked-bar-chart', label: 'StackedBarChart', component: <StackedBarChartPlayground /> },


      { id: 'org-header-card', label: 'Card Display', isHeader: true },
      { id: 'dashboard-card', label: 'DashboardCard', component: <DashboardCardPlayground /> },
      { id: 'stats-card', label: 'StatsCard', component: <StatsCardPlayground /> },
      { id: 'user-profile-card', label: 'UserProfileCard', component: <UserProfileCardPlayground /> },
    

    ]
  },
  {
    id: 'Forms',
    label: '🧩 AdvanceFilter',
    items: [
      { id: 'advanced-filter', label: 'AdvancedFilter', component: <AdvancedFilterPlayground /> },
      { id: 'multi-step-form', label: 'MultiStepForm', component: <MultiStepFormPlayground /> },
      { id: 'search-filter-form', label: 'SearchFilterForm', component: <SearchFilterFormPlayground /> },

    ]
  },
  {id: 'modals', label: '🧩 Modals',
    items: [
      { id: 'confirm-dialog', label: 'ConfirmDialog', component: <ConfirmDialogPlayground /> },
    ]
  },
  {
    id: 'pages',
    label: '📄 Pages',
    items: [
      { id: 'login', label: 'Login Page', component: <LoginPageTest /> },
    ]
  }
];

export function DevShowcasePage() {
  const [selectedId, setSelectedId] = useState('button')
  const appInfo = AppContext.debug()

  const activeComponent = useMemo(() => {
    for (const cat of categories) {
      // Find an item that is a component (not a header) and matches the ID
      const found = cat.items.find((item): item is ComponentItem => 'component' in item && item.id === selectedId);
      if (found) return found;
    }
    // Fallback to the first available component
    const firstComponent = categories.flatMap(c => c.items).find((item): item is ComponentItem => 'component' in item);
    return firstComponent || { id: 'error', label: 'Not Found', component: <div>No components available.</div> };
  }, [selectedId]);

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', overflow: 'hidden' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#f8f9fa', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
          <h1 style={{ margin: 0, fontSize: '18px', color: '#1a202c' }}>🏗️ UI Kit</h1>
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#718096' }}>
            Mode: <strong>{appInfo.mode === 'mock' ? '🔧 Mock' : '🚀 Firebase'}</strong>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {categories.map((category) => (
            <div key={category.id} style={{ marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 8px 8px', fontSize: '12px', textTransform: 'uppercase', color: '#a0aec0', letterSpacing: '0.05em' }}>
                {category.label}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {category.items.map((item) => {
                  // Render a non-clickable sub-header
                  if ('isHeader' in item && item.isHeader) {
                    return (
                      <div
                        key={item.id}
                        style={{
                          padding: '12px 12px 4px 12px',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#718096',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {item.label}
                      </div>
                    );
                  }
                  // Render a clickable component button
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      style={{
                        textAlign: 'left',
                        padding: `8px 12px 8px ${category.items.some(i => 'isHeader' in i) ? '24px' : '12px'}`,
                        backgroundColor: selectedId === item.id ? '#e2e8f0' : 'transparent',
                        color: selectedId === item.id ? '#2d3748' : '#4a5568',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: selectedId === item.id ? 600 : 400,
                        transition: 'all 0.2s'
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '20px 32px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '24px', color: '#2d3748' }}>{activeComponent.label}</h2>
          
          {/* Toggle Mode Button */}
          <button
            onClick={() => {
              const currentMode = AppContext.isUsingMockAuth()
              const newMode = !currentMode
              if (window.confirm(`Switch to ${newMode ? 'Mock' : 'Firebase'} Mode? Page will reload.`)) {
                localStorage.setItem('preferredAuthMode', newMode ? 'mock' : 'firebase')
                window.location.reload()
              }
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: AppContext.isUsingMockAuth() ? '#fff3cd' : '#e6fffa',
              color: AppContext.isUsingMockAuth() ? '#b7791f' : '#2c7a7b',
              border: '1px solid transparent',
              borderColor: AppContext.isUsingMockAuth() ? '#f6e05e' : '#b2f5ea',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            {AppContext.isUsingMockAuth() ? '🔧 Switch to Firebase' : '🚀 Switch to Mock'}
          </button>
        </header>

        <div style={{ padding: '32px', flex: 1 }}>
          {activeComponent.component}
        </div>
      </main>
    </div>
  )
}