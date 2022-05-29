import {
  Box, Button, FormControl, styled, TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { REGEX } from "../../constants";
import { createCar } from "../../api/services/carService";

const StyledTextField = styled(TextField)(() => ({ ".MuiFormHelperText-root": { marginLeft: "0" } }));

const AddCar = () => {
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
  } = useForm({
    resolver: yupResolver(carValidationSchema),
    mode: "all",
  });

  const onSubmitHandler = async () => {
    const car = getValues();
    await createCar(car);
    // console.log(res);
  };

  return (
    <Box>
      <FormControl sx={{
        width: {
          lg: "40vw",
          xs: "100vw",
          md: "70vw",
        },
        p: 2,
      }}
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
        <Button
          type="submit"
          // disabled={isCreateButtonDisabled}
          variant="primary"
          onClick={handleSubmit(onSubmitHandler)}
        >
          Add Car
        </Button>
      </FormControl>
    </Box>
  );
};

export default AddCar;
