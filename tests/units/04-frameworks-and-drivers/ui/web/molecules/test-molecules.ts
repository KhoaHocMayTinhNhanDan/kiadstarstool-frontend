// frontend/test-molecules.js

import { 
  Card,
  FormGroup,
  SearchBar,
  StatCard,
  ListItem,
  FilterGroup,
  TimeRangeSelector,
  BranchMultiSelect,
  SelectedBranchesInfo,
  RadioGroup
} from './templates/molecules/index.js';

/**
 * 🧪 Molecules Components Tester
 */
export class MoleculesTester {
  constructor() {
    this.components = {
      Card,
      FormGroup,
      SearchBar,
      StatCard,
      ListItem,
      FilterGroup,
      TimeRangeSelector,
      BranchMultiSelect,
      SelectedBranchesInfo,
      RadioGroup
    };
    this.testResults = [];
  }

  /**
   * Test tất cả molecules
   */
  async testAll() {
    console.group('🧪 TESTING ALL MOLECULES');
    
    const testConfig = [
      {
        name: 'Card',
        component: Card,
        props: [
          { 
            title: 'Basic Card',
            children: '<p>This is a basic card content</p>'
          },
          { 
            title: 'Card with Header Actions',
            children: '<p>Card with buttons in header</p>',
            headerActions: [
              { text: 'Edit', variant: 'secondary', size: 'small' },
              { text: 'Delete', variant: 'error', size: 'small' }
            ]
          },
          { 
            title: 'Card with Footer',
            children: '<p>Card with footer content</p>',
            footer: '<button>Save</button><button>Cancel</button>'
          },
          { 
            title: 'No Padding Card',
            children: '<p>Content without padding</p>',
            noPadding: true
          },
          { 
            title: 'Loading Card',
            children: '<p>Loading state card</p>',
            loading: true
          }
        ]
      },
      {
        name: 'FormGroup',
        component: FormGroup,
        props: [
          { 
            label: 'Username',
            name: 'username',
            type: 'text',
            placeholder: 'Enter your username',
            required: true
          },
          { 
            label: 'Email Address',
            name: 'email',
            type: 'email',
            placeholder: 'user@example.com',
            helpText: 'We will never share your email',
            error: 'Invalid email format'
          },
          { 
            label: 'Password',
            name: 'password',
            type: 'password',
            placeholder: 'Enter your password',
            required: true,
            showPasswordToggle: true
          },
          { 
            label: 'Select Country',
            name: 'country',
            type: 'select',
            options: [
              { value: 'vn', label: 'Vietnam' },
              { value: 'us', label: 'United States' },
              { value: 'jp', label: 'Japan' }
            ],
            placeholder: 'Select a country'
          },
          { 
            label: 'Description',
            name: 'description',
            type: 'textarea',
            placeholder: 'Enter description...',
            rows: 4
          }
        ]
      },
      {
        name: 'SearchBar',
        component: SearchBar,
        props: [
          {
            placeholder: 'Search...',
            onSearch: (query) => console.log('Searching:', query)
          },
          {
            placeholder: 'With default value',
            defaultValue: 'Initial search'
          },
          {
            placeholder: 'Disabled search',
            disabled: true
          },
          {
            placeholder: 'With clear button',
            showClear: true,
            value: 'Clear me'
          },
          {
            placeholder: 'Debounced search',
            debounce: 500,
            onSearch: (query) => console.log('Debounced:', query)
          }
        ]
      },
      {
        name: 'StatCard',
        component: StatCard,
        props: [
          { 
            title: 'Total Revenue',
            value: '$45,231',
            change: '+20.1%',
            trend: 'up',
            icon: 'trending-up'
          },
          { 
            title: 'Active Users',
            value: '2,350',
            change: '-5.2%',
            trend: 'down',
            icon: 'users',
            variant: 'warning'
          },
          { 
            title: 'New Orders',
            value: '1,234',
            change: '+12.5%',
            trend: 'up',
            icon: 'shopping-cart',
            variant: 'success'
          },
          { 
            title: 'Conversion Rate',
            value: '3.4%',
            change: '+1.2%',
            trend: 'up',
            icon: 'percentage',
            loading: true
          },
          { 
            title: 'Average Response',
            value: '1.2s',
            change: '0.0%',
            trend: 'neutral',
            icon: 'clock'
          }
        ]
      },
      {
        name: 'ListItem',
        component: ListItem,
        props: [
          { 
            title: 'John Doe',
            subtitle: 'Software Engineer',
            avatar: { fallbackText: 'JD' },
            showDivider: true
          },
          { 
            title: 'Sarah Smith',
            subtitle: 'Product Manager',
            avatar: { fallbackText: 'SS', src: 'https://i.pravatar.cc/150?img=1' },
            actions: [
              { icon: 'edit', onClick: () => console.log('Edit') },
              { icon: 'delete', onClick: () => console.log('Delete') }
            ]
          },
          { 
            title: 'Clickable Item',
            subtitle: 'Click to view details',
            clickable: true,
            onClick: () => console.log('Item clicked')
          },
          { 
            title: 'With Badge',
            subtitle: 'New message',
            badge: { text: 'New', variant: 'success' }
          },
          { 
            title: 'Loading Item',
            subtitle: 'Fetching data...',
            loading: true
          }
        ]
      },
      {
        name: 'FilterGroup',
        component: FilterGroup,
        props: [
          { 
            filters: [
              { label: 'All', value: 'all', active: true },
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
              { label: 'Archived', value: 'archived' }
            ],
            onFilterChange: (value) => console.log('Filter changed:', value)
          },
          { 
            filters: [
              { label: 'Today', value: 'today' },
              { label: 'Week', value: 'week', active: true },
              { label: 'Month', value: 'month' },
              { label: 'Year', value: 'year' }
            ],
            variant: 'outlined',
            size: 'small'
          },
          { 
            filters: [
              { label: 'Low', value: 'low', icon: 'arrow-down' },
              { label: 'Medium', value: 'medium', icon: 'minus' },
              { label: 'High', value: 'high', icon: 'arrow-up', active: true }
            ],
            variant: 'pill'
          }
        ]
      },
      {
        name: 'TimeRangeSelector',
        component: TimeRangeSelector,
        props: [
          { 
            value: { start: '2024-01-01', end: '2024-01-31' },
            onChange: (range) => console.log('Range changed:', range)
          },
          { 
            value: { start: '2024-03-01', end: '2024-03-15' },
            preset: 'last30days',
            showPresets: true
          },
          { 
            value: { start: '', end: '' },
            disabled: true,
            placeholder: 'Select date range'
          }
        ]
      },
      {
        name: 'BranchMultiSelect',
        component: BranchMultiSelect,
        props: [
          { 
            branches: [
              { id: '1', name: 'Branch A', selected: true },
              { id: '2', name: 'Branch B', selected: false },
              { id: '3', name: 'Branch C', selected: true }
            ],
            onChange: (selected) => console.log('Branches selected:', selected)
          },
          { 
            branches: [
              { id: '1', name: 'Head Office' },
              { id: '2', name: 'District 1' },
              { id: '3', name: 'District 2' },
              { id: '4', name: 'District 3' },
              { id: '5', name: 'District 4' }
            ],
            maxSelections: 3,
            placeholder: 'Select up to 3 branches'
          },
          { 
            branches: [],
            loading: true,
            placeholder: 'Loading branches...'
          }
        ]
      },
      {
        name: 'SelectedBranchesInfo',
        component: SelectedBranchesInfo,
        props: [
          { 
            selectedBranches: [
              { id: '1', name: 'Branch A' },
              { id: '2', name: 'Branch B' }
            ],
            totalBranches: 10,
            onClear: () => console.log('Cleared all')
          },
          { 
            selectedBranches: [
              { id: '1', name: 'Head Office' },
              { id: '2', name: 'District 1' },
              { id: '3', name: 'District 2' },
              { id: '4', name: 'District 3' }
            ],
            totalBranches: 5,
            maxVisible: 2
          },
          { 
            selectedBranches: [],
            totalBranches: 8,
            emptyMessage: 'No branches selected'
          }
        ]
      },
      {
        name: 'RadioGroup',
        component: RadioGroup,
        props: [
          { 
            name: 'gender',
            options: [
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' }
            ],
            value: 'male',
            onChange: (value) => console.log('Selected:', value)
          },
          { 
            name: 'payment',
            options: [
              { label: 'Credit Card', value: 'credit', disabled: true },
              { label: 'PayPal', value: 'paypal' },
              { label: 'Bank Transfer', value: 'bank' }
            ],
            variant: 'button',
            value: 'paypal'
          },
          { 
            name: 'size',
            options: [
              { label: 'Small', value: 's' },
              { label: 'Medium', value: 'm', checked: true },
              { label: 'Large', value: 'l' },
              { label: 'X-Large', value: 'xl' }
            ],
            direction: 'horizontal',
            label: 'Select Size'
          }
        ]
      }
    ];

    // Tạo container nếu chưa có
    let container = document.getElementById('molecules-test-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'molecules-test-container';
      container.className = 'test-container';
      document.body.appendChild(container);
    }

    for (const config of testConfig) {
      await this._testSingleComponent(config, container);
    }

    console.groupEnd();
    return this.getSummary();
  }

  /**
   * Test một component
   */
  async _testSingleComponent(config, container) {
    const { name, component, props } = config;
    
    console.group(`🔍 Testing ${name}`);
    
    if (!component) {
      console.error(`❌ ${name}: Component not found`);
      this.testResults.push({ name, success: false, error: 'Component not found' });
      console.groupEnd();
      return;
    }

    try {
      const componentGroup = document.createElement('div');
      componentGroup.className = 'component-test-group';
      componentGroup.innerHTML = `<h3>${name}</h3>`;

      props.forEach((componentProps, index) => {
        try {
          // Molecules luôn là class-based UltraComponent
          const instance = new component(componentProps);

          if (!instance || typeof instance.toElement !== 'function') {
            throw new Error('Component does not expose toElement()');
          }

          const wrapper = document.createElement('div');
          wrapper.className = 'component-instance';

          // Safe stringify (tránh function / circular)
          let propsPreview = '';
          try {
            propsPreview = JSON.stringify(componentProps, (key, value) =>
              typeof value === 'function' ? '[Function]' : value,
              2
            );
          } catch {
            propsPreview = '[Unserializable props]';
          }

          wrapper.innerHTML = `<small>${propsPreview}</small>`;

          const element = instance.toElement();
          wrapper.appendChild(element);
          componentGroup.appendChild(wrapper);

          console.log(`✅ ${name} #${index + 1}: Created successfully`);
          this.testResults.push({
            name,
            instance: index + 1,
            success: true,
            element
          });

        } catch (error) {
          console.error(`❌ ${name} #${index + 1} failed:`, error);
          this.testResults.push({
            name,
            instance: index + 1,
            success: false,
            error: error.message
          });
        }
      });



      container.appendChild(componentGroup);
      console.log(`✅ ${name}: Test completed`);

    } catch (error) {
      console.error(`❌ ${name} test failed:`, error);
      this.testResults.push({ name, success: false, error: error.message });
    }
    
    console.groupEnd();
  }

  /**
   * Get summary
   */
  getSummary() {
    const total = this.testResults.length;
    const passed = this.testResults.filter(r => r.success).length;
    const failed = total - passed;
    
    return {
      total,
      passed,
      failed,
      percentage: total > 0 ? Math.round((passed / total) * 100) : 0,
      results: this.testResults
    };
  }

  /**
   * Log available components
   */
  listComponents() {
    const componentNames = Object.keys(this.components);
    console.log('📦 Available Molecules:', componentNames);
    console.log('📊 Total molecules:', componentNames.length);
    return componentNames;
  }

  /**
   * Get component statistics
   */
  getStats() {
    const components = this.listComponents();
    return {
      total: components.length,
      components: components
    };
  }
}

/**
 * Run molecules test và render kết quả
 */
export async function runMoleculesTest() {
  const tester = new MoleculesTester();
  
  // Tạo container chính
  const app = document.getElementById('app') || document.body;
  
  // Clear và setup UI
  app.innerHTML = '';
  
  const stats = tester.getStats();
  
  const header = document.createElement('div');
  header.className = 'test-header';
  header.innerHTML = `
    <h1>🧬 Molecules Components Test</h1>
    <p>Testing ${stats.total} molecular components built from atoms</p>
    <div class="component-stats">
      <div class="stat-badge">${stats.total} Molecules</div>
      <div class="stat-badge">Built from Atoms</div>
    </div>
    <div class="controls">
      <button id="run-test-btn" class="btn-primary">Run All Tests</button>
      <button id="run-interactive-btn" class="btn-secondary">Interactive Tests</button>
      <button id="clear-btn" class="btn-ghost">Clear Results</button>
    </div>
    <div id="test-summary"></div>
  `;
  
  const container = document.createElement('div');
  container.id = 'molecules-test-container';
  container.className = 'test-container';
  
  const consoleOutput = document.createElement('div');
  consoleOutput.className = 'console-output';
  consoleOutput.innerHTML = '<h3>📝 Console Output</h3><div id="console-log"></div>';
  
  app.appendChild(header);
  app.appendChild(container);
  app.appendChild(consoleOutput);
  
  // Add CSS cho test page
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --primary: #8b5cf6;
      --secondary: #10b981;
      --success: #10b981;
      --error: #ef4444;
      --warning: #f59e0b;
      --info: #3b82f6;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #1e293b;
      --text-light: #64748b;
      --border: #e2e8f0;
      --border-light: #f1f5f9;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 1rem;
    }
    
    .test-header {
      background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
      color: white;
      padding: 2rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .test-header h1 {
      margin: 0 0 0.5rem 0;
      font-size: 2rem;
    }
    
    .test-header p {
      opacity: 0.9;
      margin-bottom: 1rem;
    }
    
    .component-stats {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .stat-badge {
      padding: 0.25rem 0.75rem;
      background: rgba(255,255,255,0.2);
      border-radius: 1rem;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .controls {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    
    .controls button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
      font-size: 0.875rem;
    }
    
    .btn-primary {
      background: white;
      color: var(--primary);
    }
    
    .btn-secondary {
      background: rgba(255,255,255,0.2);
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
    }
    
    .btn-ghost {
      background: transparent;
      color: white;
      border: none;
      opacity: 0.8;
    }
    
    .controls button:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    #test-summary {
      font-size: 1.1rem;
      font-weight: 500;
      margin-top: 1rem;
    }
    
    .summary-stats {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .stat {
      padding: 0.5rem 1rem;
      border-radius: 5px;
      font-weight: bold;
      background: rgba(255,255,255,0.1);
    }
    
    .test-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .component-test-group {
      background: var(--card-bg);
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      border: 1px solid var(--border);
    }
    
    .component-test-group h3 {
      margin: 0 0 1rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--primary);
      color: var(--text);
      font-size: 1.2rem;
    }
    
    .component-instance {
      margin: 1rem 0;
      padding: 1rem;
      background: var(--bg);
      border-radius: 8px;
      border: 1px solid var(--border-light);
      transition: all 0.2s;
    }
    
    .component-instance:hover {
      border-color: var(--border);
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    
    .component-instance small {
      display: block;
      color: var(--text-light);
      margin-bottom: 0.5rem;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.8rem;
      opacity: 0.8;
      background: var(--border-light);
      padding: 0.5rem;
      border-radius: 4px;
      white-space: pre-wrap;
      max-height: 100px;
      overflow-y: auto;
    }
    
    .console-output {
      background: #0f172a;
      color: #cbd5e0;
      padding: 1.5rem;
      border-radius: 10px;
      margin-top: 2rem;
      font-family: 'Monaco', 'Menlo', monospace;
      max-height: 400px;
      overflow-y: auto;
    }
    
    .console-output h3 {
      color: var(--secondary);
      margin: 0 0 1rem 0;
    }
    
    #console-log {
      font-size: 0.9rem;
    }
    
    .log-entry {
      padding: 0.25rem 0;
      border-bottom: 1px solid #334155;
      font-family: 'Monaco', 'Menlo', monospace;
    }
    
    .log-entry.success { color: var(--success); }
    .log-entry.error { color: var(--error); }
    .log-entry.info { color: var(--info); }
    .log-entry.warning { color: var(--warning); }
    
    .interactive-test {
      background: #fef3c7;
      border-left: 4px solid var(--warning);
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 0 4px 4px 0;
    }
    
    .interactive-test h4 {
      margin: 0 0 0.5rem 0;
      color: var(--text);
    }
    
    .test-buttons {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    
    @media (max-width: 768px) {
      .test-container {
        grid-template-columns: 1fr;
      }
      
      .controls {
        flex-direction: column;
      }
      
      .controls button {
        width: 100%;
      }
    }
    
    /* Animation */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .component-test-group {
      animation: fadeIn 0.3s ease-out;
    }
    
    /* Molecule specific styles */
    .molecule-demo {
      position: relative;
    }
    
    .molecule-demo::before {
      content: '🧬';
      position: absolute;
      top: -8px;
      right: -8px;
      background: var(--primary);
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
  `;
  document.head.appendChild(style);
  
  // Console log helper
  const logToScreen = (message, type = 'info') => {
    const consoleLog = document.getElementById('console-log');
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    consoleLog.appendChild(logEntry);
    consoleLog.scrollTop = consoleLog.scrollHeight;
  };
  
  // Setup event listeners
  document.getElementById('run-test-btn').addEventListener('click', async () => {
    logToScreen('🚀 Starting comprehensive molecules test...', 'info');
    const summary = await tester.testAll();
    
    const summaryEl = document.getElementById('test-summary');
    summaryEl.innerHTML = `
      <div class="summary-stats">
        <div class="stat" style="color: ${summary.passed > 0 ? 'var(--success)' : 'inherit'}">
          ✅ ${summary.passed} Passed
        </div>
        <div class="stat" style="color: ${summary.failed > 0 ? 'var(--error)' : 'inherit'}">
          ❌ ${summary.failed} Failed
        </div>
        <div class="stat" style="color: var(--info)">
          📊 ${summary.percentage}% Success
        </div>
      </div>
    `;
    
    const resultMsg = summary.failed === 0 
      ? `✅ Test completed: ${summary.passed}/${summary.total} passed (100% success)` 
      : `⚠️ Test completed: ${summary.passed} passed, ${summary.failed} failed (${summary.percentage}% success)`;
    
    logToScreen(resultMsg, summary.failed === 0 ? 'success' : 'warning');
  });
  
  document.getElementById('run-interactive-btn').addEventListener('click', () => {
    logToScreen('🎮 Starting interactive tests...', 'info');
    
    // Add interactive test examples
    const interactiveSection = document.createElement('div');
    interactiveSection.className = 'interactive-test';
    interactiveSection.innerHTML = `
      <h4>Interactive Tests</h4>
      <p>Test components with real-time interactions</p>
      <div class="test-buttons">
        <button onclick="testCardInteractions()" class="btn-primary">Card Interactions</button>
        <button onclick="testFormGroup()" class="btn-secondary">Form Group</button>
        <button onclick="testSearchBar()" class="btn-outline">Search Bar</button>
      </div>
      <div id="interactive-results"></div>
    `;
    
    container.appendChild(interactiveSection);
    
    // Global interactive test functions
    window.testCardInteractions = () => {
      const card = new Card({
        title: 'Interactive Card',
        children: '<p>Click buttons below to interact</p>',
        headerActions: [
          { 
            text: 'Like', 
            variant: 'primary', 
            onClick: () => logToScreen('❤️ Card liked', 'success') 
          },
          { 
            text: 'Share', 
            variant: 'secondary',
            onClick: () => logToScreen('↗️ Card shared', 'info')
          }
        ]
      });
      
      const resultDiv = document.getElementById('interactive-results');
      resultDiv.innerHTML = '';
      resultDiv.appendChild(card.toElement());
      logToScreen('🃏 Interactive card created', 'success');
    };
    
    window.testFormGroup = () => {
      const formGroup = new FormGroup({
        label: 'Test Input',
        name: 'test',
        type: 'text',
        placeholder: 'Type something...',
        onChange: (value) => logToScreen(`📝 Input changed: ${value}`, 'info')
      });
      
      const resultDiv = document.getElementById('interactive-results');
      resultDiv.innerHTML = '';
      resultDiv.appendChild(formGroup.toElement());
      logToScreen('📋 Interactive form group created', 'success');
    };
    
    window.testSearchBar = () => {
      const searchBar = new SearchBar({
        placeholder: 'Type to search...',
        onSearch: (query) => logToScreen(`🔍 Searching for: ${query}`, 'info'),
        clearable: true
      });
      
      const resultDiv = document.getElementById('interactive-results');
      resultDiv.innerHTML = '';
      resultDiv.appendChild(searchBar.toElement());
      logToScreen('🔎 Interactive search bar created', 'success');
    };
  });
  
  document.getElementById('clear-btn').addEventListener('click', () => {
    container.innerHTML = '';
    document.getElementById('console-log').innerHTML = '';
    document.getElementById('test-summary').innerHTML = '';
    logToScreen('🧹 Results cleared', 'info');
  });
  
  // Initial log
  logToScreen('✅ Molecules tester initialized successfully', 'success');
  logToScreen(`🧬 Loaded ${stats.total} molecules: ${stats.components.join(', ')}`, 'info');
  logToScreen('Click "Run All Tests" to start comprehensive testing', 'info');
  
  return tester;
}

// Auto-run if imported directly
if (import.meta.url === document.currentScript?.src) {
  document.addEventListener('DOMContentLoaded', runMoleculesTest);
}