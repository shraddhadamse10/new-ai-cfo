import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Sparkles, Download, AlertTriangle, ArrowRight } from 'lucide-react';

// Sample data
const monthlyData = [
  { month: 'Jan', income: 6500, expenses: 4500, savings: 2000 },
  { month: 'Feb', income: 6800, expenses: 4600, savings: 2200 },
  { month: 'Mar', income: 7200, expenses: 4800, savings: 2400 },
  { month: 'Apr', income: 7000, expenses: 5200, savings: 1800 },
  { month: 'May', income: 7500, expenses: 4900, savings: 2600 },
  { month: 'Jun', income: 8200, expenses: 5100, savings: 3100 },
  { month: 'Jul', income: 8350, expenses: 4865, savings: 3485 },
];

const categoryData = [
  { name: 'Housing', amount: 1200, previousMonth: 1180 },
  { name: 'Food', amount: 800, previousMonth: 720 },
  { name: 'Transportation', amount: 600, previousMonth: 580 },
  { name: 'Entertainment', amount: 450, previousMonth: 400 },
  { name: 'Utilities', amount: 380, previousMonth: 410 },
  { name: 'Others', amount: 250, previousMonth: 280 },
];

const Insights: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6m');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
        <h1 className="text-2xl font-bold text-neutral-800">Financial Insights</h1>
        
        <div className="flex space-x-1 bg-neutral-100 p-1 rounded-lg mt-3 sm:mt-0">
          {['1m', '3m', '6m', '1y', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                timeRange === range
                  ? 'bg-white shadow-sm text-primary-700'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-800">Income vs. Expenses</h2>
          <button className="text-sm text-primary-600 hover:text-primary-700 transition flex items-center">
            <Download size={16} className="mr-1" />
            Export Data
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm text-neutral-600">Total Income</div>
              <div className="flex items-center text-success-600 text-xs font-medium">
                <TrendingUp size={14} className="mr-1" />
                +12.5%
              </div>
            </div>
            <div className="text-2xl font-bold text-neutral-800">$51,550</div>
          </div>
          
          <div className="p-4 bg-danger-50 rounded-lg border border-danger-100">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm text-neutral-600">Total Expenses</div>
              <div className="flex items-center text-success-600 text-xs font-medium">
                <TrendingDown size={14} className="mr-1" />
                -3.2%
              </div>
            </div>
            <div className="text-2xl font-bold text-neutral-800">$33,965</div>
          </div>
          
          <div className="p-4 bg-success-50 rounded-lg border border-success-100">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm text-neutral-600">Savings</div>
              <div className="flex items-center text-success-600 text-xs font-medium">
                <TrendingUp size={14} className="mr-1" />
                +18.9%
              </div>
            </div>
            <div className="text-2xl font-bold text-neutral-800">$17,585</div>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
              <YAxis
                tickFormatter={(value) => `$${value}`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, '']}
                contentStyle={{
                  borderRadius: '6px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2"
        >
          <h2 className="text-xl font-semibold text-neutral-800 mb-6">Spending by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
                <YAxis
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip
                  formatter={(value) => [`$${value}`, '']}
                  contentStyle={{
                    borderRadius: '6px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="amount" 
                  name="Current Month" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="previousMonth" 
                  name="Previous Month" 
                  fill="#93C5FD" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center mb-6">
            <Sparkles size={20} className="text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold text-neutral-800">AI Insights</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition cursor-pointer">
              <div className="flex items-start">
                <div className="p-2 bg-primary-100 rounded-full mr-3">
                  <TrendingUp size={16} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-800 mb-1">Positive Saving Trend</h3>
                  <p className="text-xs text-neutral-600">
                    Your savings rate has increased by 18.9% compared to the previous period. 
                    Keep up the good work!
                  </p>
                </div>
                <ArrowRight size={16} className="text-neutral-400 ml-2 mt-2" />
              </div>
            </div>
            
            <div className="p-4 border border-neutral-200 rounded-lg hover:border-warning-300 transition cursor-pointer">
              <div className="flex items-start">
                <div className="p-2 bg-warning-100 rounded-full mr-3">
                  <AlertTriangle size={16} className="text-warning-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-800 mb-1">Entertainment Spending Alert</h3>
                  <p className="text-xs text-neutral-600">
                    You've exceeded your Entertainment budget by $50 (12.5%). 
                    Consider adjusting your budget or reducing spending.
                  </p>
                </div>
                <ArrowRight size={16} className="text-neutral-400 ml-2 mt-2" />
              </div>
            </div>
            
            <div className="p-4 border border-neutral-200 rounded-lg hover:border-success-300 transition cursor-pointer">
              <div className="flex items-start">
                <div className="p-2 bg-success-100 rounded-full mr-3">
                  <TrendingDown size={16} className="text-success-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-800 mb-1">Utilities Optimization</h3>
                  <p className="text-xs text-neutral-600">
                    Your utilities spending decreased by 7.3% this month. 
                    Energy efficiency improvements are paying off.
                  </p>
                </div>
                <ArrowRight size={16} className="text-neutral-400 ml-2 mt-2" />
              </div>
            </div>
          </div>
          
          <button className="w-full mt-6 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg text-sm font-medium transition">
            View All Insights
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Insights;