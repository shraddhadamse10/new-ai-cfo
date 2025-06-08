import { useEffect, useCallback, useState } from 'react';
import { OperaCSPCompat, operaUtils } from '../utils/operaCompat';

// React hook for Opera CSP compatibility with performance optimizations
export const useOperaCSP = () => {
  const [isOpera, setIsOpera] = useState(false);
  const [operaVersion, setOperaVersion] = useState<number | null>(null);
  const [hasNonceSupport, setHasNonceSupport] = useState(false);

  // Initialize Opera detection and optimizations
  useEffect(() => {
    const operaDetected = OperaCSPCompat.isOpera();
    const version = OperaCSPCompat.getOperaVersion();
    const nonceSupport = OperaCSPCompat.hasNonceSupport();
    
    setIsOpera(operaDetected);
    setOperaVersion(version);
    setHasNonceSupport(nonceSupport);
    
    if (operaDetected) {
      console.log('Opera CSP compatibility layer initialized');
      
      // Apply Opera-specific optimizations
      OperaCSPCompat.optimizeForOpera();
      
      // Log compatibility information
      console.log(`Opera version: ${version || 'unknown'}`);
      console.log(`Nonce support: ${nonceSupport ? 'available' : 'not available'}`);
    }
  }, []);

  // Safe eval function optimized for Opera
  const safeEval = useCallback((code: string, context?: Record<string, any>) => {
    if (isOpera) {
      return operaUtils.eval(code, context);
    }
    // Fallback for other browsers
    try {
      return eval(code);
    } catch (error) {
      console.warn('Eval failed, using safe alternative:', error);
      return operaUtils.eval(code, context);
    }
  }, [isOpera]);

  // Safe template rendering optimized for Opera
  const renderTemplate = useCallback((template: string, data: Record<string, any>) => {
    return operaUtils.template(template, data);
  }, []);

  // Safe script loading with Opera-specific optimizations
  const loadScript = useCallback(async (src: string) => {
    if (isOpera) {
      // Use Opera-optimized script loading
      return operaUtils.loadScript(src);
    }
    
    // Standard script loading for other browsers
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }, [isOpera]);

  // Safe CSS injection optimized for Opera
  const injectCSS = useCallback((css: string) => {
    operaUtils.injectCSS(css);
  }, []);

  // Safe timeout/interval with Opera optimizations
  const safeSetTimeout = useCallback((callback: string | Function, delay: number, ...args: any[]) => {
    return operaUtils.setTimeout(callback, delay, ...args);
  }, []);

  const safeSetInterval = useCallback((callback: string | Function, delay: number, ...args: any[]) => {
    return operaUtils.setInterval(callback, delay, ...args);
  }, []);

  // Opera-specific function creation
  const createFunction = useCallback((params: string[], body: string) => {
    return OperaCSPCompat.createFunction(params, body);
  }, []);

  // Get current nonce for dynamic script creation
  const getCurrentNonce = useCallback(() => {
    return OperaCSPCompat.getCurrentNonce();
  }, []);

  // Opera performance monitoring
  const measurePerformance = useCallback((name: string, fn: Function) => {
    if (isOpera && performance.mark) {
      performance.mark(`${name}-start`);
      const result = fn();
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      return result;
    }
    return fn();
  }, [isOpera]);

  return {
    isOpera,
    operaVersion,
    hasNonceSupport,
    safeEval,
    renderTemplate,
    loadScript,
    injectCSS,
    safeSetTimeout,
    safeSetInterval,
    createFunction,
    getCurrentNonce,
    measurePerformance,
    utils: operaUtils
  };
};

// Higher-order component for Opera CSP compatibility
export const withOperaCSP = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const operaCSP = useOperaCSP();
    
    return <Component {...props} operaCSP={operaCSP} />;
  };
};

// Hook for Opera-specific performance optimizations
export const useOperaPerformance = () => {
  const { isOpera, measurePerformance } = useOperaCSP();
  
  const optimizeForOpera = useCallback((fn: Function, name?: string) => {
    if (isOpera) {
      return measurePerformance(name || 'opera-optimization', fn);
    }
    return fn();
  }, [isOpera, measurePerformance]);
  
  return {
    isOpera,
    optimizeForOpera
  };
};