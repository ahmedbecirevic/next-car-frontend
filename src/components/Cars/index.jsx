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
    <Page title="Cars">
      <AddCarModal open={isModalOpened} onClose={onCloseModalHandler} />
      <Button sx={{ bgcolor: "green", mt: 2, color: "white" }} onClick={() => setIsModalOpened(true)}>Add New Car</Button>

      {/* {cars?.map((car) => (
        <CarCard key={car?.id} car={car} />
        // <Card
        //   sx={{
        //     minWidth: 500, maxWidth: 500, mt: 2, textAlign: "center", bgcolor: "#8d99ae",
        //   }}
        //   key={car?.id}
        // >
        //   <CardContent>
        //     <Typography variant="h5">{car?.description}</Typography>
        //     <Typography variant="body2">{car?.vin}</Typography>
        //   </CardContent>

        // </Card>
      ))} */}
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Cars
        </Typography>

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}
        <Grid container spacing={3}>
          {cars?.map((car) => (
            <Grid key={car.id} item xs={12} sm={6} md={3}>
              <CarCard car={car} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default Cars;
