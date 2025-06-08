import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useOperaCSP } from '../hooks/useOperaCSP';

// Context for Opera CSP utilities with performance monitoring
const OperaCSPContext = createContext<ReturnType<typeof useOperaCSP> | null>(null);

interface OperaCSPProviderProps {
  children: ReactNode;
}

// Provider component for Opera CSP compatibility with enhanced features
export const OperaCSPProvider: React.FC<OperaCSPProviderProps> = ({ children }) => {
  const operaCSP = useOperaCSP();
  const [performanceMetrics, setPerformanceMetrics] = useState<Record<string, number>>({});

  // Monitor Opera-specific performance metrics
  useEffect(() => {
    if (operaCSP.isOpera && performance.getEntriesByType) {
      const measurePerformance = () => {
        const measures = performance.getEntriesByType('measure');
        const metrics: Record<string, number> = {};
        
        measures.forEach(measure => {
          metrics[measure.name] = measure.duration;
        });
        
        setPerformanceMetrics(metrics);
      };

      // Monitor performance every 5 seconds in Opera
      const interval = setInterval(measurePerformance, 5000);
      
      return () => clearInterval(interval);
    }
  }, [operaCSP.isOpera]);

  // Log Opera-specific information
  useEffect(() => {
    if (operaCSP.isOpera) {
      console.log('Opera CSP Provider initialized');
      console.log(`Opera version: ${operaCSP.operaVersion || 'unknown'}`);
      console.log(`Nonce support: ${operaCSP.hasNonceSupport ? 'available' : 'not available'}`);
      
      // Log performance metrics periodically
      if (Object.keys(performanceMetrics).length > 0) {
        console.log('Opera performance metrics:', performanceMetrics);
      }
    }
  }, [operaCSP.isOpera, operaCSP.operaVersion, operaCSP.hasNonceSupport, performanceMetrics]);

  return (
    <OperaCSPContext.Provider value={operaCSP}>
      {children}
    </OperaCSPContext.Provider>
  );
};

// Hook to use Opera CSP context with error handling
export const useOperaCSPContext = () => {
  const context = useContext(OperaCSPContext);
  if (!context) {
    throw new Error('useOperaCSPContext must be used within OperaCSPProvider');
  }
  return context;
};

// Opera-compatible component for testing CSP functionality
export const OperaCompatibleComponent: React.FC = () => {
  const { isOpera, safeEval, renderTemplate, loadScript, operaVersion, hasNonceSupport } = useOperaCSPContext();
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});

  const runOperaTests = async () => {
    const results: Record<string, boolean> = {};
    
    try {
      // Test safe eval
      const evalResult = safeEval('2 + 2');
      results.safeEval = evalResult === 4;
      
      // Test template rendering
      const template = 'Hello {{name}}!';
      const rendered = renderTemplate(template, { name: 'Opera User' });
      results.templateRendering = rendered === 'Hello Opera User!';
      
      // Test mathematical expressions
      const mathResult = safeEval('Math.max(10, 20)');
      results.mathExpressions = mathResult === 20;
      
      // Test property access
      const objResult = safeEval('user.name', { user: { name: 'Test' } });
      results.propertyAccess = objResult === 'Test';
      
      console.log('Opera CSP tests completed:', results);
      setTestResults(results);
    } catch (error) {
      console.error('Opera CSP tests failed:', error);
    }
  };

  const testScriptLoading = async () => {
    try {
      // Test loading a safe external script
      await loadScript('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js');
      console.log('Script loading test passed');
      setTestResults(prev => ({ ...prev, scriptLoading: true }));
    } catch (error) {
      console.error('Script loading test failed:', error);
      setTestResults(prev => ({ ...prev, scriptLoading: false }));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-neutral-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        Opera CSP Compatibility 
        {isOpera && <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">Opera Detected</span>}
      </h3>
      
      {isOpera && (
        <div className="mb-4 p-3 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-700">
            <strong>Opera Version:</strong> {operaVersion || 'Unknown'}
          </p>
          <p className="text-sm text-primary-700">
            <strong>Nonce Support:</strong> {hasNonceSupport ? 'Available' : 'Not Available'}
          </p>
        </div>
      )}
      
      <div className="space-y-3">
        <button
          onClick={runOperaTests}
          className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
        >
          Run Opera CSP Tests
        </button>
        
        <button
          onClick={testScriptLoading}
          className="px-4 py-2 bg-success-600 text-white rounded hover:bg-success-700 transition ml-2"
        >
          Test Script Loading
        </button>
      </div>
      
      {Object.keys(testResults).length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Test Results:</h4>
          <div className="space-y-1">
            {Object.entries(testResults).map(([test, passed]) => (
              <div key={test} className="flex items-center text-sm">
                <span className={`w-3 h-3 rounded-full mr-2 ${passed ? 'bg-success-500' : 'bg-danger-500'}`}></span>
                <span className="capitalize">{test.replace(/([A-Z])/g, ' $1')}: </span>
                <span className={passed ? 'text-success-600' : 'text-danger-600'}>
                  {passed ? 'Passed' : 'Failed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 text-xs text-neutral-500">
        <p>This component tests Opera CSP compatibility and provides debugging information.</p>
        {isOpera && (
          <p className="mt-1 text-primary-600">
            Opera browser detected - using optimized CSP compatibility layer.
          </p>
        )}
      </div>
    </div>
  );
};