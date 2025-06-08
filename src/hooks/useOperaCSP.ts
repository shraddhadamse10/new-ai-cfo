import { useEffect, useCallback } from 'react';
import { OperaCSPCompat, operaUtils } from '../utils/operaCompat';

// React hook for Opera CSP compatibility
export const useOperaCSP = () => {
  const isOpera = OperaCSPCompat.isOpera();

  // Safe eval function
  const safeEval = useCallback((code: string, context?: Record<string, any>) => {
    return operaUtils.eval(code, context);
  }, []);

  // Safe template rendering
  const renderTemplate = useCallback((template: string, data: Record<string, any>) => {
    return operaUtils.template(template, data);
  }, []);

  // Safe script loading
  const loadScript = useCallback(async (src: string) => {
    return operaUtils.loadScript(src);
  }, []);

  // Safe CSS injection
  const injectCSS = useCallback((css: string) => {
    operaUtils.injectCSS(css);
  }, []);

  // Safe timeout/interval
  const safeSetTimeout = useCallback((callback: string | Function, delay: number, ...args: any[]) => {
    return operaUtils.setTimeout(callback, delay, ...args);
  }, []);

  const safeSetInterval = useCallback((callback: string | Function, delay: number, ...args: any[]) => {
    return operaUtils.setInterval(callback, delay, ...args);
  }, []);

  // Initialize Opera compatibility layer
  useEffect(() => {
    if (isOpera) {
      console.log('Opera CSP compatibility layer initialized');
    }
  }, [isOpera]);

  return {
    isOpera,
    safeEval,
    renderTemplate,
    loadScript,
    injectCSS,
    safeSetTimeout,
    safeSetInterval,
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