import {
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import theme from "./theme";
import Login from "./Login";
import Navigation from "./Navigation/Navigation";

const Success = () => <div>Logged in</div>;

const App = () => (
  <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/" element={<Navigation />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/success" element={<Success />} />
    </Routes>
  </ThemeProvider>
);

export default App;
