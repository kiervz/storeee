'use client';

import React, { useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';

interface DashboardLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='bg-[#FCFCFC]'>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className='mx-auto p-2 py-4 md:p-6 2xl:p-10 max-w-[1320px]'>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
