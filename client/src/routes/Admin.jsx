// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useEffect } from 'react';

// import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
// import AdminDashboard from './pages/AdminDashboard';
// import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Overview from './pages/Overview/Overview';
// import Properties from '../pages/Properties_dashboard/Properties';
import Users from './pages/Users/Users';
import Reports from './pages/Reports/Reports';
import Home from './pages/Home/Home';
import Properties from './pages/Properties_dash/Properties';
import AdminDashboard from './AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Bookings from './pages/Bookings/Bookings';

function App() {
  useEffect(() => {
    // Check for saved theme preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes with Sidebar */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="overview" element={<Overview />} />
            <Route path="properties" element={<Properties />} />
            <Route path="users" element={<Users />} />
            <Route path="reports" element={<Reports />} />
           <Route path="bookings" element={<Bookings />} />


          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;