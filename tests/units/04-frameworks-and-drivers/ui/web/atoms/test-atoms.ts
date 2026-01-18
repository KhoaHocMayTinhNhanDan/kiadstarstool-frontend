// frontend/test-atoms.js

import { 
  Avatar, 
  Badge, 
  Button, 
  Checkbox,
  Chip, 
  Icon, 
  Input, 
  LoadingSpinner,
  Logo,
  Progress,
  Radio,
  Switch,
  Textarea,
  createComponent 
} from './templates/atoms/index.js';

/**
 * 🧪 Atoms Components Tester - Complete version
 */
export class AtomsTester {
  constructor() {
    this.components = {
      Avatar,
      Badge,
      Button,
      Checkbox,
      Chip,
      Icon,
      Input,
      LoadingSpinner,
      Logo,
      Progress,
      Radio,
      Switch,
      Textarea
    };
    this.testResults = [];
  }

  /**
   * Test tất cả atoms
   */
  async testAll() {
    console.group('🧪 TESTING ALL ATOMS (Complete)');
    
    const testConfig = [
      {
        name: 'Button',
        component: Button,
        props: [
          { text: 'Primary', variant: 'primary', onClick: () => console.log('Clicked') },
          { text: 'Secondary', variant: 'secondary' },
          { text: 'Success', variant: 'success' },
          { text: 'Error', variant: 'error' },
          { text: 'Disabled', disabled: true },
          { text: 'Loading', loading: true }
        ]
      },
      {
        name: 'Input',
        component: Input,
        props: [
          { placeholder: 'Normal input', onChange: (val) => console.log('Input:', val) },
          { placeholder: 'With prefix', prefix: 'search' },
          { placeholder: 'With suffix', suffix: 'check' },
          { placeholder: 'Clearable', clearable: true, value: 'Test value' },
          { placeholder: 'Error', error: true },
          { placeholder: 'Disabled', disabled: true }
        ]
      },
      {
        name: 'Textarea',
        component: Textarea,
        props: [
          { placeholder: 'Normal textarea', rows: 3 },
          { placeholder: 'With counter', showCount: true, maxLength: 100 },
          { placeholder: 'Disabled', disabled: true },
          { placeholder: 'Error', error: true }
        ]
      },
      {
        name: 'Checkbox',
        component: Checkbox,
        props: [
          { label: 'Unchecked' },
          { label: 'Checked', checked: true },
          { label: 'Indeterminate', indeterminate: true },
          { label: 'Disabled', disabled: true },
          { label: 'Checked disabled', checked: true, disabled: true }
        ]
      },
      {
        name: 'Radio',
        component: Radio,
        props: [
          { label: 'Option 1', name: 'test-group', value: '1' },
          { label: 'Option 2', name: 'test-group', value: '2', checked: true },
          { label: 'Option 3', name: 'test-group', value: '3', disabled: true },
          { label: 'Option 4', name: 'test-group', value: '4', checked: true, disabled: true }
        ]
      },
      {
        name: 'Switch',
        component: Switch,
        props: [
          { label: 'Off' },
          { label: 'On', checked: true },
          { label: 'Disabled off', disabled: true },
          { label: 'Disabled on', checked: true, disabled: true },
          { label: 'Small', size: 'small' },
          { label: 'Large', size: 'large' }
        ]
      },
      {
        name: 'Avatar',
        component: Avatar,
        props: [
          { fallbackText: 'AB', size: 'small' },
          { fallbackText: 'CD', size: 'medium' },
          { fallbackText: 'EF', size: 'large' },
          { fallbackText: 'GH', shape: 'square' },
          { fallbackText: 'IJ', shape: 'rounded' }
        ]
      },
      {
        name: 'Badge',
        component: Badge,
        props: [
          { text: 'Default' },
          { text: 5, variant: 'primary' },
          { text: 'New', variant: 'success' },
          { text: 'Warning', variant: 'warning' },
          { text: 'Error', variant: 'error' },
          { dot: true, variant: 'error' }
        ]
      },
      {
        name: 'Chip',
        component: Chip,
        props: [
          { label: 'Basic Chip' },
          { label: 'Closable', closable: true },
          { label: 'With Icon', icon: 'check' },
          { label: 'Primary', variant: 'primary' },
          { label: 'Success', variant: 'success' },
          { label: 'Disabled', disabled: true }
        ]
      },
      {
        name: 'Icon',
        component: Icon,
        props: [
          { name: 'search', size: 'small' },
          { name: 'check', size: 'medium', color: 'green' },
          { name: 'close', size: 'large', spin: true },
          { name: 'user', color: 'primary' },
          { name: 'settings', color: 'muted' }
        ]
      },
      {
        name: 'LoadingSpinner',
        component: LoadingSpinner,
        props: [
          { size: 'small' },
          { size: 'medium', text: 'Loading...' },
          { size: 'large', color: 'success' },
          { size: 'xlarge', color: 'error' },
          { size: 'medium', centered: true }
        ]
      },
      {
        name: 'Logo',
        component: Logo,
        props: [
          { type: 'icon', size: 'small' },
          { type: 'text', size: 'medium' },
          { type: 'full', size: 'large' },
          { type: 'icon', onClick: () => console.log('Logo clicked') }
        ]
      },
      {
        name: 'Progress',
        component: Progress,
        props: [
          { value: 30 },
          { value: 60, showLabel: true },
          { value: 90, striped: true },
          { value: 45, variant: 'success', showLabel: true },
          { value: 75, variant: 'warning', striped: true },
          { value: 20, variant: 'error' }
        ]
      }
    ];

    // Tạo container nếu chưa có
    let container = document.getElementById('atoms-test-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'atoms-test-container';
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
          const instance = new component(componentProps);
          const element = instance.toElement();
          
          const wrapper = document.createElement('div');
          wrapper.className = 'component-instance';
          wrapper.innerHTML = `<small>${JSON.stringify(componentProps)}</small>`;
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
   * Test component cụ thể với createComponent utility
   */
  async testWithUtility(type, props = {}) {
    try {
      const component = await createComponent(type, props);
      
      if (!component || typeof component.toElement !== 'function') {
        throw new Error(`createComponent did not return a valid component instance`);
      }
      
      const element = component.toElement();
      
      return {
        type,
        success: true,
        component,
        element,
        html: element.outerHTML
      };
    } catch (error) {
      return {
        type,
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Test tất cả với createComponent
   */
  async testAllWithUtility() {
    const types = [
      'button', 'input', 'textarea', 'checkbox', 'radio', 'switch',
      'avatar', 'badge', 'chip', 'icon', 'loading', 'logo', 'progress'
    ];
    const results = [];
    
    for (const type of types) {
      const props = this._getDefaultPropsForType(type);
      const result = await this.testWithUtility(type, props);
      results.push(result);
    }
    
    return results;
  }

  /**
   * Get default props cho từng loại component
   */
  _getDefaultPropsForType(type) {
    const defaultProps = {
      button: { text: 'Test Button', variant: 'primary' },
      input: { placeholder: 'Type here...' },
      textarea: { placeholder: 'Enter text...', rows: 3 },
      checkbox: { label: 'Check me' },
      radio: { label: 'Option', name: 'test', value: '1' },
      switch: { label: 'Toggle' },
      avatar: { fallbackText: 'AB', size: 'medium' },
      badge: { text: 'New', variant: 'primary' },
      chip: { label: 'Test Chip' },
      icon: { name: 'check' },
      loading: { text: 'Loading...' },
      logo: { type: 'icon' },
      progress: { value: 50, showLabel: true }
    };
    
    return defaultProps[type] || {};
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
    console.log('📦 Available Components:', componentNames);
    console.log('📊 Total components:', componentNames.length);
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
 * Run atoms test và render kết quả
 */
export async function runAtomsTest() {
  const tester = new AtomsTester();
  
  // Tạo container chính
  const app = document.getElementById('app') || document.body;
  
  // Clear và setup UI
  app.innerHTML = '';
  
  const stats = tester.getStats();
  
  const header = document.createElement('div');
  header.className = 'test-header';
  header.innerHTML = `
    <h1>🎨 Atoms Components Test</h1>
    <p>Testing ${stats.total} atomic components</p>
    <div class="component-stats">
      <div class="stat-badge">${stats.total} Components</div>
      <div class="stat-badge">${stats.components.length} Types</div>
    </div>
    <div class="controls">
      <button id="run-test-btn" class="btn-primary">Run All Tests</button>
      <button id="run-utility-btn" class="btn-secondary">Test with Utility</button>
      <button id="run-single-btn" class="btn-outline">Test Single</button>
      <button id="clear-btn" class="btn-ghost">Clear Results</button>
    </div>
    <div id="test-summary"></div>
  `;
  
  const container = document.createElement('div');
  container.id = 'atoms-test-container';
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
      --primary: #667eea;
      --success: #68d391;
      --error: #fc8181;
      --info: #63b3ed;
      --bg: #f7fafc;
      --card-bg: #ffffff;
      --text: #2d3748;
      --text-light: #718096;
      --border: #e2e8f0;
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
      background: linear-gradient(135deg, var(--primary) 0%, #764ba2 100%);
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
    
    .btn-outline {
      background: transparent;
      color: white;
      border: 1px solid rgba(255,255,255,0.5);
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
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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
      border-bottom: 2px solid var(--border);
      color: var(--text);
      font-size: 1.2rem;
    }
    
    .component-instance {
      margin: 1rem 0;
      padding: 1rem;
      background: var(--bg);
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    
    .component-instance small {
      display: block;
      color: var(--text-light);
      margin-bottom: 0.5rem;
      font-family: monospace;
      font-size: 0.8rem;
      opacity: 0.8;
    }
    
    .console-output {
      background: #1a202c;
      color: #cbd5e0;
      padding: 1.5rem;
      border-radius: 10px;
      margin-top: 2rem;
      font-family: 'Monaco', 'Menlo', monospace;
      max-height: 400px;
      overflow-y: auto;
    }
    
    .console-output h3 {
      color: var(--success);
      margin: 0 0 1rem 0;
    }
    
    #console-log {
      font-size: 0.9rem;
    }
    
    .log-entry {
      padding: 0.25rem 0;
      border-bottom: 1px solid #2d3748;
      font-family: 'Monaco', 'Menlo', monospace;
    }
    
    .log-entry.success { color: var(--success); }
    .log-entry.error { color: var(--error); }
    .log-entry.info { color: var(--info); }
    .log-entry.warning { color: var(--warning); }
    
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
    
    /* Animation for new entries */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .component-test-group {
      animation: fadeIn 0.3s ease-out;
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
    logToScreen('🚀 Starting comprehensive atoms test...', 'info');
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
  
  document.getElementById('run-utility-btn').addEventListener('click', async () => {
    logToScreen('🔧 Testing with createComponent utility...', 'info');
    const results = await tester.testAllWithUtility();
    
    results.forEach(result => {
      if (result.success) {
        logToScreen(`✅ ${result.type}: Created successfully`, 'success');
        
        // Add to container
        const wrapper = document.createElement('div');
        wrapper.className = 'component-instance';
        wrapper.innerHTML = `<small>createComponent('${result.type}')</small>`;
        wrapper.appendChild(result.element);
        container.appendChild(wrapper);
        
      } else {
        logToScreen(`❌ ${result.type}: ${result.error}`, 'error');
      }
    });
    
    logToScreen(`🔧 Utility test completed: ${results.filter(r => r.success).length}/${results.length} successful`, 'info');
  });
  
  document.getElementById('run-single-btn').addEventListener('click', async () => {
    // Create dropdown for single component test
    const componentList = tester.listComponents();
    const select = document.createElement('select');
    componentList.forEach(comp => {
      const option = document.createElement('option');
      option.value = comp.toLowerCase();
      option.textContent = comp;
      select.appendChild(option);
    });
    
    const testBtn = document.createElement('button');
    testBtn.textContent = 'Test Selected';
    testBtn.className = 'btn-primary';
    
    const dialog = document.createElement('div');
    dialog.className = 'single-test-dialog';
    dialog.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-width: 300px;
    `;
    
    dialog.innerHTML = '<h3>Test Single Component</h3>';
    dialog.appendChild(select);
    dialog.appendChild(testBtn);
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 999;
    `;
    
    overlay.addEventListener('click', () => {
      document.body.removeChild(overlay);
      document.body.removeChild(dialog);
    });
    
    testBtn.addEventListener('click', async () => {
      const componentType = select.value;
      const result = await tester.testWithUtility(componentType, tester._getDefaultPropsForType(componentType));
      
      if (result.success) {
        logToScreen(`✅ Single test: ${componentType} created successfully`, 'success');
        
        // Clear and show single result
        container.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'component-instance';
        wrapper.innerHTML = `<h3>${componentType}</h3><small>Single component test</small>`;
        wrapper.appendChild(result.element);
        container.appendChild(wrapper);
        
        document.body.removeChild(overlay);
        document.body.removeChild(dialog);
      } else {
        logToScreen(`❌ Single test failed: ${result.error}`, 'error');
      }
    });
    
    document.body.appendChild(overlay);
    document.body.appendChild(dialog);
  });
  
  document.getElementById('clear-btn').addEventListener('click', () => {
    container.innerHTML = '';
    document.getElementById('console-log').innerHTML = '';
    document.getElementById('test-summary').innerHTML = '';
    logToScreen('🧹 Results cleared', 'info');
  });
  
  // Initial log
  logToScreen('✅ Atoms tester initialized successfully', 'success');
  logToScreen(`📦 Loaded ${stats.total} components: ${stats.components.join(', ')}`, 'info');
  logToScreen('Click "Run All Tests" to start comprehensive testing', 'info');
  
  return tester;
}

// Auto-run if imported directly
if (import.meta.url === document.currentScript?.src) {
  document.addEventListener('DOMContentLoaded', runAtomsTest);
}