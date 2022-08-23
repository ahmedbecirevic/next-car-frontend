/* eslint-disable react/prop-types */
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, styled, TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { isFulfilled } from "@reduxjs/toolkit";
import { useEffect } from "react";

import { REGEX } from "../../constants";
import { createNewCar, updateExistingCar } from "../../redux/carsSlice";
import { setErrorMessage, setSuccessMessage } from "../../redux/snackbarSlice";

const StyledTextField = styled(TextField)(() => ({ ".MuiFormHelperText-root": { marginLeft: "0" } }));

const AddCarModal = ({
  // eslint-disable-next-line react/prop-types
  open, onClose, isEditMode, carToEdit,
}) => {
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
    const res = await dispatch(isEditMode ? updateExistingCar({ ...car, id: carToEdit?.id }) : createNewCar(car));
    if (isFulfilled(res)) {
      dispatch(setSuccessMessage({ text: isEditMode ? "Car updated successfully" : "Car successfully added" }));
    } else {
      dispatch(setErrorMessage({ text: isEditMode ? "Failed to create new car" : "Failed to create new car" }));
    }
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (isEditMode) {
      const {
        vin, fuelType, mileage, productionYear, description, horsePower, engineDisplacement,
      } = carToEdit || {};
      reset({
        vin,
        fuelType,
        mileage,
        productionYear,
        description,
        horsePower,
        engineDisplacement,
      });
    }
  }, [open]);

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
    >
      <DialogTitle>Create New Car</DialogTitle>
      <DialogContent>
        <FormControl
          fullWidth
          sx={{ p: 1 }}
        >
          <StyledTextField
            {...register("vin")}
            error={!!errors?.vin}
            helperText={errors?.vin?.message}
            label="VIN"
            margin="normal"
          />
          <StyledTextField
            {...register("fuelType")}
            error={!!errors?.fuelType}
            helperText={errors?.fuelType?.message}
            label="Fuel Type"
            margin="normal"
          />
          <StyledTextField
            {...register("mileage")}
            error={!!errors?.mileage}
            helperText={errors?.mileage?.message}
            label="Mileage"
            margin="normal"
          />
          <StyledTextField
            {...register("productionYear")}
            error={!!errors?.productionYear}
            helperText={errors?.productionYear?.message}
            label="Production Year"
            margin="normal"
          />
          <StyledTextField
            {...register("description")}
            error={!!errors?.description}
            helperText={errors?.description?.message}
            label="Description"
            margin="normal"
          />
          <StyledTextField
            {...register("horsePower")}
            error={!!errors?.horsePower}
            helperText={errors?.horsePower?.message}
            label="Horse Power"
            margin="normal"
          />
          <StyledTextField
            {...register("engineDisplacement")}
            error={!!errors?.engineDisplacement}
            helperText={errors?.engineDisplacement?.message}
            label="Engine Displacement"
            margin="normal"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Box sx={{
          width: "100%", display: "flex", justifyContent: "space-between", p: 2,
        }}
        >
          <Button variant="secondary" onClick={() => { resetForm(); onClose(); }}>
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{ bgcolor: "primary.main", color: "secondary.contrastText" }}
            onClick={handleSubmit(onSubmitHandler)}
          >
            {isEditMode ? "Update" : "Add"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddCarModal;
