import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

import { useUser } from "../context/UserDetailContext"; // ✅ import only useUser

const useBookings = () => {
  const { user, setUser } = useUser(); // ✅ get global state from custom hook
  const queryRef = useRef();
  const { user: auth0User } = useAuth0();

  const token = user?.token;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allBookings", auth0User?.email],
    queryFn: () => getAllBookings(auth0User?.email, token),
    onSuccess: (bookings) =>
      setUser((prev) => ({ ...prev, bookings })), // ✅ update global user object
    enabled: !!auth0User && !!token,
    staleTime: 30000,
  });

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [token]);

  return { data, isError, isLoading, refetch };
};

export default useBookings;
