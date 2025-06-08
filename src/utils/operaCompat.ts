// Opera Browser CSP Compatibility Utilities
// This module provides secure alternatives to eval() and string-based execution

export class OperaCSPCompat {
  // Check if running in Opera browser
  static isOpera(): boolean {
    return navigator.userAgent.includes('OPR/') || navigator.userAgent.includes('Opera/');
  }

  // Safe alternative to eval() for Opera
  static safeEval(expression: string, context: Record<string, any> = {}): any {
    try {
      // For simple JSON data
      if (expression.trim().startsWith('{') || expression.trim().startsWith('[')) {
        return JSON.parse(expression);
      }

      // For simple mathematical expressions
      if (/^[\d\s+\-*/().]+$/.test(expression)) {
        // Use Function constructor instead of eval for mathematical expressions
        const func = new Function('return (' + expression + ')');
        return func();
      }

      // For simple property access
      if (/^[\w.]+$/.test(expression)) {
        return this.getNestedProperty(context, expression);
      }

      // For simple expressions with context, use Function constructor
      const contextKeys = Object.keys(context);
      const contextValues = Object.values(context);
      const func = new Function(...contextKeys, `"use strict"; return (${expression})`);
      return func(...contextValues);
    } catch (error) {
      console.warn('Opera CSP: Safe eval failed:', error);
      return null;
    }
  }

  // Safe template rendering without eval
  static renderTemplate(template: string, data: Record<string, any>): string {
    return template.replace(/\{\{(\w+(?:\.\w+)*)\}\}/g, (match, path) => {
      const value = this.getNestedProperty(data, path);
      return value !== undefined ? String(value) : '';
    });
  }

  // Get nested property safely
  private static getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // Safe dynamic function creation
  static createFunction(params: string[], body: string): Function {
    try {
      return new Function(...params, body);
    } catch (error) {
      console.error('Opera CSP: Function creation failed:', error);
      return () => null;
    }
  }

  // Safe script loading
  static loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  // Safe CSS injection
  static injectCSS(css: string): void {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // Safe HTML rendering
  static renderHTML(container: HTMLElement, html: string, data: Record<string, any> = {}): void {
    const rendered = this.renderTemplate(html, data);
    container.innerHTML = rendered;
  }

  // Safe event handler attachment
  static attachEventHandler(element: HTMLElement, event: string, handler: string | Function): void {
    if (typeof handler === 'string') {
      // Convert string handler to function safely
      const func = this.createFunction(['event'], handler);
      element.addEventListener(event, func);
    } else {
      element.addEventListener(event, handler);
    }
  }

  // Safe timeout/interval with string support
  static safeSetTimeout(callback: string | Function, delay: number, ...args: any[]): number {
    if (typeof callback === 'string') {
      const func = this.createFunction([], callback);
      return window.setTimeout(func, delay, ...args);
    }
    return window.setTimeout(callback, delay, ...args);
  }

  static safeSetInterval(callback: string | Function, delay: number, ...args: any[]): number {
    if (typeof callback === 'string') {
      const func = this.createFunction([], callback);
      return window.setInterval(func, delay, ...args);
    }
    return window.setInterval(callback, delay, ...args);
  }
}

// Global utility functions for Opera compatibility
export const operaUtils = {
  // Replace eval() calls
  eval: (code: string, context?: Record<string, any>) => OperaCSPCompat.safeEval(code, context),
  
  // Replace setTimeout with string
  setTimeout: (callback: string | Function, delay: number, ...args: any[]) => 
    OperaCSPCompat.safeSetTimeout(callback, delay, ...args),
  
  // Replace setInterval with string
  setInterval: (callback: string | Function, delay: number, ...args: any[]) => 
    OperaCSPCompat.safeSetInterval(callback, delay, ...args),
  
  // Template rendering
  template: (template: string, data: Record<string, any>) => 
    OperaCSPCompat.renderTemplate(template, data),
  
  // Dynamic script loading
  loadScript: (src: string) => OperaCSPCompat.loadScript(src),
  
  // CSS injection
  injectCSS: (css: string) => OperaCSPCompat.injectCSS(css)
};

// Auto-apply Opera compatibility if detected
if (OperaCSPCompat.isOpera()) {
  console.log('Opera browser detected, CSP compatibility layer active');
  
  // Make utilities globally available
  (window as any).operaUtils = operaUtils;
  (window as any).OperaCSPCompat = OperaCSPCompat;
}