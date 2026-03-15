'use client';

import React, { useState, useEffect } from 'react';
import { 
  AnalyticsMiniWidget, 
  SaleHistoryBar, 
  TopPeopleTable 
} from './components/DashboardComponents';
import { taskProgressSeries, taskExpensesSeries } from '@/lib/mockData';
import { motion } from 'motion/react';
import { ProductHighlight, TaskSchedule } from './components/RightSidebar';
import { Skeleton } from './components/UI';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <Skeleton variant="card" className="flex-1 h-32 rounded-2xl" />
          <Skeleton variant="card" className="flex-1 h-32 rounded-2xl" />
        </div>
        <Skeleton variant="card" className="w-full h-80 rounded-2xl" />
        <Skeleton variant="card" className="w-full h-96 rounded-2xl" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Top Row: Two Cards Only */}
      <div className="flex flex-col sm:flex-row gap-6">
        <AnalyticsMiniWidget
          title="Task Progress"
          value="213.52"
          trend="+12.1%"
          data={taskProgressSeries}
          color="#FF00D6"
          gradientId="taskProgressGradient"
        />
        <AnalyticsMiniWidget
          title="Task Expenses"
          value="$6,045"
          trend="-4.6%"
          data={taskExpensesSeries}
          color="#BC13FE"
          gradientId="taskExpensesGradient"
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
