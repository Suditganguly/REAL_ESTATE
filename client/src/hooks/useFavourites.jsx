import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../context/UserDetailContext.jsx";   // ← use the hook

const useFavourites = () => {
  // global user state from your context
  const { user, setUser } = useUser();                        // ← no useContext here
  const queryRef = useRef();
  const { user: auth0User } = useAuth0();                     // renamed to avoid clash

  // If you store token inside the user object:
  const token = user?.token;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allFavourites", auth0User?.email],
    queryFn: () => getAllFav(auth0User?.email, token),
    enabled: !!auth0User && !!token,                          // run only when ready
    staleTime: 30_000,
    onSuccess: (favs) =>
      // put favourites array back into global user state
      setUser((prev) => ({ ...prev, favourites: favs })),
  });

  // keep latest refetch in a ref so we can trigger when token changes
  queryRef.current = refetch;

  // whenever token changes, refetch favourites
  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [token]);

  return { data, isLoading, isError, refetch };
};

export default useFavourites;
