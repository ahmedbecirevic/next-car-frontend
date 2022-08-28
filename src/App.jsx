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
import Cars from "./components/Cars";
import { PrivateOutlet, PublicOutlet } from "./components/Outlets";
import { ROUTES } from "./config";
import Home from "./pages/Home";
import SnackBar from "./components/UI/Snackbar";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import ListingDetails from "./components/Listings/ListingDetails";

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
          <Route path="cars" element={<Cars />} />
          <Route path="profile" element={<Profile />} />
          <Route path="listings" element={<Posts />} />
          <Route path="listings/:listingId" element={<ListingDetails />} />
          {/* <Route path="dar" element={<Cars />} /> */}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
};
export default App;
