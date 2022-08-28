import { useState } from "react";
import PropTypes from "prop-types";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
  Box, IconButton, Menu, MenuItem, TableCell,
} from "@mui/material";

const RenderActions = ({ width, row, actions }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableCell sx={{ width: `${width}px`, borderBottom: "unset" }} size="small">
      {row.action || (
        <>
          <Box sx={{ width: "100%" }}>
            {actions.length > 0 && (
              <IconButton
                data-testid="button-element"
                onClick={handleClick}
                size="small"
                sx={{ ml: "auto", display: "block" }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <MoreVertIcon />
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
              <MenuItem
                key={label}
                onClick={() => action(row)}
                sx={{
                  "&:hover": { backgroundColor: "rgba(85, 101, 128, 0.3)" },
                  "&:not(:last-child)": { borderBottom: "1px solid #979797" },
                }}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </TableCell>
  );
};

RenderActions.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  row: PropTypes.object.isRequired,
  actions: PropTypes.array.isRequired,
};

export default RenderActions;
