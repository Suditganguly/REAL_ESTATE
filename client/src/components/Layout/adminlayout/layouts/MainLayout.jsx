import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import './MainLayout.css'; // Add custom styles if needed

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
