import { toast } from "react-toastify";

const useAuthCheck = () => {
  const validateLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in", { position: "bottom-right" });
      return false;
    }
    return true;
  };

  return { validateLogin };
};

export default useAuthCheck;
