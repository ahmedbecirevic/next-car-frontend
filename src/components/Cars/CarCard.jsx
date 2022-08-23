import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import {
  Box, Card, Link, Typography, Stack,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import Label from "../Label";

const CarCard = ({
  car, setIsEdit, setIsOpen, setCarToEdit,
}) => {
  const {
    description, vin, fuelType, mileage, horsePower, productionYear,
  } = car;

  return (
    <Card>
      <Box sx={{ pt: "10%", position: "relative" }}>
        <Label
          variant="filled"
          color="default"
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
        <Stack direction="column" alignItems="center" justifyContent="space-between">
          <Typography variant="body2">
            <b>VIN:</b>
            {" "}
            {vin}
          </Typography>
          <Typography variant="body2">
            <b>Mileage:</b>
            {" "}
            {mileage}
          </Typography>
          <Typography variant="body2">
            <b>HP:</b>
            {" "}
            {horsePower}
          </Typography>
          <Typography variant="body2">
            <b>Year:</b>
            {" "}
            {productionYear}
          </Typography>
        </Stack>
        <Box display="flex" justifyContent="space-between">
          <Link to="/" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="subtitle2" noWrap>
              {description}
            </Typography>
          </Link>
          <ModeEditIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setCarToEdit(car);
              setIsEdit(true);
              setIsOpen(true);
            }}
          />
        </Box>
      </Stack>
    </Card>
  );
};

CarCard.propTypes = {
  car: PropTypes.object,
  setIsEdit: PropTypes.func,
  setIsOpen: PropTypes.func,
  setCarToEdit: PropTypes.func,
};

export default CarCard;
