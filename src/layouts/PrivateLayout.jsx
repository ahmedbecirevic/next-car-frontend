import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

import Navigation from "../components/Navigation";

const PrivateLayout = () => (
  <>
    <Navigation />
    <Box sx={{ display: "flex", backgroundColor: "gray.light" }}>
      <Outlet />
    </Box>
  </>
);

export default PrivateLayout;
