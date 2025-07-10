import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUser, logout } from "./store/slice/authSlice";

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://url-shortner-backend-fytv.onrender.com/api/auth/me", {
          withCredentials: true, 
        });
        dispatch(setUser(res.data.user));
      } catch (err) {
        dispatch(logout());
        console.error("Failed to fetch session:", err.message);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
