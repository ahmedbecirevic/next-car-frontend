import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import {
  Box, Stack, AppBar, Toolbar, IconButton,
} from "@mui/material";

import AccountPopover from "./AccountPopover";
import Iconify from "../components/Iconify";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: { width: `calc(100% - ${DRAWER_WIDTH + 1}px)` },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

const DashboardNavbar = ({ onOpenSidebar }) => (
  <RootStyle>
    <ToolbarStyle>
      <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: "text.primary", display: { lg: "none" } }}>
        <Iconify icon="eva:menu-2-fill" />
      </IconButton>

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
        <AccountPopover />
      </Stack>
    </ToolbarStyle>
  </RootStyle>
);

DashboardNavbar.propTypes = { onOpenSidebar: PropTypes.func };

export default DashboardNavbar;
