import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthRouter() {
  const isLoggedIn = useSelector((state) =>state?.authStore?.isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
