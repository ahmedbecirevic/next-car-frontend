import {
  AppBar, Toolbar, Typography, Button, Box,
} from "@mui/material";
import { Link } from "react-router-dom";

import { ROUTES } from "../../config";

const Navigation = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          NextCar
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "right", flexGrow: 1 }}>
          <Link to={ROUTES.PROFILE}>
            <Button color="inherit">Profile</Button>
          </Link>
          {/* <Button color="inherit">Profile</Button> */}
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navigation;
