import {
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import theme from "./theme";
import Login from "./Login";
import Navigation from "./Navigation/Navigation";

function Failed() {
  return <div>Fail</div>;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/failed" element={<Failed />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
