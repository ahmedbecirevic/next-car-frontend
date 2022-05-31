import { Box, Button, Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllCars } from "../../redux/carsSlice";
import AddCar from "./AddCar";

const Cars = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.carsData.cars);

  useEffect(() => {
    (async () => {
      await dispatch(getAllCars());
    })();
  }, [dispatch]);

  const onCloseModalHandler = () => { setIsModalOpened(false); };

  return (
    <>
      <Dialog onClose={onCloseModalHandler} open={isModalOpened}>
        <AddCar />
      </Dialog>
      <Box sx={{ width: "100%" }}>
        <Button onClick={() => setIsModalOpened(true)}>Add New Car</Button>
        <Box sx={{
          m: 5, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
        }}
        >
          {cars?.map((car) => <Box sx={{ p: 4 }} key={car?.id}>{car?.description}</Box>)}
        </Box>
      </Box>
    </>
  );
};

export default Cars;
