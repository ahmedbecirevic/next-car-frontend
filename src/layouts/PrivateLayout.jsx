import Box from "@mui/material/Box";

import Navigation from "../components/Navigation/Navigation";

const PrivateLayout = () => (
  <>
    <Navigation />
    <Box sx={{ display: "flex", backgroundColor: "gray.light", height: "100vh" }}>
      Private layout
    </Box>
  </>
);

export default PrivateLayout;
