import React, { createContext, useContext, ReactNode } from 'react';
import { useOperaCSP } from '../hooks/useOperaCSP';

// Context for Opera CSP utilities
const OperaCSPContext = createContext<ReturnType<typeof useOperaCSP> | null>(null);

interface OperaCSPProviderProps {
  children: ReactNode;
}

// Provider component for Opera CSP compatibility
export const OperaCSPProvider: React.FC<OperaCSPProviderProps> = ({ children }) => {
  const operaCSP = useOperaCSP();

  return (
    <OperaCSPContext.Provider value={operaCSP}>
      {children}
    </OperaCSPContext.Provider>
  );
};

// Hook to use Opera CSP context
export const useOperaCSPContext = () => {
  const context = useContext(OperaCSPContext);
  if (!context) {
    throw new Error('useOperaCSPContext must be used within OperaCSPProvider');
  }
  return context;
};

// Example usage component
export const OperaCompatibleComponent: React.FC = () => {
  const { isOpera, safeEval, renderTemplate, loadScript } = useOperaCSPContext();

  const handleDynamicExecution = () => {
    if (isOpera) {
      // Use safe alternatives for Opera
      const result = safeEval('2 + 2');
      console.log('Safe eval result:', result);
      
      const template = 'Hello {{name}}!';
      const rendered = renderTemplate(template, { name: 'Opera User' });
      console.log('Template result:', rendered);
    } else {
      // Use standard methods for other browsers
      const result = eval('2 + 2');
      console.log('Standard eval result:', result);
    }
  };

  const handleScriptLoading = async () => {
    try {
      await loadScript('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js');
      console.log('Script loaded successfully');
    } catch (error) {
      console.error('Script loading failed:', error);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">
        Opera CSP Compatibility {isOpera ? '(Opera Detected)' : '(Other Browser)'}
      </h3>
      
      <div className="space-y-2">
        <button
          onClick={handleDynamicExecution}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test Dynamic Execution
        </button>
        
        <button
          onClick={handleScriptLoading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Test Script Loading
        </button>
      </div>
    </div>
  );
};