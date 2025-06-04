import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Receipt, 
  PiggyBank, 
  Target, 
  LineChart, 
  Settings, 
  HelpCircle,
  X
} from 'lucide-react';

interface SidebarProps {
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/transactions', icon: <Receipt size={20} />, label: 'Transactions' },
    { to: '/budgets', icon: <PiggyBank size={20} />, label: 'Budgets' },
    { to: '/goals', icon: <Target size={20} />, label: 'Goals' },
    { to: '/insights', icon: <LineChart size={20} />, label: 'Insights' },
  ];

  const bottomNavItems = [
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
    { to: '/help', icon: <HelpCircle size={20} />, label: 'Help' },
  ];

  return (
    <div className="flex flex-col h-full bg-primary-800 text-white">
      <div className="flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center">
          <span className="text-xl font-bold">FinanceAI</span>
        </div>
        <button className="md:hidden" onClick={closeSidebar}>
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-6 px-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary-700 text-white' 
                        : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                    }`
                  }
                  end={item.to === '/'}
                  onClick={() => closeSidebar()}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="p-4 border-t border-primary-700">
        <ul className="space-y-1">
          {bottomNavItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary-700 text-white' 
                      : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                  }`
                }
                onClick={() => closeSidebar()}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;