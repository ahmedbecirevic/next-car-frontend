import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, styled, TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { isFulfilled } from "@reduxjs/toolkit";

import { REGEX } from "../../constants";
import { createCar } from "../../api/services/carService";
import { createNewCar } from "../../redux/carsSlice";
import { setErrorMessage, setSuccessMessage } from "../../redux/snackbarSlice";

const StyledTextField = styled(TextField)(() => ({ ".MuiFormHelperText-root": { marginLeft: "0" } }));

// eslint-disable-next-line react/prop-types
const AddCarModal = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const carValidationSchema = Yup.object().shape({
    vin: Yup.string().required().matches(REGEX.VIN, { message: "Must be a valid VIN", excludeEmptyString: true }),
    fuelType: Yup.string().required(),
    mileage: Yup.number()
      .required(),
    productionYear: Yup.number().required(),
    description: Yup.string().required(),
    horsePower: Yup.number().required(),
    engineDisplacement: Yup.number().required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(carValidationSchema),
    mode: "onChange",
  });

  const resetForm = () => {
    reset({
      vin: "",
      fuelType: "",
      mileage: "",
      productionYear: "",
      description: "",
      horsePower: "",
      engineDisplacement: "",
    });
  };

  const onSubmitHandler = async () => {
    const car = getValues();
    const res = await dispatch(createNewCar(car));
    if (isFulfilled(res)) {
      dispatch(setSuccessMessage({ text: "Car successfully added" }));
    } else {
      dispatch(setErrorMessage({ text: "Failed to create new car" }));
    }
    resetForm();
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Create New Car</DialogTitle>
      <DialogContent>
        <FormControl
          fullWidth
          sx={{ p: 1, width: "32vw" }}
        >
          <StyledTextField
            {...register("vin")}
            error={!!errors?.vin}
            helperText={errors?.vin?.message}
            variant="filled"
            label="VIN"
            margin="normal"
          />
          <StyledTextField
            {...register("fuelType")}
            error={!!errors?.fuelType}
            helperText={errors?.fuelType?.message}
            variant="filled"
            label="Fuel Type"
            margin="normal"
          />
          <StyledTextField
            {...register("mileage")}
            error={!!errors?.mileage}
            helperText={errors?.mileage?.message}
            variant="filled"
            label="Mileage"
            margin="normal"
          />
          <StyledTextField
            {...register("productionYear")}
            error={!!errors?.productionYear}
            helperText={errors?.productionYear?.message}
            variant="filled"
            label="Production Year"
            margin="normal"
          />
          <StyledTextField
            {...register("description")}
            error={!!errors?.description}
            helperText={errors?.description?.message}
            variant="filled"
            label="Description"
            margin="normal"
          />
          <StyledTextField
            {...register("horsePower")}
            error={!!errors?.horsePower}
            helperText={errors?.horsePower?.message}
            variant="filled"
            label="Horse Power"
            margin="normal"
          />
          <StyledTextField
            {...register("engineDisplacement")}
            error={!!errors?.engineDisplacement}
            helperText={errors?.engineDisplacement?.message}
            variant="filled"
            label="Engine Displacement"
            margin="normal"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="secondary" onClick={() => { resetForm(); onClose(); }}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={handleSubmit(onSubmitHandler)}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCarModal;
