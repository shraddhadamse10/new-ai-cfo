import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard } from 'lucide-react';

const FinancialSummary: React.FC = () => {
  const summaryCards = [
    {
      title: 'Total Balance',
      value: '$24,563.65',
      change: '+2.5%',
      isPositive: true,
      icon: <DollarSign size={20} className="text-primary-600" />,
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-100'
    },
    {
      title: 'Monthly Income',
      value: '$8,350.00',
      change: '+5.1%',
      isPositive: true,
      icon: <ArrowUpRight size={20} className="text-success-600" />,
      bgColor: 'bg-success-50',
      borderColor: 'border-success-100'
    },
    {
      title: 'Monthly Expenses',
      value: '$4,865.12',
      change: '-3.2%',
      isPositive: true,
      icon: <ArrowDownRight size={20} className="text-danger-600" />,
      bgColor: 'bg-danger-50',
      borderColor: 'border-danger-100'
    },
    {
      title: 'Savings Rate',
      value: '41.7%',
      change: '+1.8%',
      isPositive: true,
      icon: <CreditCard size={20} className="text-warning-600" />,
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-neutral-800 mb-5">Financial Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className={`${card.bgColor} ${card.borderColor} border rounded-lg p-4`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-neutral-500 text-sm">{card.title}</span>
              <span className="p-2 rounded-full bg-white">{card.icon}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-neutral-800">{card.value}</span>
              <div className="flex items-center mt-1">
                <span className={`text-xs font-medium ${card.isPositive ? 'text-success-600' : 'text-danger-600'}`}>
                  {card.change} {card.title === 'Monthly Expenses' ? 'less spent' : 'from last month'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FinancialSummary;