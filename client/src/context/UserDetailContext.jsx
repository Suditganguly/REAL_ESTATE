// import { createContext, useContext, useState, useEffect } from "react";

// export const UserDetailContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userDetails, setUserDetails] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");
//     return {
//       user: storedUser ? JSON.parse(storedUser) : null,
//       token: token || null,
//       bookings: [],
//     };
//   });

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const storedUser = localStorage.getItem("user");
//       const token = localStorage.getItem("token");
//       setUserDetails({
//         user: storedUser ? JSON.parse(storedUser) : null,
//         token: token || null,
//         bookings: [],
//       });
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   useEffect(() => {
//     if (userDetails.user && userDetails.token) {
//       localStorage.setItem("user", JSON.stringify(userDetails.user));
//       localStorage.setItem("token", userDetails.token);
//     } else {
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     }
//   }, [userDetails]);

//   return (
//     <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
//       {children}
//     </UserDetailContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserDetailContext);
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Create context with initial undefined value
export const UserDetailContext = createContext(undefined);

// Initial state structure
const initialUserState = {
  user: null,
  token: null,
  bookings: [],
};

export const UserProvider = ({ children }) => {
  // Initialize state with localStorage data
  const [userDetails, setUserDetails] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      return {
        user: storedUser ? JSON.parse(storedUser) : null,
        token: token || null,
        bookings: [],
      };
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialUserState;
    }
  });

  // Handle storage changes across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        setUserDetails({
          user: storedUser ? JSON.parse(storedUser) : null,
          token: token || null,
          bookings: userDetails.bookings, // Preserve existing bookings
        });
      } catch (error) {
        console.error("Error handling storage change:", error);
        toast.error("Error syncing user data");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [userDetails.bookings]);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      if (userDetails.user && userDetails.token) {
        localStorage.setItem("user", JSON.stringify(userDetails.user));
        localStorage.setItem("token", userDetails.token);
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error writing to localStorage:", error);
      toast.error("Error saving user data");
    }
  }, [userDetails.user, userDetails.token]);

  // Update user details with error handling
  const updateUserDetails = (updates) => {
    try {
      setUserDetails((prev) => ({
        ...prev,
        ...updates,
      }));
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Failed to update user information");
    }
  };

  const contextValue = {
    userDetails,
    setUserDetails: updateUserDetails,
    // Helper functions
    logout: () => {
      setUserDetails(initialUserState);
      localStorage.clear();
    },
    updateBookings: (bookings) => {
      updateUserDetails({ bookings });
    },
    isAuthenticated: () => !!userDetails.user && !!userDetails.token,
  };

  return (
    <UserDetailContext.Provider value={contextValue}>
      {children}
    </UserDetailContext.Provider>
  );
};

// Custom hook with error handling
export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

// Export a function to get user outside of React components
export const getUserDetails = () => {
  try {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: token || null,
    };
  } catch (error) {
    console.error("Error getting user details:", error);
    return initialUserState;
  }
};
