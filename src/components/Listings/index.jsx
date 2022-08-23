/* eslint-disable react/prop-types */
import {
  Box, Button, MenuItem, Select, Stack, Step, StepLabel, Stepper, styled, TextField, Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { isFulfilled } from "@reduxjs/toolkit";

import { requestWithAuthHeader } from "../../api/helpers";
import { getAllCars } from "../../redux/carsSlice";
import { setErrorMessage, setSuccessMessage } from "../../redux/snackbarSlice";

const HiddenInput = styled("input")({ display: "none" });

const UploadPhotos = ({ setListingImages, listingImages }) => {
  const [imageUrls, setImageUrls] = useState([]);

  const onImageChangeHandler = (e) => setListingImages([...e.target.files]);

  useEffect(() => {
    if (listingImages?.length < 1) return;
    const urls = [];
    listingImages?.forEach((image) => {
      urls.push(URL.createObjectURL(image));
    });
    setImageUrls(urls);

    // eslint-disable-next-line consistent-return
    return () => { setImageUrls([]); };
  }, [listingImages]);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Typography pt={4} fontWeight="bold" variant="body">Click the camera icon below to upload photos!</Typography>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="contained-button-file">
        <HiddenInput accept="image/*" id="contained-button-file" multiple type="file" onChange={onImageChangeHandler} />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <Box display="flex" flexDirection="row" maxWidth="80%">
        {imageUrls?.map((imageSrc) => <Box m={2} key={imageSrc} width={300} height={250}><img alt="listing" src={imageSrc} /></Box>)}
      </Box>
    </Stack>
  );
};

const StyledTextField = styled(TextField)(() => ({ ".MuiFormHelperText-root": { marginLeft: "0" } }));

const Listing = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCarId, setSelectedCarId] = useState("");
  const [listingImages, setListingImages] = useState([]);
  const [listingId, setListingId] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsData);

  useEffect(() => {
    (async () => {
      if (!cars) {
        await dispatch(getAllCars());
      }
    })();
  }, [cars, dispatch]);

  const onCarSelectChange = (event) => {
    setSelectedCarId(event.target.value);
  };

  const onSubmitImagesHandler = async () => {
    const imagesData = new FormData();
    if (listingImages?.length > 0) {
      listingImages?.forEach((image) => imagesData.append("images", image));
      await requestWithAuthHeader("POST", `images/upload?postId=${listingId}`, imagesData);
    }
  };

  const requiredMEssage = "This field is required";

  const listingValidationSchema = Yup.object().shape({
    condition: Yup.string().required(requiredMEssage),
    title: Yup.string().required(requiredMEssage),
    location: Yup.string().required(requiredMEssage),
    price: Yup.number().required(requiredMEssage),
    carId: Yup.number().required(requiredMEssage),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(listingValidationSchema),
    mode: "onChange",
  });

  const onCloseHandler = () => {
    reset({
      condition: "",
      title: "",
      location: "",
      price: "",
      carId: "",
    });
    setSelectedCarId("");
    setActiveStep(0);
    onClose();
  };

  const onSubmitListingInfo = async () => {
    if (activeStep === 0) {
      const listing = getValues();
      try {
        const createdListingRes = await requestWithAuthHeader("POST", "/posts", { ...listing, carId: selectedCarId });
        setListingId(createdListingRes?.data?.id);
      } catch (error) {
        dispatch(setErrorMessage({ text: "Could not create a listing" }));
        onCloseHandler();
      }
    }
    if (activeStep === 1) {
      setIsButtonDisabled(true);
      try {
        await onSubmitImagesHandler();
        dispatch(setSuccessMessage({ text: "Listing created successfully" }));
      } catch (e) {
        dispatch(setErrorMessage({ text: "Could not upload images" }));
      }
      setIsButtonDisabled(false);
      onCloseHandler();

      return;
    }
    setActiveStep((prevState) => {
      const nextStep = prevState + 1;

      return nextStep;
    });
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onCloseHandler}
    >
      <DialogTitle my={1}>Create new car listing</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Information</StepLabel>
          </Step>
          <Step>
            <StepLabel>Pictures</StepLabel>
          </Step>
        </Stepper>
        {activeStep === 0 && (
          <FormControl fullWidth>
            <Stack mt={4} mx={2} spacing={2}>
              {cars && (
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
                  {cars?.map((car) => <MenuItem key={car.id} value={car.id}>{car?.description || "No name"}</MenuItem>)}
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
        )}
        {activeStep === 1 && <UploadPhotos setListingImages={setListingImages} listingImages={listingImages} />}
      </DialogContent>
      <DialogActions>
        {/* {activeStep} */}
        <Box sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          m: 2,
        }}
        >
          {activeStep !== 0 ? (
            <Button
              variant="secondary"
              onClick={() => setActiveStep((prevState) => {
                const nextStep = prevState - 1;
                if (prevState === 0) return prevState;

                return nextStep;
              })}
            >
              Back
            </Button>
          ) : <Box />}
          <Button
            onClick={handleSubmit(onSubmitListingInfo)}
            variant="contained"
            disabled={isButtonDisabled}
          >
            {activeStep > 0 ? "Finish" : "Next"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Listing;
