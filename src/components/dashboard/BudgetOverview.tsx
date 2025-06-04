import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface BudgetCategory {
  name: string;
  budget: number;
  spent: number;
  color: string;
}

const budgetCategories: BudgetCategory[] = [
  { name: 'Housing', budget: 1500, spent: 1200, color: 'primary' },
  { name: 'Food', budget: 1000, spent: 800, color: 'success' },
  { name: 'Transportation', budget: 800, spent: 600, color: 'warning' },
  { name: 'Entertainment', budget: 400, spent: 450, color: 'danger' },
  { name: 'Utilities', budget: 500, spent: 380, color: 'primary' },
];

const colorMap: Record<string, string> = {
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
};

const BudgetOverview: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-800">Budget Overview</h2>
        <button className="px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg text-sm font-medium transition">
          Adjust Budgets
        </button>
      </div>

      <div className="space-y-4">
        {budgetCategories.map((category, index) => {
          const percentSpent = (category.spent / category.budget) * 100;
          const isOverBudget = category.spent > category.budget;
          
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-neutral-800">{category.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-neutral-800">
                    ${category.spent.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-500 ml-1">
                    / ${category.budget.toLocaleString()}
                  </span>
                  
                  {isOverBudget && (
                    <div className="ml-2 text-danger-500 flex items-center">
                      <AlertCircle size={14} />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${colorMap[category.color]} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentSpent, 100)}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                ></motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-neutral-100">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-neutral-500">Total Budget</span>
          <div>
            <span className="text-base font-semibold text-neutral-800">$3,430</span>
            <span className="text-xs text-neutral-500 ml-1">/ $4,200</span>
          </div>
        </div>
        <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mt-2">
          <motion.div 
            className="h-full bg-primary-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '81.6%' }}
            transition={{ duration: 1, delay: 0.8 }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;