import {
  Routes,
  Route,
  Navigate,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useEffect } from "react";

import theme from "./theme";
import Login from "./components/Login";
import Cars from "./components/Cars";
import { PrivateOutlet, PublicOutlet } from "./components/Outlets";
import { ROUTES } from "./config";
import Home from "./pages/home";
import SnackBar from "./components/UI/Snackbar";
import Profile from "./pages/profile";

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackBar />
      <Routes>
        <Route element={<PublicOutlet />}>
          <Route path={ROUTES.SIGN_IN} element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          {/* <Route path="cars" element={<Navigate to="cars" />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="cars" element={<Cars />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="dar" element={<Cars />} /> */}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
};
export default App;
