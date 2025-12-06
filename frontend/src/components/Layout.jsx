import React from 'react';
import { LayoutDashboard, Bell, User } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                            <LayoutDashboard className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-none">TruEstate</h1>
                            <p className="text-xs text-gray-500 font-medium">Sales Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-200 mx-1"></div>
                        <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-medium text-sm shadow-sm">
                                AD
                            </div>
                            <div className="hidden sm:block text-sm">
                                <p className="font-medium text-gray-700">Aditya</p>
                                <p className="text-xs text-gray-500">Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {children}
            </main>
        </div>
    );
};

export default Layout;
