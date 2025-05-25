import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: token || null,
      bookings: [],
    };
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      setUserDetails({
        user: storedUser ? JSON.parse(storedUser) : null,
        token: token || null,
        bookings: [],
      });
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (userDetails.user && userDetails.token) {
      localStorage.setItem("user", JSON.stringify(userDetails.user));
      localStorage.setItem("token", userDetails.token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [userDetails]);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
