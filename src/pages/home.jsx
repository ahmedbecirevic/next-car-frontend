import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { ROUTES } from "../config";

const Home = () => (
  <Box sx={{
    width: "40vw", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
  }}
  >
    <Typography variant="h2">home</Typography>
    <Link to={ROUTES.CARS}>Cars</Link>
  </Box>
);

export default Home;
