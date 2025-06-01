import { Suspense } from "react";
import "./App.css";
import Layout from "../components/Layout/Layout";

import Website from "../pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Properties from "../pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "../pages/Property/Property";
import { UserProvider } from "../context/UserDetailContext";
import Bookings from "../pages/Bookings/Bookings";
import Favourites from "../pages/Favourites/Favourites";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import UserSettings from "../components/UserSettings";

function App() {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/settings" element={<UserSettings />} />
              </Route>
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
