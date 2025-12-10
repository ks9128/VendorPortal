import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Package,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  Search
} from 'lucide-react';

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Logout error", e);
    }
    window.location.href = '/';
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Package, label: 'Products', path: '/dashboard/products' },
    { icon: MessageSquare, label: 'Reviews', path: '/dashboard/reviews' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
  ];

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center border-b px-6 justify-between md:justify-start">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <span>VendorPortal</span>
        </Link>
        {/* Close button for mobile */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {sidebarItems.map((item) => (
          <Link key={item.path} to={item.path} onClick={() => setIsSidebarOpen(false)}>
            <Button
              variant={isActive(item.path) ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${isActive(item.path) ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}

        {/* Mobile only Browse Vendors link */}
        <Link to="/vendors" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-slate-900">
            <Search className="h-4 w-4" />
            Browse Vendors
          </Button>
        </Link>
      </div>

      <div className="p-4 border-t">
        <Button variant="outline" className="w-full gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 hidden md:flex md:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl" onClick={e => e.stopPropagation()}>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-0 overflow-hidden">
        {/* Top Header for Mobile/Title */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold capitalize text-slate-800">
              {location.pathname.split('/').pop() || 'Overview'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/vendors" className="hidden md:block">
              <Button variant="ghost" size="sm">Browse Vendors</Button>
            </Link>
            <span className="text-sm text-slate-500 hidden sm:inline-block">Welcome, {user?.vendorName || user?.ownerName || 'Vendor'}</span>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {user?.vendorName?.[0] || 'V'}
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
