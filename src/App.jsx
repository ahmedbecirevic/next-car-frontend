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
      <Routes>
        <Route element={<PublicOutlet />}>
          <Route path={ROUTES.SIGN_IN} element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          {/* <Route path="cars" element={<Navigate to="cars" />} /> */}
          <Route path="/" element={<div>Home</div>} />
          <Route path="cars" element={<Cars />} />
          {/* <Route path="dar" element={<Cars />} /> */}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
};
export default App;
