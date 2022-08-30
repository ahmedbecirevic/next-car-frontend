import { useState } from "react";
import PropTypes from "prop-types";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
  Box, IconButton, Menu, MenuItem,
} from "@mui/material";

const CustomMenu = ({ icon, actions }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        {!!actions.length && (
          <IconButton
            data-testid="button-element"
            onClick={handleClick}
            size="small"
            sx={{ ml: "auto", display: "inline-flex", alignItems: "center" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {icon || <MoreVertIcon />}
          </IconButton>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {actions.map(({ label, action }) => (
          <MenuItem key={label} onClick={action}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

CustomMenu.propTypes = {
  icon: PropTypes.element,
  actions: PropTypes.array.isRequired,
};

CustomMenu.defaultProps = { icon: null };

export default CustomMenu;
