import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import LogOut from "../components/Login/LogOut";
import { ROUTES } from "../config";

const Home = () => (
  <Box sx={{
    width: "40vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
  }}
  >
    <div>home</div>
    <Link to={ROUTES.CARS}>Cars</Link>
    <LogOut />
  </Box>
);

export default Home;
