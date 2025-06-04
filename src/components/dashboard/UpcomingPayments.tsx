import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Home, Car, Tv, Zap } from 'lucide-react';

interface Payment {
  id: number;
  name: string;
  amount: number;
  date: string;
  icon: React.ReactNode;
  status: 'upcoming' | 'due' | 'overdue';
}

const payments: Payment[] = [
  { 
    id: 1, 
    name: 'Mortgage', 
    amount: 1200, 
    date: 'July 1, 2025', 
    icon: <Home size={16} className="text-primary-600" />,
    status: 'upcoming'
  },
  { 
    id: 2, 
    name: 'Car Loan', 
    amount: 350, 
    date: 'July 5, 2025', 
    icon: <Car size={16} className="text-warning-600" />,
    status: 'upcoming'
  },
  { 
    id: 3, 
    name: 'Netflix', 
    amount: 14.99, 
    date: 'June 28, 2025', 
    icon: <Tv size={16} className="text-danger-600" />,
    status: 'due'
  },
  { 
    id: 4, 
    name: 'Electric Bill', 
    amount: 95.50, 
    date: 'July 15, 2025', 
    icon: <Zap size={16} className="text-success-600" />,
    status: 'upcoming'
  },
];

const statusStyles = {
  upcoming: 'text-neutral-500 bg-neutral-100',
  due: 'text-warning-600 bg-warning-50',
  overdue: 'text-danger-600 bg-danger-50',
};

const UpcomingPayments: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-neutral-800">Upcoming Payments</h2>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition flex items-center">
          <Calendar size={16} className="mr-1" />
          View All
        </button>
      </div>
      
      <ul className="space-y-3">
        {payments.map((payment, index) => (
          <motion.li 
            key={payment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center p-3 hover:bg-neutral-50 rounded-lg transition cursor-pointer"
          >
            <div className="mr-3 p-2 bg-white rounded-full shadow-sm border border-neutral-100">
              {payment.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium text-neutral-800">{payment.name}</p>
              <p className="text-xs text-neutral-500">{payment.date}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-semibold">${payment.amount.toFixed(2)}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full mt-1 ${statusStyles[payment.status]}`}>
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
      
      <motion.div 
        className="mt-5 pt-4 border-t border-neutral-100 flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span className="text-sm font-medium text-neutral-500">Total Upcoming</span>
        <span className="text-lg font-semibold text-neutral-800">$1,660.49</span>
      </motion.div>
    </div>
  );
};

export default UpcomingPayments;