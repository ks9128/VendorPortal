import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import Landing from './pages/Public/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import DashboardLayout from './components/Layout/DashboardLayout';
import Dashboard from './pages/Vendor/Dashboard';
import Products from './pages/Vendor/Products';
import AddProduct from './pages/Vendor/AddProduct';
import EditProduct from './pages/Vendor/EditProduct';
import Profile from './pages/Vendor/Profile';
import Reviews from './pages/Vendor/Reviews';
import Vendors from './pages/Public/Vendors';
import VendorProfile from './pages/Public/VendorProfile';
import Feedback from './pages/Public/Feedback';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Landing />} />
            <Route path="auth/login" element={<Login />} />
            <Route path="auth/register" element={<Register />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="vendors/:vendorId" element={<VendorProfile />} />
            <Route path="vendors/:vendorId/feedback" element={<Feedback />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:productId" element={<EditProduct />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
