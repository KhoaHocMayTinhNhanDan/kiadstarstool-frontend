// src/04-frameworks-and-drivers/ui/web/pages/dev/DevShowcasePage.tsx
import { useState, useMemo } from 'react'
import { AvatarTest } from '../../components/atoms/Avatar/Avatar-playground'
import { BadgeTest } from '../../components/atoms/Badge/Badge-playground'
import { BoxTest } from '../../components/atoms/Box/Box-playground'
import { ButtonTest } from '../../components/atoms/Button/Button-playground'
import { CardTest } from '../../components/atoms/Card/Card-playground'
import { CheckboxTest } from '../../components/atoms/Checkbox/Checkbox-playground'
import { ChipTest } from '../../components/atoms/Chip/Chip-playground'
import { IconTest } from '../../components/atoms/Icon/Icon-playground'
import { InputTest } from '../../components/atoms/Input/Input-playground'
import { LoadingSpinnerTest } from '../../components/atoms/Loading-spinner/Loading-spinner-playground'
import { LogoTest } from '../../components/atoms/Logo/Logo-playground'
import { ProgressTest } from '../../components/atoms/Progress/Progress-playground'
import { RadioTest } from '../../components/atoms/Radio/Radio-playground'
import { SkeletonTest } from '../../components/atoms/Skeleton/Skeleton-playground'
import { SwitchTest } from '../../components/atoms/Switch/Switch-playground'
import { TextTest } from '../../components/atoms/Text/Text-playground'
import { TextareaTest } from '../../components/atoms/Textarea/Textarea-playground'

import { FormFieldTest } from '../../components/molecules/FormField/FormField.molecule-playground'
import { ModalTest } from '../../components/molecules/Modal/Modal.molecule-playground'
import { UserCardTest } from '../../components/molecules/UserCard/UserCard.molecule-playground'
import { LanguageSelectorTest } from '../../components/molecules/LanguageSelector/LanguageSelector.molecule-playground'
import { SearchInputTest } from '../../components/molecules/SearchInput/SearchInput.molecule-playground'
import { ThemeToggleTest } from '../../components/molecules/ThemeToggle/ThemeToggle.molecule-playground'
import { DropdownMenuTest } from '../../components/molecules/DropdownMenu/DropdownMenu.molecule-playground'
import { ToastTest } from '../../components/molecules/Toast/Toast.molecule-playground'

import { LoginFormPlayground } from '../../components/organisms/auth/LoginForm/LoginForm.organism-playground'
import { ForgotPasswordFormPlayground } from '../../components/organisms/auth/ForgotPasswordForm/ForgotPasswordForm.organism-playground'

import { DataTablePlayground } from '../../components/organisms/data/DataTable/DataTable.organism-playground'

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
      { id: 'avatar', label: 'Avatar', component: <AvatarTest /> },
      { id: 'badge', label: 'Badge', component: <BadgeTest /> },
      { id: 'box', label: 'Box', component: <BoxTest /> },
      { id: 'button', label: 'Button', component: <ButtonTest /> },
      { id: 'card', label: 'Card', component: <CardTest /> },
      { id: 'checkbox', label: 'Checkbox', component: <CheckboxTest /> },
      { id: 'chip', label: 'Chip', component: <ChipTest /> },
      { id: 'icon', label: 'Icon', component: <IconTest /> },
      { id: 'input', label: 'Input', component: <InputTest /> },
      { id: 'loading-spinner', label: 'Loading Spinner', component: <LoadingSpinnerTest /> },
      { id: 'logo', label: 'Logo', component: <LogoTest /> }, 
      { id: 'progress', label: 'Progress', component: <ProgressTest /> },
      { id: 'radio', label: 'Radio', component: <RadioTest /> },
      { id: 'skeleton', label: 'Skeleton', component: <SkeletonTest /> },
      { id: 'switch', label: 'Switch', component: <SwitchTest /> },
      { id: 'text', label: 'Text', component: <TextTest /> },
      { id: 'textarea', label: 'Textarea', component: <TextareaTest /> },
    ]
  },
  {
    id: 'molecules',
    label: '🧪 Molecules',
    items: [
      { id: 'form-field', label: 'FormField', component: <FormFieldTest /> },
      { id: 'modal', label: 'Modal', component: <ModalTest /> },
      { id: 'user-card', label: 'UserCard', component: <UserCardTest /> },
      { id: 'language-selector', label: 'LanguageSelector', component: <LanguageSelectorTest /> },
      { id: 'search-input', label: 'SearchInput', component: <SearchInputTest /> },
      { id: 'theme-toggle', label: 'ThemeToggle', component: <ThemeToggleTest /> },
      { id: 'dropdown-menu', label: 'DropdownMenu', component: <DropdownMenuTest /> },
      { id: 'toast', label: 'Toast', component: <ToastTest /> },
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

      { id: 'org-header-charts', label: 'Charts & Graphs', isHeader: true },
      // { id: 'data-table', label: 'DataTable', component: <DataTablePlayground /> },
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