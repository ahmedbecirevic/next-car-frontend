import {
  Routes,
  Route,
  Navigate,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { useEffect } from "react";

import ThemeProvider from "./theme/index";
import Login from "./pages/Login";
import Cars from "./features/Cars";
import { PrivateOutlet, PublicOutlet } from "./components/Outlets";
import { ROUTES } from "./config";
import Home from "./pages/Home";
import SnackBar from "./components/UI/Snackbar";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import ListingDetails from "./features/Listings/ListingDetails";
import PurchaseHistory from "./pages/PurchaseHistory";

const App = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.has("token")) {
      searchParams.delete("token");
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider>
      <CssBaseline />
      <SnackBar />
      <Routes>
        <Route element={<PublicOutlet />}>
          <Route path={ROUTES.SIGN_IN} element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/" element={<Home />} />
          <Route path={ROUTES.CARS} element={<Cars />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.LISTINGS} element={<Posts />} />
          <Route path="listings/:listingId" element={<ListingDetails />} />
          <Route path={ROUTES.PURCHASE_HISTORY} element={<PurchaseHistory />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
};
export default App;
