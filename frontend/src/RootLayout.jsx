import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUser, logout } from "./store/slice/authSlice";

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://url-shortner-backend-fytv.onrender.com/api/auth/me",
          {
            withCredentials: true,
          }
        );
        console.log(response.data.user);
        dispatch(setUser(response.data.user)); 
      } catch (err) {
        dispatch(logout()); 
        console.error(
          "Session fetch failed:",
          err.response?.data || err.message
        );
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

export default RootLayout;
