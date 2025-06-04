import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Area, 
  AreaChart,
  TooltipProps 
} from 'recharts';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

// Sample data for the charts
const financialData = [
  { name: 'Jan', income: 6500, expenses: 4500, balance: 2000 },
  { name: 'Feb', income: 6800, expenses: 4600, balance: 2200 },
  { name: 'Mar', income: 7200, expenses: 4800, balance: 2400 },
  { name: 'Apr', income: 7000, expenses: 5200, balance: 1800 },
  { name: 'May', income: 7500, expenses: 4900, balance: 2600 },
  { name: 'Jun', income: 8200, expenses: 5100, balance: 3100 },
  { name: 'Jul', income: 8350, expenses: 4865, balance: 3485 },
];

type TimeRange = '7d' | '1m' | '3m' | '6m' | '1y' | 'all';

const BalanceChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('6m');

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-neutral-200">
          <p className="font-medium text-sm text-neutral-800">{`${payload[0].payload.name}`}</p>
          <div className="mt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
              <p className="text-sm text-neutral-700">
                Income: <span className="font-medium">${payload[0].value?.toLocaleString()}</span>
              </p>
            </div>
            <div className="flex items-center mt-1">
              <div className="w-3 h-3 rounded-full bg-danger-500 mr-2"></div>
              <p className="text-sm text-neutral-700">
                Expenses: <span className="font-medium">${payload[1].value?.toLocaleString()}</span>
              </p>
            </div>
            <div className="flex items-center mt-1">
              <div className="w-3 h-3 rounded-full bg-success-500 mr-2"></div>
              <p className="text-sm text-neutral-700">
                Balance: <span className="font-medium">${payload[2].value?.toLocaleString()}</span>
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-800">Cash Flow</h2>
        
        <div className="flex space-x-1 bg-neutral-100 p-1 rounded-lg mt-3 sm:mt-0">
          {(['7d', '1m', '3m', '6m', '1y', 'all'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => handleTimeRangeChange(range)}
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
      
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <ArrowUpRight size={16} className="text-success-600 mr-1" />
            <div>
              <p className="text-neutral-500 text-xs">Total Income</p>
              <p className="font-semibold">$51,550.00</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <ArrowDownRight size={16} className="text-danger-600 mr-1" />
            <div>
              <p className="text-neutral-500 text-xs">Total Expenses</p>
              <p className="font-semibold">$33,965.00</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={financialData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIncome)"
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#EF4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorExpenses)"
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBalance)"
              activeDot={{ r: 6 }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: '10px' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceChart;