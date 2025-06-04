import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Sample data for the chart
const categoryData = [
  { name: 'Housing', value: 1200, color: '#3B82F6', change: -5 }, // Primary
  { name: 'Food', value: 800, color: '#10B981', change: 12 }, // Success
  { name: 'Transportation', value: 600, color: '#F59E0B', change: -2 }, // Warning
  { name: 'Entertainment', value: 450, color: '#EF4444', change: 8 }, // Danger
  { name: 'Utilities', value: 380, color: '#8B5CF6', change: 0 }, // Purple
  { name: 'Others', value: 250, color: '#6B7280', change: 3 }, // Gray
];

const SpendingCategories: React.FC = () => {
  const totalSpending = categoryData.reduce((sum, category) => sum + category.value, 0);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full">
      <h2 className="text-xl font-semibold text-neutral-800 mb-5">Spending by Category</h2>
      
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`$${value}`, 'Amount']}
              contentStyle={{
                borderRadius: '6px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-neutral-500 mb-2">Top Categories</h3>
        <ul className="space-y-2">
          {categoryData.slice(0, 3).map((category) => (
            <li key={category.name} className="flex justify-between items-center p-2 rounded-lg hover:bg-neutral-50">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold">${category.value}</span>
                <div className="flex items-center text-xs">
                  {category.change > 0 ? (
                    <>
                      <TrendingUp size={12} className="text-danger-500 mr-1" />
                      <span className="text-danger-500">+{category.change}%</span>
                    </>
                  ) : category.change < 0 ? (
                    <>
                      <TrendingDown size={12} className="text-success-500 mr-1" />
                      <span className="text-success-500">{category.change}%</span>
                    </>
                  ) : (
                    <span className="text-neutral-500">0%</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpendingCategories;