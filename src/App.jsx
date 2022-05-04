import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import theme from "./theme";
import Login from "./components/Login";
import Cars from "./components/Cars";
import { PrivateOutlet, PublicOutlet } from "./components/Outlets";
import { ROUTES } from "./config";
import { userLoggedIn } from "./redux/authSlice";
import { checkIfLoggedIn } from "./helpers";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLoggedIn(checkIfLoggedIn()));
    console.log("Render");
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<PublicOutlet />}>
          <Route path={ROUTES.SIGN_IN} element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/" element={<Navigate to="cars" />} />
          <Route path="cars" element={<Cars />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
