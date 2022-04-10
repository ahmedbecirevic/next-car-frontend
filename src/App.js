import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./Login";
import Navigation from "./Navigation/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
