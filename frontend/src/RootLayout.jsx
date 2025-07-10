import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUser, logout } from "./store/slice/authSlice";

const RootLayout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://url-shortner-backend-fytv.onrender.com/api/auth/me",
          {
            withCredentials: true,
          }
        );
        dispatch(setUser(response.data.user));
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
