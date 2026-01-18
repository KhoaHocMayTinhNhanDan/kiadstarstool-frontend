// frontend/test-feedback.js

import {
  Alert,
  Tooltip,
  Toast,
  LoadingOverlay,
  Skeleton,
  EmptyState,
  createFeedbackComponent
} from './templates/feedback/index.js';

/**
 * 🧪 Feedback Components Tester - Complete version
 */
export class FeedbackTester {
  constructor() {
    this.components = {
      Alert,
      Tooltip,
      Toast,
      LoadingOverlay,
      Skeleton,
      EmptyState
    };
    this.testResults = [];
    this.activeToasts = [];
    this.activeLoadingOverlays = [];
  }

  /**
   * Test tất cả feedback components
   */
  async testAll() {
    console.group('🧪 TESTING ALL FEEDBACK COMPONENTS (Complete)');

    const testConfig = [
      {
        name: 'Alert',
        component: Alert,
        props: [
          {
            message: 'Default alert message',
            variant: 'default'
          },
          {
            title: 'Success Alert',
            message: 'This is a success message',
            variant: 'success',
            closable: true
          },
          {
            title: 'Error Alert',
            message: 'This is an error message',
            variant: 'error',
            showIcon: true
          },
          {
            title: 'Warning Alert',
            message: 'This is a warning message',
            variant: 'warning',
            action: {
              label: 'Learn More',
              onClick: () => console.log('Learn more clicked')
            }
          },
          {
            title: 'Info Alert',
            message: 'This is an info message',
            variant: 'info',
            filled: true
          },
          {
            message: 'Alert with custom icon',
            variant: 'custom',
            icon: 'bell'
          }
        ]
      },
      {
        name: 'Tooltip',
        component: Tooltip,
        props: [
          {
            content: 'Default tooltip content',
            placement: 'top',
            trigger: 'hover'
          },
          {
            content: 'Tooltip on bottom',
            placement: 'bottom',
            trigger: 'hover'
          },
          {
            content: 'Tooltip on left',
            placement: 'left',
            trigger: 'click'
          },
          {
            content: 'Tooltip on right',
            placement: 'right',
            trigger: 'hover',
            delay: 300
          },
          {
            content: 'Rich tooltip with HTML',
            placement: 'top',
            html: '<strong>Bold</strong> and <em>italic</em> text',
            trigger: 'hover'
          },
          {
            content: 'Tooltip with arrow',
            placement: 'bottom',
            showArrow: true,
            trigger: 'hover'
          }
        ]
      },
      {
        name: 'Toast',
        component: Toast,
        props: [
          {
            message: 'Default toast message',
            duration: 3000,
            position: 'top-right'
          },
          {
            message: 'Success toast',
            type: 'success',
            duration: 5000,
            position: 'top-center'
          },
          {
            message: 'Error toast with action',
            type: 'error',
            action: {
              label: 'Retry',
              onClick: () => console.log('Retry clicked')
            }
          },
          {
            message: 'Warning toast',
            type: 'warning',
            duration: 4000,
            position: 'bottom-right'
          },
          {
            message: 'Info toast with icon',
            type: 'info',
            showIcon: true,
            closable: true
          },
          {
            message: 'Loading toast',
            type: 'loading',
            duration: 2000
          }
        ]
      },
      {
        name: 'LoadingOverlay',
        component: LoadingOverlay,
        props: [
          {
            message: 'Loading...',
            show: true
          },
          {
            message: 'Processing your request',
            show: true,
            size: 'large'
          },
          {
            message: 'Saving changes',
            show: true,
            backdrop: false
          },
          {
            message: 'Please wait',
            show: true,
            zIndex: 1000
          },
          {
            message: 'Loading with custom text',
            show: true,
            textColor: 'primary'
          },
          {
            message: 'Transparent backdrop',
            show: true,
            backdropOpacity: 0.3
          }
        ]
      },
      {
        name: 'Skeleton',
        component: Skeleton,
        props: [
          {
            type: 'text',
            width: '200px',
            height: '20px'
          },
          {
            type: 'circle',
            size: '50px'
          },
          {
            type: 'rectangle',
            width: '300px',
            height: '150px'
          },
          {
            type: 'avatar',
            size: 'large'
          },
          {
            type: 'card',
            width: '100%',
            height: '200px'
          },
          {
            type: 'paragraph',
            lines: 3,
            width: '100%'
          }
        ]
      },
      {
        name: 'EmptyState',
        component: EmptyState,
        props: [
          {
            title: 'No results found',
            message: 'Try adjusting your search criteria',
            icon: 'search',
            action: {
              label: 'Clear filters',
              onClick: () => console.log('Clear filters clicked')
            }
          },
          {
            title: 'No data available',
            message: 'There is no data to display at the moment',
            icon: 'database',
            variant: 'info'
          },
          {
            title: 'Error loading content',
            message: 'Failed to load the requested content',
            icon: 'alert-circle',
            variant: 'error',
            action: {
              label: 'Retry',
              onClick: () => console.log('Retry clicked')
            }
          },
          {
            title: 'Empty inbox',
            message: 'You have no new messages',
            icon: 'mail',
            variant: 'success'
          },
          {
            title: 'No notifications',
            message: 'You\'re all caught up!',
            icon: 'bell',
            compact: true
          },
          {
            title: 'Project is empty',
            message: 'Start by adding your first item',
            icon: 'folder-plus',
            action: {
              label: 'Create item',
              onClick: () => console.log('Create item clicked')
            }
          }
        ]
      }
    ];

    // Tạo container nếu chưa có
    let container = document.getElementById('feedback-test-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'feedback-test-container';
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
      componentGroup.innerHTML = `<h3>${name}</h3><div class="component-instances"></div>`;

      const instancesContainer = componentGroup.querySelector('.component-instances');

      props.forEach((componentProps, index) => {
        try {
          const instance = new component(componentProps);
          const element = instance.toElement ? instance.toElement() : null;

          const wrapper = document.createElement('div');
          wrapper.className = 'component-instance';
          wrapper.innerHTML = `<small>${JSON.stringify(componentProps)}</small>`;

          // Thêm trigger cho các component cần trigger
          if (name === 'Tooltip') {
            const triggerBtn = document.createElement('button');
            triggerBtn.className = 'btn-secondary';
            triggerBtn.textContent = `Hover/Click for ${name} #${index + 1}`;
            triggerBtn.style.margin = '0.5rem 0';
            wrapper.appendChild(triggerBtn);
            if (element) {
              wrapper.appendChild(element);
            }
            // Gắn tooltip vào trigger button
            if (instance.attachTo) {
              instance.attachTo(triggerBtn);
            }
          } else if (name === 'Toast') {
            const triggerBtn = document.createElement('button');
            triggerBtn.className = 'btn-secondary';
            triggerBtn.textContent = `Show ${name} #${index + 1}`;
            triggerBtn.style.margin = '0.5rem 0';
            triggerBtn.onclick = () => {
              instance.show();
              this.activeToasts.push(instance);
            };
            wrapper.appendChild(triggerBtn);
            if (element) {
              wrapper.appendChild(element);
            }
          } else if (name === 'LoadingOverlay') {
            // Đối với LoadingOverlay, luôn tạo trigger button
            const triggerBtn = document.createElement('button');
            triggerBtn.className = 'btn-primary';
            triggerBtn.textContent = `Show ${name} #${index + 1}`;
            triggerBtn.style.margin = '0.5rem 0';
            triggerBtn.onclick = () => {
              instance.show();
              this.activeLoadingOverlays.push(instance);
              // Tự động ẩn sau 3 giây
              setTimeout(() => {
                instance.hide();
                this.activeLoadingOverlays = this.activeLoadingOverlays.filter(lo => lo !== instance);
              }, 3000);
            };
            wrapper.appendChild(triggerBtn);
            
            // Chỉ thêm element nếu có và show: true
            if (element) {
              wrapper.appendChild(element);
            } else {
              const hiddenNote = document.createElement('div');
              hiddenNote.className = 'info-note';
              hiddenNote.textContent = '⚠️ Component rendered no element (may be hidden by default)';
              hiddenNote.style.cssText = `
                color: #f59e0b;
                font-size: 0.875rem;
                padding: 0.5rem;
                background: #fffbeb;
                border-radius: 4px;
                margin-top: 0.5rem;
              `;
              wrapper.appendChild(hiddenNote);
            }
          } else {
            // Các components khác
            if (element) {
              wrapper.appendChild(element);
            } else {
              const errorNote = document.createElement('div');
              errorNote.className = 'error-note';
              errorNote.textContent = '❌ Component failed to render';
              errorNote.style.cssText = `
                color: #dc2626;
                font-size: 0.875rem;
                padding: 0.5rem;
                background: #fee2e2;
                border-radius: 4px;
                margin-top: 0.5rem;
              `;
              wrapper.appendChild(errorNote);
            }
          }

          instancesContainer.appendChild(wrapper);

          console.log(`✅ ${name} #${index + 1}: Created successfully`);
          this.testResults.push({
            name,
            instance: index + 1,
            success: true,
            element: element || null
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
   * Test component cụ thể với createFeedbackComponent utility
   */
  async testWithUtility(type, props = {}) {
    try {
      const component = await createFeedbackComponent(type, props);

      if (!component) {
        throw new Error(`createFeedbackComponent returned null or undefined`);
      }

      const element = component.toElement ? component.toElement() : null;

      return {
        type,
        success: true,
        component,
        element,
        html: element?.outerHTML || 'No element rendered'
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
   * Test tất cả với createFeedbackComponent
   */
  async testAllWithUtility() {
    const types = [
      'alert', 'tooltip', 'toast', 'loading-overlay', 'skeleton', 'empty-state'
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
      alert: {
        message: 'Test alert message',
        variant: 'info',
        closable: true
      },
      tooltip: {
        content: 'Test tooltip content',
        placement: 'top',
        trigger: 'hover'
      },
      toast: {
        message: 'Test toast message',
        type: 'info',
        duration: 3000
      },
      'loading-overlay': {
        message: 'Loading...',
        show: true
      },
      skeleton: {
        type: 'text',
        width: '200px',
        height: '20px'
      },
      'empty-state': {
        title: 'No data found',
        message: 'Try adjusting your search',
        icon: 'search'
      }
    };

    return defaultProps[type] || {};
  }

  /**
   * Hiển thị demo trực tiếp các feedback components
   */
  showDemo() {
    const demoContainer = document.createElement('div');
    demoContainer.className = 'feedback-demo';
    demoContainer.innerHTML = `
      <h3>🎭 Interactive Feedback Demo</h3>
      <div class="demo-buttons">
        <button class="btn-success" id="demo-success-alert">Show Success Alert</button>
        <button class="btn-error" id="demo-error-toast">Show Error Toast</button>
        <button class="btn-warning" id="demo-tooltip-trigger">Hover for Tooltip</button>
        <button class="btn-info" id="demo-loading-overlay">Show Loading Overlay</button>
        <button class="btn-primary" id="demo-skeleton">Show Skeleton</button>
        <button class="btn-secondary" id="demo-empty-state">Show Empty State</button>
      </div>
    `;

    // Thêm vào container test
    const container = document.getElementById('feedback-test-container') || document.body;
    container.appendChild(demoContainer);

    // Gắn sự kiện cho demo buttons
    document.getElementById('demo-success-alert').addEventListener('click', () => {
      const alert = new Alert({
        title: 'Success!',
        message: 'Operation completed successfully!',
        variant: 'success',
        closable: true
      });
      const alertElement = alert.toElement ? alert.toElement() : null;
      if (alertElement) {
        alertElement.style.margin = '1rem 0';
        container.appendChild(alertElement);
      }
    });

    document.getElementById('demo-error-toast').addEventListener('click', () => {
      try {
        const toast = new Toast({
          message: 'Failed to save changes. Please try again.',
          type: 'error',
          duration: 5000,
          action: {
            label: 'Retry',
            onClick: () => console.log('Retry clicked')
          }
        });
        toast.show();
        this.activeToasts.push(toast);
      } catch (error) {
        console.error('Toast demo error:', error);
      }
    });

    document.getElementById('demo-tooltip-trigger').addEventListener('mouseover', (e) => {
      // Kiểm tra xem tooltip đã được gắn chưa
      if (!e.target.hasAttribute('data-tooltip-attached')) {
        try {
          const tooltip = new Tooltip({
            content: 'This is an interactive tooltip demo! Try clicking me.',
            placement: 'top',
            trigger: 'hover'
          });
          tooltip.attachTo(e.target);
          e.target.setAttribute('data-tooltip-attached', 'true');
        } catch (error) {
          console.error('Tooltip demo error:', error);
        }
      }
    });

    document.getElementById('demo-loading-overlay').addEventListener('click', () => {
      try {
        const loadingOverlay = new LoadingOverlay({
          message: 'Processing your request...',
          show: true
        });
        const element = loadingOverlay.toElement ? loadingOverlay.toElement() : null;
        if (element) {
          document.body.appendChild(element);
          this.activeLoadingOverlays.push(loadingOverlay);
          
          // Tự động ẩn sau 3 giây
          setTimeout(() => {
            loadingOverlay.hide();
            this.activeLoadingOverlays = this.activeLoadingOverlays.filter(lo => lo !== loadingOverlay);
          }, 3000);
        }
      } catch (error) {
        console.error('LoadingOverlay demo error:', error);
      }
    });

    document.getElementById('demo-skeleton').addEventListener('click', () => {
      try {
        const skeleton = new Skeleton({
          type: 'card',
          width: '300px',
          height: '200px'
        });
        
        const demoArea = document.createElement('div');
        demoArea.style.cssText = `
          margin: 1rem 0;
          padding: 1rem;
          background: var(--color-bg-secondary, #f8fafc);
          border-radius: 8px;
          border: 1px solid var(--color-border-light, #e2e8f0);
        `;
        demoArea.innerHTML = '<h4>Skeleton Demo</h4>';
        const element = skeleton.toElement ? skeleton.toElement() : null;
        if (element) {
          demoArea.appendChild(element);
          container.appendChild(demoArea);
        }
      } catch (error) {
        console.error('Skeleton demo error:', error);
      }
    });

    document.getElementById('demo-empty-state').addEventListener('click', () => {
      try {
        const emptyState = new EmptyState({
          title: 'No projects found',
          message: 'You haven\'t created any projects yet. Start by creating your first project.',
          icon: 'folder-plus',
          action: {
            label: 'Create Project',
            onClick: () => {
              console.log('Create project clicked');
              // Hiển thị loading overlay
              try {
                const loading = new LoadingOverlay({
                  message: 'Creating project...',
                  show: true
                });
                const element = loading.toElement ? loading.toElement() : null;
                if (element) {
                  document.body.appendChild(element);
                  
                  // Giả lập thời gian tạo project
                  setTimeout(() => {
                    loading.hide();
                    const toast = new Toast({
                      message: 'Project created successfully!',
                      type: 'success',
                      duration: 3000
                    });
                    toast.show();
                  }, 1500);
                }
              } catch (error) {
                console.error('Loading overlay in demo error:', error);
              }
            }
          }
        });
        
        const demoArea = document.createElement('div');
        demoArea.style.cssText = `
          margin: 1rem 0;
          padding: 2rem;
          background: var(--color-bg-primary, #ffffff);
          border-radius: 8px;
          border: 1px solid var(--color-border-light, #e2e8f0);
          text-align: center;
        `;
        const element = emptyState.toElement ? emptyState.toElement() : null;
        if (element) {
          demoArea.appendChild(element);
          container.appendChild(demoArea);
        }
      } catch (error) {
        console.error('EmptyState demo error:', error);
      }
    });
  }

  /**
   * Xóa tất cả feedback components đang active
   */
  cleanup() {
    this.activeToasts.forEach(toast => toast.hide && toast.hide());
    this.activeLoadingOverlays.forEach(lo => lo.hide && lo.hide());
    this.activeToasts = [];
    this.activeLoadingOverlays = [];
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
    console.log('📦 Available Feedback Components:', componentNames);
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
 * Run feedback test và render kết quả
 */
export async function runFeedbackTest() {
  try {
    const tester = new FeedbackTester();

    // Tạo container chính
    const app = document.getElementById('app') || document.body;

    // Clear và setup UI
    app.innerHTML = '';

    const stats = tester.getStats();

    const header = document.createElement('div');
    header.className = 'test-header';
    header.innerHTML = `
      <h1>🎭 Feedback Components Test</h1>
      <p>Testing ${stats.total} feedback components</p>
      <div class="component-stats">
        <div class="stat-badge">${stats.total} Components</div>
        <div class="stat-badge">${stats.components.length} Types</div>
      </div>
      <div class="controls">
        <button id="run-test-btn" class="btn-primary">Run All Tests</button>
        <button id="run-utility-btn" class="btn-secondary">Test with Utility</button>
        <button id="show-demo-btn" class="btn-success">Interactive Demo</button>
        <button id="cleanup-btn" class="btn-warning">Cleanup All</button>
        <button id="clear-btn" class="btn-ghost">Clear Results</button>
      </div>
      <div id="test-summary"></div>
    `;

    const container = document.createElement('div');
    container.id = 'feedback-test-container';
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
        --warning: #f6ad55;
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
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
      
      .btn-success {
        background: var(--success);
        color: white;
      }
      
      .btn-error {
        background: var(--error);
        color: white;
      }
      
      .btn-warning {
        background: var(--warning);
        color: white;
      }
      
      .btn-info {
        background: var(--info);
        color: white;
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
        opacity: 0.9;
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
        word-break: break-all;
      }
      
      .info-note {
        color: #f59e0b;
        font-size: 0.875rem;
        padding: 0.5rem;
        background: #fffbeb;
        border-radius: 4px;
        margin-top: 0.5rem;
      }
      
      .error-note {
        color: #dc2626;
        font-size: 0.875rem;
        padding: 0.5rem;
        background: #fee2e2;
        border-radius: 4px;
        margin-top: 0.5rem;
      }
      
      .feedback-demo {
        background: var(--card-bg);
        border-radius: 10px;
        padding: 1.5rem;
        margin: 1.5rem 0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        border: 1px solid var(--border);
      }
      
      .feedback-demo h3 {
        margin: 0 0 1rem 0;
        color: var(--text);
      }
      
      .demo-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      
      .demo-buttons button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s;
        font-size: 0.875rem;
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
      
      /* Skeleton animation */
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      
      .skeleton-shimmer {
        background: linear-gradient(90deg, var(--border) 25%, #e2e8f0 50%, var(--border) 75%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite linear;
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
        
        .demo-buttons {
          flex-direction: column;
        }
        
        .demo-buttons button {
          width: 100%;
        }
      }
      
      /* Animation for feedback components */
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
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

    // Setup event listeners với error handling
    const setupButton = (id, handler) => {
      const button = document.getElementById(id);
      if (button) {
        button.addEventListener('click', async () => {
          try {
            await handler();
          } catch (error) {
            logToScreen(`❌ Error in ${id}: ${error.message}`, 'error');
            console.error(`Error in ${id}:`, error);
          }
        });
      }
    };

    setupButton('run-test-btn', async () => {
      logToScreen('🚀 Starting comprehensive feedback components test...', 'info');
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

    setupButton('run-utility-btn', async () => {
      logToScreen('🔧 Testing feedback components with createFeedbackComponent utility...', 'info');
      const results = await tester.testAllWithUtility();

      results.forEach(result => {
        if (result.success) {
          logToScreen(`✅ ${result.type}: Created successfully`, 'success');

          // Add to container
          const wrapper = document.createElement('div');
          wrapper.className = 'component-instance';
          wrapper.innerHTML = `<small>createFeedbackComponent('${result.type}')</small>`;

          // Thêm trigger cho các component interactive
          if (result.type === 'toast') {
            const triggerBtn = document.createElement('button');
            triggerBtn.className = 'btn-primary';
            triggerBtn.textContent = `Show ${result.type}`;
            triggerBtn.style.margin = '0.5rem 0';
            triggerBtn.onclick = () => result.component.show && result.component.show();
            wrapper.appendChild(triggerBtn);
          } else if (result.type === 'tooltip') {
            const triggerBtn = document.createElement('button');
            triggerBtn.className = 'btn-secondary';
            triggerBtn.textContent = `Hover for ${result.type}`;
            triggerBtn.style.margin = '0.5rem 0';
            wrapper.appendChild(triggerBtn);
            if (result.component.attachTo) {
              result.component.attachTo(triggerBtn);
            }
          } else if (result.type === 'loading-overlay') {
            const triggerBtn = document.createElement('button');
            triggerBtn.className = 'btn-info';
            triggerBtn.textContent = `Show ${result.type}`;
            triggerBtn.style.margin = '0.5rem 0';
            triggerBtn.onclick = () => {
              result.component.show && result.component.show();
              setTimeout(() => result.component.hide && result.component.hide(), 3000);
            };
            wrapper.appendChild(triggerBtn);
          }

          if (result.element) {
            wrapper.appendChild(result.element);
          }

          container.appendChild(wrapper);

        } else {
          logToScreen(`❌ ${result.type}: ${result.error}`, 'error');
        }
      });

      logToScreen(`🔧 Utility test completed: ${results.filter(r => r.success).length}/${results.length} successful`, 'info');
    });

    setupButton('show-demo-btn', () => {
      logToScreen('🎭 Showing interactive feedback demo...', 'info');
      tester.showDemo();
      logToScreen('✅ Interactive demo loaded. Try clicking the buttons!', 'success');
    });

    setupButton('cleanup-btn', () => {
      tester.cleanup();
      logToScreen('🧹 Cleaned up all active feedback components', 'info');
    });

    setupButton('clear-btn', () => {
      container.innerHTML = '';
      document.getElementById('console-log').innerHTML = '';
      document.getElementById('test-summary').innerHTML = '';
      logToScreen('🧹 Results cleared', 'info');
    });

    // Initial log
    logToScreen('✅ Feedback tester initialized successfully', 'success');
    logToScreen(`📦 Loaded ${stats.total} feedback components: ${stats.components.join(', ')}`, 'info');
    logToScreen('Click "Run All Tests" to start comprehensive testing', 'info');
    logToScreen('Try "Interactive Demo" for live feedback examples', 'info');

    return tester;
  } catch (error) {
    console.error('Failed to initialize feedback tester:', error);
    const app = document.getElementById('app') || document.body;
    app.innerHTML = `
      <div style="
        background: #fee2e2;
        color: #991b1b;
        padding: 2rem;
        border-radius: 10px;
        margin: 1.5rem;
        border: 1px solid #fca5a5;
      ">
        <h2 style="margin-top: 0; color: #dc2626;">❌ Feedback Test Failed to Initialize</h2>
        <p><strong>Error:</strong> ${error.message}</p>
        <p>This might be because feedback components aren't properly implemented.</p>
        <p>Check browser console (F12) for detailed error information.</p>
        <button onclick="location.reload()" style="
          margin-top: 1rem;
          padding: 0.5rem 1.5rem;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
        ">
          Retry
        </button>
      </div>
    `;
    throw error;
  }
}

// Auto-run if imported directly
if (import.meta.url === document.currentScript?.src) {
  document.addEventListener('DOMContentLoaded', runFeedbackTest);
}