import { AppBar, Toolbar, Typography } from "@mui/material";

function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Nav Bar
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
