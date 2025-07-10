// src/utils/helper.js
import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const checkAuth = async ({ context }) => {
  const { queryClient, store } = context;
  try {
    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: async () => {
        const res = await getCurrentUser();
        return res.user;
      },
    });
    store.dispatch(login(user));

    return true; 
  } catch (error) {
    console.error("Not authenticated:", error?.response?.data || error.message);
    return redirect({ to: "/auth" }); 
  }
};
