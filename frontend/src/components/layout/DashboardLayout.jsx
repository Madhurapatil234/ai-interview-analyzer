import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlayCircle, 
  Clock, 
  TrendingUp, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/interview/setup', label: 'Start Interview', icon: PlayCircle },
  { path: '/history', label: 'Interview History', icon: Clock },
  { path: '/performance', label: 'Performance', icon: TrendingUp },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const getPageTitle = (pathname) => {
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname.includes('/interview/setup')) return 'Start Interview';
  if (pathname.includes('/interview')) return 'Interview';
  if (pathname.includes('/results')) return 'Interview Results';
  if (pathname === '/history') return 'Interview History';
  if (pathname === '/performance') return 'Performance Analytics';
  if (pathname === '/profile') return 'My Profile';
  if (pathname === '/settings') return 'Settings';
  return 'Dashboard';
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pageTitle = getPageTitle(location.pathname);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-800 text-white transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-slate-900">
          <span className="text-lg font-bold">AI Interviewer</span>
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100vh-4rem)] justify-between overflow-y-auto">
          <nav className="px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
        {/* Top Header */}
        <header className="flex flex-shrink-0 items-center justify-between h-16 px-4 bg-white border-b border-gray-200 sm:px-6 lg:px-8 shadow-sm">
          <div className="flex items-center">
            <button
              className="p-2 mr-4 text-gray-500 rounded-md lg:hidden hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.role || 'Guest'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                {user?.avatar ? (
                  <img src={user?.avatar} alt={user?.name || 'User'} className="w-full h-full object-cover" />
                ) : (
                  <span>{user?.name?.charAt(0) || 'U'}</span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
