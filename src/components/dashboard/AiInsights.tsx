import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, TrendingUp, DollarSign, PiggyBank } from 'lucide-react';

interface Insight {
  id: number;
  title: string;
  description: string;
  type: 'suggestion' | 'alert' | 'opportunity';
  icon: React.ReactNode;
}

const insights: Insight[] = [
  {
    id: 1,
    title: 'Unusual Spending',
    description: 'Your entertainment spending is 33% higher than your monthly average.',
    type: 'alert',
    icon: <AlertTriangle size={20} className="text-warning-500" />,
  },
  {
    id: 2,
    title: 'Subscription Opportunity',
    description: 'You could save $24/month by switching to annual Netflix plan.',
    type: 'opportunity',
    icon: <DollarSign size={20} className="text-success-500" />,
  },
  {
    id: 3,
    title: 'Savings Goal',
    description: 'Increase your savings by $200/month to reach your home down payment goal on time.',
    type: 'suggestion',
    icon: <PiggyBank size={20} className="text-primary-500" />,
  },
  {
    id: 4,
    title: 'Investment Opportunity',
    description: 'You have $5,200 excess cash that could be earning more in a high-yield account.',
    type: 'opportunity',
    icon: <TrendingUp size={20} className="text-success-500" />,
  },
];

const AiInsights: React.FC = () => {
  const [currentInsight, setCurrentInsight] = useState(0);

  const nextInsight = () => {
    setCurrentInsight((prev) => (prev + 1) % insights.length);
  };

  const prevInsight = () => {
    setCurrentInsight((prev) => (prev - 1 + insights.length) % insights.length);
  };

  const insight = insights[currentInsight];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <Sparkles size={20} className="text-primary-600 mr-2" />
          <h2 className="text-xl font-semibold text-neutral-800">AI Insights</h2>
        </div>
      </div>
      
      <motion.div
        key={insight.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col h-full justify-between"
      >
        <div>
          <div className="flex items-center mb-2">
            {insight.icon}
            <h3 className="font-medium text-neutral-800 ml-2">{insight.title}</h3>
          </div>
          <p className="text-neutral-600 text-sm">{insight.description}</p>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-1">
            {insights.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentInsight ? 'bg-primary-500' : 'bg-neutral-200'
                }`}
              ></div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={prevInsight}
              className="p-1 rounded-full hover:bg-neutral-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-500"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={nextInsight}
              className="p-1 rounded-full hover:bg-neutral-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-500"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-primary-50 hover:bg-primary-100 text-primary-700 py-2 rounded-lg text-sm font-medium transition">
          View Details
        </button>
      </motion.div>
    </div>
  );
};

export default AiInsights;