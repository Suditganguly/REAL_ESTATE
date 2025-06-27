import { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "../context/UserDetailContext";
import Home from "../pages/Home";
import Properties from "../pages/Properties/Properties";
import Property from "../pages/Property/Property";
import Bookings from "../pages/Bookings/Bookings";
import Favourites from "../pages/Favourites/Favourites";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import UserSettings from "../components/UserSettings";
import PropertyDuplicate from "../pages/Duplicate/PropertyDuplicate";
import AdminLogin from "../pages/Admin/pages/Login/Login";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import PropertyPage from "../components/viewProperty/PropertyPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:propertyId" element={<Property />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/settings" element={<UserSettings />} />
              <Route path="/Property-Duplicate" element={<PropertyDuplicate />} />
              <Route path="/admin-portal/login" element={<AdminLogin />} />
              <Route path="/admin-portal/dashboard" element={<AdminDashboard />} />
              <Route path="/view-property" element={<PropertyPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
