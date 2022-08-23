import {
  Box, Button, Card, CardContent, Dialog, DialogContent, Typography,
  Container,
  Grid,
} from "@mui/material";
import { isFulfilled } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllCars } from "../../redux/carsSlice";
import { setErrorMessage } from "../../redux/snackbarSlice";
import AddCarModal from "./AddCarModal";
import CarCard from "./CarCard";
import Page from "../Page";

const Cars = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [carToEdit, setCarToEdit] = useState({});
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
    setIsEditMode(false);
    setIsModalOpened(false);
  };

  return (
    <Page title="Cars">
      <AddCarModal carToEdit={carToEdit} isEditMode={isEditMode} open={isModalOpened} onClose={onCloseModalHandler} />
      <Container>
        <Box sx={{
          mb: 5, display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row",
        }}
        >
          <Typography variant="h4">
            Cars
          </Typography>
          <Button sx={{ bgcolor: "primary.main", color: "secondary.contrastText" }} onClick={() => setIsModalOpened(true)}>Add New Car</Button>
        </Box>
        {cars?.length > 0 ? (
          <Grid container spacing={3}>
            {cars?.map((car) => (
              <Grid key={car.id} item xs={12} sm={6} md={3}>
                <CarCard setCarToEdit={setCarToEdit} setIsOpen={setIsModalOpened} setIsEdit={setIsEditMode} car={car} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5">
              No Data Found
            </Typography>
          </Box>

        )}
      </Container>

    </Page>
  );
};

export default Cars;
