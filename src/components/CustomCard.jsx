import React from "react";
import PropTypes from "prop-types";
import {
  Box, Paper, Typography, useTheme,
} from "@mui/material";

import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";
import CustomMenu from "./CustomMenu";

const CustomCard = ({
  title, details, actions, additionalStyling, children,
}) => {
  const theme = useTheme();

  return (
    <Paper
      padding={4}
      component={Box}
      elevation={2}
      m={0.5}
      sx={{
        minWidth: "45vw",
        width: "fit-content",
        // height: "fit-content",
        borderRadius: 2,
        ...additionalStyling,
      }}
    >
      {title && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: 600,
              color: theme.palette.text.primary,
              display: "inline-flex",
              marginRight: theme.spacing(1),
            }}
          >
            {title}
          </Typography>
          {actions?.length && <CustomMenu icon={<SettingsIcon />} actions={actions} />}
        </Box>
      )}
      <Box
        component="div"
        sx={{ ".MuiBox-root:not(:last-child)": { marginBottom: "24px" } }}
      >
        {details?.map(
          ({ property, value }) => value && (
          <Box component="div" key={property}>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 600,
                color: theme.palette.text.gray,
                textTransform: "uppercase",
              }}
            >
              {property}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: theme.palette.text.primary,
                wordBreak: "break-word",
              }}
            >
              {value}
            </Typography>
          </Box>
          ),
        )}
        {children}
      </Box>
    </Paper>
  );
};

CustomCard.propTypes = {
  title: PropTypes.string,
  details: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(PropTypes.object),
  additionalStyling: PropTypes.object,
  children: PropTypes.node.isRequired,
};

CustomCard.defaultProps = {
  title: "",
  actions: [],
  additionalStyling: {},
};

export default CustomCard;
