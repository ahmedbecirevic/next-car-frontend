import {
  Box, Button, Card, CardContent, Dialog, DialogContent, Typography,
} from "@mui/material";
import { isFulfilled } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllCars } from "../../redux/carsSlice";
import { setErrorMessage } from "../../redux/snackbarSlice";
import AddCarModal from "./AddCarModal";

const Cars = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.carsData.cars);

  useEffect(() => {
    (async () => {
      const res = await dispatch(getAllCars());
      if (!isFulfilled(res)) {
        dispatch(setErrorMessage({ text: "Error fetching cars" }));
      }
    })();
  }, [dispatch]);

  const onCloseModalHandler = () => {
    setIsModalOpened(false);
  };

  return (
    <>
      <AddCarModal open={isModalOpened} onClose={onCloseModalHandler} />
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Button sx={{ bgcolor: "green", mt: 2, color: "white" }} onClick={() => setIsModalOpened(true)}>Add New Car</Button>
        <Box sx={{
          display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
        }}
        >
          {cars?.map((car) => (
            <Card
              sx={{
                minWidth: 500, maxWidth: 500, mt: 2, textAlign: "center", bgcolor: "#8d99ae",
              }}
              key={car?.id}
            >
              <CardContent>
                <Typography variant="h5">{car?.description}</Typography>
                <Typography variant="body2">{car?.vin}</Typography>
              </CardContent>

            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Cars;
