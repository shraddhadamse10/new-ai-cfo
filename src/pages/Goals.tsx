import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Target, DollarSign, Home, Car, Plane, GraduationCap } from 'lucide-react';

interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  date: string;
  icon: React.ReactNode;
  color: string;
}

const goals: Goal[] = [
  {
    id: 1,
    name: 'Emergency Fund',
    target: 10000,
    current: 6500,
    date: 'Jan 2026',
    icon: <DollarSign size={20} />,
    color: 'bg-primary-600',
  },
  {
    id: 2,
    name: 'Home Down Payment',
    target: 60000,
    current: 15000,
    date: 'Dec 2027',
    icon: <Home size={20} />,
    color: 'bg-success-600',
  },
  {
    id: 3,
    name: 'New Car',
    target: 25000,
    current: 5000,
    date: 'Sep 2026',
    icon: <Car size={20} />,
    color: 'bg-warning-600',
  },
  {
    id: 4,
    name: 'Vacation',
    target: 4000,
    current: 1200,
    date: 'Jul 2025',
    icon: <Plane size={20} />,
    color: 'bg-danger-600',
  },
];

const Goals: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Financial Goals</h1>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center transition">
          <Plus size={16} className="mr-1" />
          <span>Add New Goal</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {goals.map((goal, index) => {
          const percentComplete = (goal.current / goal.target) * 100;
          
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className={`h-2 ${goal.color}`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${goal.color.replace('bg-', 'bg-') + '/20'} text-${goal.color.split('-')[1]}-600 mr-3`}>
                      {goal.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-800">{goal.name}</h3>
                      <p className="text-xs text-neutral-500">Target: {goal.date}</p>
                    </div>
                  </div>
                  <div className="bg-neutral-100 px-2 py-1 rounded text-xs font-medium text-neutral-600">
                    {Math.round(percentComplete)}%
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-500">Current</span>
                    <span className="text-neutral-800 font-medium">${goal.current.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-500">Target</span>
                    <span className="text-neutral-800 font-medium">${goal.target.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-500">Remaining</span>
                    <span className="text-neutral-800 font-medium">${(goal.target - goal.current).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    className={`h-full ${goal.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentComplete}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  ></motion.div>
                </div>
                
                <div className="flex space-x-2">
                  <button className={`flex-1 px-3 py-2 ${goal.color} text-white rounded-lg text-sm font-medium transition hover:opacity-90`}>
                    Add Funds
                  </button>
                  <button className="flex-1 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-sm font-medium transition">
                    Adjust Goal
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: goals.length * 0.1 }}
          className="bg-white rounded-xl border-2 border-dashed border-neutral-300 flex items-center justify-center p-10 hover:border-primary-400 transition cursor-pointer"
        >
          <div className="flex flex-col items-center text-neutral-500 hover:text-primary-600 transition">
            <Target size={24} className="mb-2" />
            <span className="font-medium">Create New Goal</span>
            <p className="text-xs text-neutral-400 mt-1 text-center">
              Set up a new financial goal to track your progress
            </p>
          </div>
        </motion.div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-neutral-800 mb-6">AI Goal Recommendations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-primary-100 bg-primary-50 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
            <div className="flex items-start">
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <GraduationCap size={20} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-primary-800 mb-1">Education Fund</h3>
                <p className="text-sm text-neutral-600">
                  Save for future education expenses or professional development. We recommend a target of 
                  $15,000 over 3 years.
                </p>
                <div className="mt-2 text-xs text-primary-700 font-medium">
                  Recommended monthly contribution: $416
                </div>
              </div>
            </div>
          </div>
          
          <div className="border border-success-100 bg-success-50 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
            <div className="flex items-start">
              <div className="p-3 bg-success-100 rounded-full mr-4">
                <DollarSign size={20} className="text-success-600" />
              </div>
              <div>
                <h3 className="font-medium text-success-800 mb-1">Retirement Boost</h3>
                <p className="text-sm text-neutral-600">
                  Increase your retirement contributions to maximize tax benefits and long-term growth.
                </p>
                <div className="mt-2 text-xs text-success-700 font-medium">
                  Recommended additional contribution: $350/month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;