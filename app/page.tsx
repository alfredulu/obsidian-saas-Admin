import React from 'react';
import { 
  StatCard, 
  SaleHistory, 
  TopPeopleTable, 
  ProductHighlight, 
  TaskSchedule 
} from './components/DashboardComponents';
import { 
  taskProgressData, 
  taskExpensesData 
} from '@/lib/mockData';

export default function Dashboard() {
  return (
    <div className="flex gap-8">
      {/* Left Content */}
      <div className="flex-[2.5] space-y-8">
        {/* Top Row Stats */}
        <div className="flex gap-6">
          <StatCard 
            title="Task Progress" 
            value="120" 
            total="236" 
            percentage="-2.5" 
            isPositive={false} 
            data={taskProgressData} 
            color="#FF00D6" 
          />
          <StatCard 
            title="Task Expenses" 
            value="$6,045" 
            total="" 
            percentage="25" 
            isPositive={true} 
            data={taskExpensesData} 
            color="#00FFD1" 
          />
        </div>

        {/* Charts & Tables */}
        <SaleHistory />
        <TopPeopleTable />
      </div>

      {/* Right Content */}
      <div className="flex-1 space-y-6">
        <ProductHighlight />
        <TaskSchedule />
      </div>
    </div>
  );
}
