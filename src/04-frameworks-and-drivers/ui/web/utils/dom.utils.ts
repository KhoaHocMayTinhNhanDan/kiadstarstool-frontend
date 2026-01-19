// Các hàm làm việc trực tiếp với DOM
export const domUtils = {
  // Element manipulation
  getScrollPosition: () => window.pageYOffset,
  scrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  
  // Event handling
  addEventListener: (el: { addEventListener: (arg0: any, arg1: any) => any; }, event: any, handler: any) => el.addEventListener(event, handler),
  removeEventListener: (el: { removeEventListener: (arg0: any, arg1: any) => any; }, event: any, handler: any) => el.removeEventListener(event, handler),
  
  // CSS/Classes
  addClass: (el: { classList: { add: (arg0: any) => any; }; }, className: any) => el.classList.add(className),
  removeClass: (el: Element, className: string) => el.classList.remove(className),
  toggleClass: (el: Element, className: string) => el.classList.toggle(className),
  
  // Visibility
  isElementVisible: (el: Element) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  },
  
  // Focus management
  focusFirstInput: (container: Element) => {
    const firstInput = container.querySelector('input, textarea, select') as HTMLElement | null;
    firstInput?.focus();
  },
  
  // Copy to clipboard
  copyToClipboard: async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  }
};