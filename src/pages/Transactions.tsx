import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Download, ChevronDown, ArrowUpDown, ExternalLink, Tag } from 'lucide-react';

// Sample transaction data
const transactions = [
  { id: 1, date: 'Jul 01, 2025', name: 'Whole Foods Market', category: 'Food', amount: -125.30, type: 'expense' },
  { id: 2, date: 'Jun 30, 2025', name: 'Salary Deposit', category: 'Income', amount: 4200.00, type: 'income' },
  { id: 3, date: 'Jun 28, 2025', name: 'Netflix Subscription', category: 'Entertainment', amount: -14.99, type: 'expense' },
  { id: 4, date: 'Jun 26, 2025', name: 'Electric Bill', category: 'Utilities', amount: -95.50, type: 'expense' },
  { id: 5, date: 'Jun 25, 2025', name: 'Uber Ride', category: 'Transportation', amount: -24.75, type: 'expense' },
  { id: 6, date: 'Jun 24, 2025', name: 'Amazon.com', category: 'Shopping', amount: -67.85, type: 'expense' },
  { id: 7, date: 'Jun 22, 2025', name: 'Freelance Payment', category: 'Income', amount: 850.00, type: 'income' },
];

// Category colors
const categoryColors: Record<string, string> = {
  Food: 'bg-green-100 text-green-800',
  Income: 'bg-blue-100 text-blue-800',
  Entertainment: 'bg-purple-100 text-purple-800',
  Utilities: 'bg-yellow-100 text-yellow-800',
  Transportation: 'bg-indigo-100 text-indigo-800',
  Shopping: 'bg-pink-100 text-pink-800',
};

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-neutral-800">Transactions</h1>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:min-w-[300px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-700 flex items-center transition"
            >
              <Filter size={16} className="mr-1" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            
            <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center transition">
              <Plus size={16} className="mr-1" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
        
        {filterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Date Range</label>
                  <select className="w-full rounded-lg border border-neutral-300 py-2 px-3 text-sm">
                    <option>Last 30 days</option>
                    <option>This month</option>
                    <option>Last month</option>
                    <option>Last 3 months</option>
                    <option>Custom range</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
                  <select className="w-full rounded-lg border border-neutral-300 py-2 px-3 text-sm">
                    <option>All categories</option>
                    <option>Food</option>
                    <option>Income</option>
                    <option>Entertainment</option>
                    <option>Utilities</option>
                    <option>Transportation</option>
                    <option>Shopping</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Amount Range</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full rounded-lg border border-neutral-300 py-2 px-3 text-sm"
                    />
                    <span className="text-neutral-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full rounded-lg border border-neutral-300 py-2 px-3 text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 rounded-lg text-neutral-700 mr-2">
                  Reset
                </button>
                <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg">
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown size={14} className="ml-1 text-neutral-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Name
                    <ArrowUpDown size={14} className="ml-1 text-neutral-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <div className="flex items-center justify-end">
                    Amount
                    <ArrowUpDown size={14} className="ml-1 text-neutral-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredTransactions.map((transaction) => (
                <motion.tr 
                  key={transaction.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
                  className="hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-800">{transaction.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${categoryColors[transaction.category]}`}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    <span className={transaction.type === 'income' ? 'text-success-600' : 'text-neutral-800'}>
                      {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="p-1 text-neutral-400 hover:text-neutral-700 transition">
                        <Tag size={16} />
                      </button>
                      <button className="p-1 text-neutral-400 hover:text-neutral-700 transition">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-neutral-500">
            Showing <span className="font-medium">{filteredTransactions.length}</span> of {transactions.length} transactions
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition">
              <ChevronDown size={16} className="rotate-90" />
            </button>
            <div className="px-4 py-2 text-sm">Page 1 of 1</div>
            <button className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition">
              <ChevronDown size={16} className="rotate-270" />
            </button>
          </div>
          <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-700 flex items-center transition">
            <Download size={16} className="mr-1" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;