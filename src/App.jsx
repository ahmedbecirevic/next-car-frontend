import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import theme from "./theme";
import Login from "./components/Login";
// import Navigation from "./components/Navigation/Navigation";
import { PrivateOutlet, PublicOutlet } from "./components/Outlets";
import { ROUTES } from "./config";

// const Success = () => <div>Logged in</div>;

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes>
      <Route element={<PublicOutlet />}>
        <Route path={ROUTES.SIGN_IN} element={<Login />} />
      </Route>
      <Route path="/" element={<PrivateOutlet />}>
        <Route index element={<p>Not logged in</p>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </ThemeProvider>
);

export default App;
