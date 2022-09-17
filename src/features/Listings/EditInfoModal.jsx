import {
  Button, Dialog, DialogActions, DialogTitle, DialogContent,
} from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import CreateEditListing from "./CreateEditListing";
import { requestWithAuthHeader } from "../../api/helpers";
import { setErrorMessage, setSuccessMessage } from "../../redux/snackbarSlice";

const EditInfoModal = ({
  open, onClose, listing, setListing,
}) => {
  const [selectedCarId, setSelectedCarId] = useState("");
  const dispatch = useDispatch();

  const requiredMessage = "This field is required";

  const listingValidationSchema = Yup.object().shape({
    condition: Yup.string().required(requiredMessage),
    title: Yup.string().required(requiredMessage),
    location: Yup.string().required(requiredMessage),
    price: Yup.number().required(requiredMessage),
    carId: Yup.number().required(requiredMessage),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
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
    onClose();
  };

  const editListingHandler = async (data) => {
    try {
      const res = await requestWithAuthHeader("PUT", `/posts/${listing?.id}`, { ...listing, ...data });
      const updatedListing = res?.data;
      dispatch(setSuccessMessage({ text: "Listing successfully updated" }));
      setListing((prevValue) => ({ ...prevValue, ...updatedListing }));
      onCloseHandler();
    } catch (error) {
      dispatch(setErrorMessage({ text: "Could not update listing" }));
    }
  };

  useEffect(() => {
    reset({
      condition: listing?.condition,
      title: listing?.title,
      location: listing?.location,
      price: listing?.price,
      carId: listing?.carId,
    });
    setSelectedCarId(listing?.carId);
  }, [open]);

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Edit listing information</DialogTitle>
      <DialogContent>
        <CreateEditListing
          register={register}
          errors={errors}
          onCarSelectChange={(e) => setSelectedCarId(e.target.value)}
          selectedCarId={selectedCarId}
        />
      </DialogContent>
      <DialogActions sx={{
        display: "flex",
        justifyContent: "space-between",
        m: 2,
      }}
      >
        <Button onClick={onCloseHandler}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit(editListingHandler)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditInfoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  listing: PropTypes.object.isRequired,
  setListing: PropTypes.func.isRequired,
};

export default EditInfoModal;
