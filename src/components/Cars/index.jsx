import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllCars } from "../../redux/carsSlice";
import AddCar from "./AddCar";

const Cars = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("fetching");
    (async () => {
      await dispatch(getAllCars());
    })();
  }, [dispatch]);

  return (
    <Box sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    >
      <AddCar />
    </Box>
  );
};

export default Cars;
