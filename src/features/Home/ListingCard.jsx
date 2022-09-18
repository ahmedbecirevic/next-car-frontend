import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import HideImageIcon from "@mui/icons-material/HideImage";
import { useDispatch } from "react-redux";
import { isFulfilled } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

import { createNewPurchase } from "../../redux/purchaseSlice";
import { setErrorMessage, setSuccessMessage } from "../../redux/snackbarSlice";

// eslint-disable-next-line camelcase
const checkIfUserRequestedToBuy = (userId, purchases) => purchases?.some((purchase) => purchase?.userId === userId);

const ListingCard = ({ listing, userId }) => {
  const [loading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState(checkIfUserRequestedToBuy(userId, listing?.purchase_histories) ? "Requested" : "Request purchase");
  const [isButtonDisabled, setIsButtonDisabled] = useState(checkIfUserRequestedToBuy(userId, listing?.purchase_histories));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requestPurchaseHandler = async () => {
    setIsLoading(true);
    const res = await dispatch(createNewPurchase({
      status: "REQUESTED",
      userId,
      listingId: listing?.id,
    }));
    if (isFulfilled(res)) {
      dispatch(setSuccessMessage({ text: "Successfully requested to buy this listing" }));
      setButtonText("Requested");
      setIsButtonDisabled(true);
    } else {
      dispatch(setErrorMessage({ text: "Could not request to buy listing" }));
    }
    setIsLoading(false);
  };

  return (
    <Card sx={{
      mb: 3, height: "25%", display: "flex", borderRadius: 1,
    }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: 250, width: { md: "30%", xs: "40%" } }}>
        {listing?.images[0]?.link
          ? <CardMedia component="img" src={listing?.images[0]?.link} /> : (
            <HideImageIcon
              sx={{ width: "25%", height: "25%" }}
            />
          )}
      </Box>
      <CardContent sx={{ width: { xs: "50%", md: "70%" }, borderRadius: 6 }}>
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h4">{listing?.title}</Typography>
              <Typography sx={{ m: 1 }} variant="body1">
                <b>Car: </b>
                {listing?.car?.description}
              </Typography>
              <Typography sx={{ m: 1 }} variant="body1">
                <b>Price (KM): </b>
                {listing?.price}
              </Typography>
              <Typography sx={{ m: 1 }} variant="body1">
                <b>Mileage: </b>
                {listing?.car?.mileage}
              </Typography>
              <Typography sx={{ m: 1 }} variant="body1">
                <b>Fuel: </b>
                {listing?.car?.fuelType}
              </Typography>
            </Box>
            {userId !== listing?.car?.userId
          && (
            <LoadingButton
              loading={loading}
              variant="contained"
              sx={{ height: 45 }}
              onClick={requestPurchaseHandler}
              disabled={isButtonDisabled}
            >
              {buttonText}
            </LoadingButton>
          )}
          </Box>
          <Typography
            sx={{
              mt: 3,
              textDecoration: "underline",
              cursor: "pointer",
              alignSelf: "flex-end",
            }}
            variant="body2"
            onClick={() => navigate(`listings/${listing?.id}`)}
          >
            View listing details
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ListingCard;

ListingCard.propTypes = { listing: PropTypes.object.isRequired, userId: PropTypes.number };
