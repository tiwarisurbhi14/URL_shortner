import { Outlet } from '@tanstack/react-router'
import Navbar from './components/Navbar'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, logout } from "./store/slice/authSlice";
import { getCurrentUser } from "./api/user.api";


const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser(); 
        dispatch(setUser(response.user)); 
      } catch (error) {
        dispatch(logout());
        console.error("User not authenticated:", error);
      }
    };

    fetchUser();
  }, []);
  return (

    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default RootLayout