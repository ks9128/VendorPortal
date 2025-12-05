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
  User
} from 'lucide-react';

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

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

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 hidden md:flex md:flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <span>VendorPortal</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sidebarItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button 
                variant={isActive(item.path) ? "secondary" : "ghost"} 
                className={`w-full justify-start gap-3 ${isActive(item.path) ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="p-4 border-t">
          <Button variant="outline" className="w-full gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-0 overflow-hidden">
        {/* Top Header for Mobile/Title */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-30">
          <h1 className="text-lg font-semibold capitalize text-slate-800">
            {location.pathname.split('/').pop() || 'Overview'}
          </h1>
          <div className="flex items-center gap-4">
             <Link to="/vendors" className="hidden md:block">
                <Button variant="ghost" size="sm">Browse Vendors</Button>
            </Link>
            <span className="text-sm text-slate-500">Welcome, {user?.name || 'Vendor'}</span>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {user?.name?.[0] || 'V'}
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
