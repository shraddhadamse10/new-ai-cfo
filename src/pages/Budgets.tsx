import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Trash2, Edit, MoreVertical } from 'lucide-react';

const budgetCategories = [
  { id: 1, name: 'Housing', budget: 1500, spent: 1200, color: 'bg-primary-500' },
  { id: 2, name: 'Food', budget: 1000, spent: 800, color: 'bg-success-500' },
  { id: 3, name: 'Transportation', budget: 800, spent: 600, color: 'bg-warning-500' },
  { id: 4, name: 'Entertainment', budget: 400, spent: 450, color: 'bg-danger-500' },
  { id: 5, name: 'Utilities', budget: 500, spent: 380, color: 'bg-primary-700' },
  { id: 6, name: 'Shopping', budget: 300, spent: 250, color: 'bg-warning-600' },
  { id: 7, name: 'Healthcare', budget: 200, spent: 180, color: 'bg-success-600' },
  { id: 8, name: 'Education', budget: 100, spent: 75, color: 'bg-primary-600' },
];

const Budgets: React.FC = () => {
  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-neutral-800">Budget Planner</h1>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-700 flex items-center transition"
            >
              <Filter size={16} className="mr-1" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            
            <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center transition">
              <Plus size={16} className="mr-1" />
              <span className="hidden sm:inline">Create Budget</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgetCategories.map((category, index) => {
            const percentSpent = (category.spent / category.budget) * 100;
            const isOverBudget = category.spent > category.budget;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className={`h-4 w-4 rounded-full ${category.color} mr-2`}></div>
                      <h3 className="text-lg font-semibold text-neutral-800">{category.name}</h3>
                    </div>
                    <div className="relative">
                      <button className="text-neutral-400 hover:text-neutral-700 transition">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <div>
                      <p className="text-xs text-neutral-500">Spent</p>
                      <p className="text-lg font-semibold">${category.spent.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-neutral-500">Budget</p>
                      <p className="text-lg font-semibold">${category.budget.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{percentSpent.toFixed(0)}%</span>
                      <span className={isOverBudget ? 'text-danger-500 font-medium' : ''}>
                        ${(category.budget - category.spent).toLocaleString()} {isOverBudget ? 'over' : 'left'}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${isOverBudget ? 'bg-danger-500' : category.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentSpent, 100)}%` }}
                        transition={{ duration: 1 }}
                      ></motion.div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="p-1 text-neutral-400 hover:text-danger-500 transition">
                      <Trash2 size={16} />
                    </button>
                    <button className="p-1 text-neutral-400 hover:text-primary-500 transition">
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: budgetCategories.length * 0.05 }}
            className="border-2 border-dashed border-neutral-300 rounded-xl flex items-center justify-center p-10 hover:border-primary-400 transition cursor-pointer"
          >
            <div className="flex flex-col items-center text-neutral-500 hover:text-primary-600 transition">
              <Plus size={24} className="mb-2" />
              <span className="font-medium">Add New Budget</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-neutral-800 mb-5">AI Budget Recommendations</h2>
        
        <div className="space-y-4">
          <div className="border border-primary-100 bg-primary-50 rounded-lg p-4">
            <div className="flex items-start">
              <div className="p-2 bg-primary-100 rounded-full mr-4">
                <Trash2 size={18} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-primary-800 mb-1">Reduce Entertainment Budget</h3>
                <p className="text-sm text-neutral-600">
                  You've consistently gone over your Entertainment budget. Consider increasing it by 
                  $50 to $450 to better match your spending patterns.
                </p>
                <div className="flex mt-3">
                  <button className="text-xs px-3 py-1 bg-primary-600 text-white rounded-md mr-2 hover:bg-primary-700 transition">
                    Apply Recommendation
                  </button>
                  <button className="text-xs px-3 py-1 bg-white text-neutral-600 border border-neutral-300 rounded-md hover:bg-neutral-50 transition">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border border-success-100 bg-success-50 rounded-lg p-4">
            <div className="flex items-start">
              <div className="p-2 bg-success-100 rounded-full mr-4">
                <Plus size={18} className="text-success-600" />
              </div>
              <div>
                <h3 className="font-medium text-success-800 mb-1">Create Savings Budget</h3>
                <p className="text-sm text-neutral-600">
                  Based on your income and spending patterns, you could allocate $500 monthly for savings.
                  This would help you reach your long-term financial goals.
                </p>
                <div className="flex mt-3">
                  <button className="text-xs px-3 py-1 bg-success-600 text-white rounded-md mr-2 hover:bg-success-700 transition">
                    Create Savings Budget
                  </button>
                  <button className="text-xs px-3 py-1 bg-white text-neutral-600 border border-neutral-300 rounded-md hover:bg-neutral-50 transition">
                    Not Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budgets;