// import { useSelector } from "react-redux";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

import { ROUTES } from "../config";
import PrivateLayout from "../layouts/PrivateLayout";

export const PublicOutlet = () => <Outlet />;

export const PrivateOutlet = () => {
  const [searchParams] = useSearchParams();
  if (searchParams.get("token")) {
    localStorage.setItem("token", searchParams.get("token"));
  }

  if (localStorage.getItem("token")) {
    return <PrivateLayout />;
  }

  return <Navigate to={ROUTES.SIGN_IN} />;
};
