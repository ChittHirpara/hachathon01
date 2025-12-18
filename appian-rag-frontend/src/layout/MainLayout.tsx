import React from 'react';
import { LayoutDashboard, FileText, Settings } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      {/* 1. The Header */}
      <header className="h-14 bg-slate-900 text-white flex items-center px-6 shadow-md z-10">
        <div className="font-bold text-lg tracking-wide">
          <span className="text-blue-400">Appian</span> Case Manager
        </div>
        <div className="ml-auto text-sm text-slate-400">
          Agent: John Doe | Status: Active
        </div>
      </header>

      {/* 2. The Workspace (Sidebar + Main Content) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Navigation Sidebar (Just for looks) */}
        <nav className="w-16 bg-slate-800 flex flex-col items-center py-4 gap-6 border-r border-slate-700">
          <div className="p-2 bg-blue-600 rounded-lg cursor-pointer">
            <FileText className="text-white w-6 h-6" />
          </div>
          <div className="p-2 text-slate-400 hover:text-white cursor-pointer">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div className="mt-auto p-2 text-slate-400 hover:text-white cursor-pointer">
            <Settings className="w-6 h-6" />
          </div>
        </nav>

        {/* 3. The Actual Content Area (Split Screen will go here) */}
        <main className="flex-1 flex relative overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};