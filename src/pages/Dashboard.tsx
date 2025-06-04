import React from 'react';
import { motion } from 'framer-motion';
import FinancialSummary from '../components/dashboard/FinancialSummary';
import BalanceChart from '../components/dashboard/BalanceChart';
import SpendingCategories from '../components/dashboard/SpendingCategories';
import BudgetOverview from '../components/dashboard/BudgetOverview';
import UpcomingPayments from '../components/dashboard/UpcomingPayments';
import AiInsights from '../components/dashboard/AiInsights';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <motion.div 
          className="md:w-3/4"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.1 }}
        >
          <FinancialSummary />
        </motion.div>
        <motion.div 
          className="md:w-1/4"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.2 }}
        >
          <AiInsights />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.3 }}
        >
          <BalanceChart />
        </motion.div>
        <motion.div
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.4 }}
        >
          <SpendingCategories />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.5 }}
        >
          <BudgetOverview />
        </motion.div>
        <motion.div
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.6 }}
        >
          <UpcomingPayments />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;