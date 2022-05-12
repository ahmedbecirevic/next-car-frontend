import { Box, FormControl, TextField } from "@mui/material";
// import { useForm, useFormState } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";

const AddCar = () => (
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
      <TextField variant="filled" label="VIN" margin="normal" />
      <TextField variant="filled" label="Fuel Type" margin="normal" />
      <TextField variant="filled" label="Mileage" margin="normal" />
      <TextField variant="filled" label="Production Year" margin="normal" />
      <TextField variant="filled" label="Description" margin="normal" />
      <TextField variant="filled" label="Horse Power" margin="normal" />
      <TextField variant="filled" label="Engine Displacement" margin="normal" />
    </FormControl>
  </Box>
);

export default AddCar;
