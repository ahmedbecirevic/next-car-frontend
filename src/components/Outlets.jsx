import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "../config";
import PrivateLayout from "../layouts/PrivateLayout";

export const PublicOutlet = () => {
  const { loggedUser } = useSelector(({ auth }) => auth);

  return !loggedUser ? <Outlet /> : <Navigate to="/" />;
};

export const PrivateOutlet = () => {
  const { loggedUser } = useSelector(({ auth }) => auth);
  if (loggedUser) {
    return <PrivateLayout />;
  }

  return <Navigate to={ROUTES.SIGN_IN} />;
};
