import {
  MenuItem,
  Select,
  Stack,
  FormControl,
  InputLabel,
  FormHelperText,
  styled,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";

import { getAllCars } from "../../redux/carsSlice";

const StyledTextField = styled(TextField)(() => ({ ".MuiFormHelperText-root": { marginLeft: "0" } }));

const CreateEditListing = ({
  register,
  errors,
  onCarSelectChange,
  selectedCarId,
}) => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsData);

  useEffect(() => {
    (async () => {
      await dispatch(getAllCars());
    })();
  }, []);

  return (
    <FormControl fullWidth>
      <Stack mt={4} mx={2} spacing={2}>
        {selectedCarId
        && (
        <FormControl>
          <InputLabel id="car-select">Car</InputLabel>
          <Select
            {...register("carId")}
            error={!!errors?.carId}
            labelId="car-select"
            label="Car"
            onChange={onCarSelectChange}
            value={selectedCarId}
          >
            {cars && cars?.map((car) => <MenuItem key={car.id} value={car.id}>{car?.description || "No name"}</MenuItem>)}
          </Select>
          <FormHelperText sx={{ ml: 0 }} error={!!errors?.carId}>{errors?.carId?.message}</FormHelperText>
        </FormControl>
        )}
        <StyledTextField
          label="Title"
          {...register("title")}
          error={!!errors?.title}
          helperText={errors?.title?.message}
        />
        <StyledTextField
          label="Location"
          {...register("location")}
          error={!!errors?.location}
          helperText={errors?.location?.message}
        />
        <FormControl>
          <InputLabel id="cond-select">Condition</InputLabel>
          <Select
            labelId="cond-select"
            {...register("condition")}
            defaultValue="NEW"
            error={!!errors?.condition}
            label="Condition"
          >
            <MenuItem value="NEW">NEW</MenuItem>
            <MenuItem value="USED">USED</MenuItem>
          </Select>
        </FormControl>
        <StyledTextField
          label="Price"
          {...register("price")}
          error={!!errors?.price}
          helperText={errors?.price?.message}
          type="number"
        />
      </Stack>
    </FormControl>
  );
};

CreateEditListing.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  selectedCarId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onCarSelectChange: PropTypes.func.isRequired,
};

export default CreateEditListing;
