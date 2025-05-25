import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import useFavourites from "../../hooks/useFavourites";
import useBookings from "../../hooks/useBookings";

const Layout = () => {
  useFavourites();
  useBookings();

  const { isAuthenticated, user: auth0User, getAccessTokenWithPopup } = useAuth0(); // ✅ renamed
  const { user, setUser } = useUser(); // ✅ from context

  const { mutate } = useMutation({
    mutationKey: [auth0User?.email],
    mutationFn: (token) => createUser(auth0User?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: `${import.meta.env.VITE_SERVER_ROUTE}`,
          scope: "openid profile email",
        },
      });

      localStorage.setItem("access_token", res);
      setUser((prev) => ({ ...prev, token: res })); // ✅ fixed setUser
      mutate(res);
    };

    if (isAuthenticated) {
      getTokenAndRegister();
    }
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
