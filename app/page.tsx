'use client';

import React from 'react';
import { 
  SparklineCard, 
  SaleHistoryBar, 
  TopPeopleTable 
} from './components/DashboardComponents';
import { taskProgressData, taskExpensesData } from '@/lib/mockData';
import { motion } from 'motion/react';
import { ProductHighlight, TaskSchedule } from './components/RightSidebar';

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Top Row: Two Cards Only */}
      <div className="flex flex-col sm:flex-row gap-6">
        <SparklineCard 
          label="Task Progress" 
          value="213.52" 
          data={taskProgressData} 
          color="#FF00D6" 
        />
        <SparklineCard 
          label="Task Expenses" 
          value="$6,045" 
          data={taskExpensesData} 
          color="#BC13FE" 
        />
      </div>

      {/* Middle Row: Sale History Bar Chart */}
      <SaleHistoryBar />

      {/* Bottom Row: Top People Table */}
      <TopPeopleTable />

      {/* Mobile-only components from RightSidebar */}
      <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductHighlight />
        <TaskSchedule />
      </div>
    </motion.div>
  );
}
