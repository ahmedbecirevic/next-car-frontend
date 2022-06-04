import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import {
  Box, Card, Link, Typography, Stack,
} from "@mui/material";

import Label from "../Label";

const CarCard = ({ car }) => {
  const {
    description, vin, fuelType, mileage, horsePower, productionYear,
  } = car;

  return (
    <Card>
      <Box sx={{ pt: "10%", position: "relative" }}>
        <Label
          variant="filled"
          color="info"
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: "absolute",
            textTransform: "uppercase",
          }}
        >
          {fuelType}
        </Label>
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="/" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {description}
          </Typography>
        </Link>
        <Stack direction="column" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="body2">
            {vin}
          </Typography>
          <Typography variant="body2">
            {mileage}
          </Typography>
          <Typography variant="body2">
            {horsePower}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

CarCard.propTypes = { car: PropTypes.object };

export default CarCard;
