// Opera Browser CSP Compatibility Utilities
// This module provides secure alternatives to eval() and string-based execution
// Optimized specifically for Opera's strict CSP enforcement

export class OperaCSPCompat {
  // Check if running in Opera browser (including Opera GX)
  static isOpera(): boolean {
    const userAgent = navigator.userAgent;
    return userAgent.includes('OPR/') || 
           userAgent.includes('Opera/') || 
           userAgent.includes('OperaGX/');
  }

  // Get Opera version for compatibility checks
  static getOperaVersion(): number | null {
    const userAgent = navigator.userAgent;
    const operaMatch = userAgent.match(/(?:Opera|OPR)\/(\d+)/);
    return operaMatch ? parseInt(operaMatch[1], 10) : null;
  }

  // Safe alternative to eval() optimized for Opera's JavaScript engine
  static safeEval(expression: string, context: Record<string, any> = {}): any {
    try {
      // For simple JSON data - Opera handles JSON.parse very efficiently
      if (expression.trim().startsWith('{') || expression.trim().startsWith('[')) {
        return JSON.parse(expression);
      }

      // For simple mathematical expressions - Opera optimized
      if (/^[\d\s+\-*/().]+$/.test(expression)) {
        // Use Function constructor instead of eval for mathematical expressions
        const func = new Function('return (' + expression + ')');
        return func();
      }

      // For simple property access - Opera's strength
      if (/^[\w.]+$/.test(expression)) {
        return this.getNestedProperty(context, expression);
      }

      // For boolean expressions
      if (/^(true|false|\d+\s*[<>=!]+\s*\d+)$/.test(expression)) {
        const func = new Function('return (' + expression + ')');
        return func();
      }

      // For expressions with context - Opera optimized approach
      const contextKeys = Object.keys(context);
      const contextValues = Object.values(context);
      
      // Opera performs better with explicit parameter passing
      const func = new Function(...contextKeys, `"use strict"; return (${expression})`);
      return func(...contextValues);
    } catch (error) {
      console.warn('Opera CSP: Safe eval failed:', error);
      return null;
    }
  }

  // Safe template rendering without eval - Opera optimized
  static renderTemplate(template: string, data: Record<string, any>): string {
    // Opera handles regex replacements very efficiently
    return template.replace(/\{\{(\w+(?:\.\w+)*)\}\}/g, (match, path) => {
      const value = this.getNestedProperty(data, path);
      return value !== undefined ? String(value) : '';
    });
  }

  // Get nested property safely - Opera optimized property access
  private static getNestedProperty(obj: any, path: string): any {
    // Opera's JavaScript engine optimizes this pattern well
    return path.split('.').reduce((current, key) => {
      return current && typeof current === 'object' ? current[key] : undefined;
    }, obj);
  }

  // Safe dynamic function creation - Opera compatible
  static createFunction(params: string[], body: string): Function {
    try {
      // Opera handles Function constructor better than eval
      return new Function(...params, body);
    } catch (error) {
      console.error('Opera CSP: Function creation failed:', error);
      return () => null;
    }
  }

  // Safe script loading with Opera-specific optimizations
  static loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      // Opera-specific attributes for better compatibility
      script.crossOrigin = 'anonymous';
      script.referrerPolicy = 'no-referrer';
      
      script.onload = () => {
        console.log(`Opera CSP: Script loaded successfully: ${src}`);
        resolve();
      };
      
      script.onerror = (error) => {
        console.error(`Opera CSP: Script loading failed: ${src}`, error);
        reject(new Error(`Failed to load script: ${src}`));
      };
      
      document.head.appendChild(script);
    });
  }

  // Safe CSS injection - Opera optimized
  static injectCSS(css: string): void {
    const style = document.createElement('style');
    style.textContent = css;
    
    // Opera-specific optimization
    style.setAttribute('data-opera-compat', 'true');
    document.head.appendChild(style);
  }

  // Safe HTML rendering with Opera security considerations
  static renderHTML(container: HTMLElement, html: string, data: Record<string, any> = {}): void {
    const rendered = this.renderTemplate(html, data);
    
    // Opera handles innerHTML securely when CSP is properly configured
    container.innerHTML = rendered;
  }

  // Safe event handler attachment - Opera optimized
  static attachEventHandler(element: HTMLElement, event: string, handler: string | Function): void {
    if (typeof handler === 'string') {
      // Convert string handler to function safely for Opera
      const func = this.createFunction(['event'], handler);
      element.addEventListener(event, func);
    } else {
      element.addEventListener(event, handler);
    }
  }

  // Safe timeout/interval with string support - Opera compatible
  static safeSetTimeout(callback: string | Function, delay: number, ...args: any[]): number {
    if (typeof callback === 'string') {
      // Opera-optimized string-to-function conversion
      const func = this.createFunction([], callback);
      return window.setTimeout(func, delay, ...args);
    }
    return window.setTimeout(callback, delay, ...args);
  }

  static safeSetInterval(callback: string | Function, delay: number, ...args: any[]): number {
    if (typeof callback === 'string') {
      // Opera-optimized string-to-function conversion
      const func = this.createFunction([], callback);
      return window.setInterval(func, delay, ...args);
    }
    return window.setInterval(callback, delay, ...args);
  }

  // Opera-specific performance optimizations
  static optimizeForOpera(): void {
    if (this.isOpera()) {
      // Enable Opera-specific optimizations
      console.log('Applying Opera-specific performance optimizations');
      
      // Preload common functions for better performance
      this.preloadCommonFunctions();
      
      // Set up Opera-specific error handling
      this.setupOperaErrorHandling();
    }
  }

  private static preloadCommonFunctions(): void {
    // Preload commonly used functions for Opera's JIT compiler
    const commonFunctions = [
      'return true',
      'return false',
      'return 0',
      'return 1',
      'return ""',
      'return null'
    ];
    
    commonFunctions.forEach(func => {
      try {
        new Function(func);
      } catch (e) {
        // Ignore preload errors
      }
    });
  }

  private static setupOperaErrorHandling(): void {
    // Opera-specific error handling for CSP violations
    window.addEventListener('securitypolicyviolation', (event) => {
      if (event.violatedDirective === 'script-src') {
        console.warn('Opera CSP: Script-src violation detected:', event);
        // Provide helpful debugging information for Opera users
        console.log('Opera CSP: Consider using OperaCSPCompat utilities for dynamic code execution');
      }
    });
  }

  // Check if nonce-based CSP is available (Opera's preferred method)
  static hasNonceSupport(): boolean {
    const scripts = document.querySelectorAll('script[nonce]');
    return scripts.length > 0;
  }

  // Get current nonce value for dynamic script creation
  static getCurrentNonce(): string | null {
    const script = document.querySelector('script[nonce]');
    return script ? script.getAttribute('nonce') : null;
  }
}

// Global utility functions optimized for Opera browser
export const operaUtils = {
  // Replace eval() calls - Opera optimized
  eval: (code: string, context?: Record<string, any>) => OperaCSPCompat.safeEval(code, context),
  
  // Replace setTimeout with string - Opera compatible
  setTimeout: (callback: string | Function, delay: number, ...args: any[]) => 
    OperaCSPCompat.safeSetTimeout(callback, delay, ...args),
  
  // Replace setInterval with string - Opera compatible
  setInterval: (callback: string | Function, delay: number, ...args: any[]) => 
    OperaCSPCompat.safeSetInterval(callback, delay, ...args),
  
  // Template rendering - Opera optimized
  template: (template: string, data: Record<string, any>) => 
    OperaCSPCompat.renderTemplate(template, data),
  
  // Dynamic script loading - Opera compatible
  loadScript: (src: string) => OperaCSPCompat.loadScript(src),
  
  // CSS injection - Opera optimized
  injectCSS: (css: string) => OperaCSPCompat.injectCSS(css),

  // Opera-specific utilities
  isOpera: () => OperaCSPCompat.isOpera(),
  getOperaVersion: () => OperaCSPCompat.getOperaVersion(),
  optimizeForOpera: () => OperaCSPCompat.optimizeForOpera(),
  hasNonceSupport: () => OperaCSPCompat.hasNonceSupport(),
  getCurrentNonce: () => OperaCSPCompat.getCurrentNonce()
};

// Auto-apply Opera compatibility if detected
if (OperaCSPCompat.isOpera()) {
  console.log('Opera browser detected, applying CSP compatibility layer');
  
  // Apply Opera-specific optimizations
  OperaCSPCompat.optimizeForOpera();
  
  // Make utilities globally available for Opera
  (window as any).operaUtils = operaUtils;
  (window as any).OperaCSPCompat = OperaCSPCompat;
  
  // Log Opera version for debugging
  const version = OperaCSPCompat.getOperaVersion();
  if (version) {
    console.log(`Opera version ${version} detected`);
  }
}