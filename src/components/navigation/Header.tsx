import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  openSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ openSidebar }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              type="button"
              className="md:hidden text-neutral-500 hover:text-neutral-700"
              onClick={openSidebar}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex md:items-center ml-1 text-xl font-medium text-primary-800">
              Your Financial Dashboard
            </div>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-neutral-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Search transactions, budgets..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="text-neutral-500 hover:text-neutral-700 focus:outline-none relative"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-danger-500 rounded-full"></span>
            </motion.button>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer"
            >
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="ml-2 text-sm font-medium text-neutral-700 hidden md:block">
                John Doe
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;