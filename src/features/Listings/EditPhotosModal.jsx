/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";

import { requestWithAuthHeader } from "../../api/helpers";
import { setSuccessMessage } from "../../redux/snackbarSlice";
import { UploadPhotos } from ".";

const EditPhotosModal = ({
  listing, images, open, onClose, setListing,
}) => {
  const [listingImages, setListingImages] = useState([]);
  const dispatch = useDispatch();

  const deleteImageHandler = async (id) => {
    try {
      await requestWithAuthHeader("DELETE", `images/${id}`);
      setListing((prevState) => {
        const filteredImages = prevState?.images?.filter((image) => image?.id !== id);

        return { ...prevState, images: filteredImages };
      });
      dispatch(setSuccessMessage({ text: "Image removed" }));
    // eslint-disable-next-line no-empty
    } catch {}
  };

  const onSubmitImagesHandler = async () => {
    const imagesData = new FormData();
    if (listingImages?.length > 0) {
      listingImages?.forEach((image) => imagesData.append("images", image));
      try {
        const res = await requestWithAuthHeader("POST", `images/upload?postId=${listing?.id}`, imagesData);
        setListing((prevState) => ({ ...prevState, images: res.data }));
        setListingImages([]);
        onClose();
      // eslint-disable-next-line no-empty
      } catch {}
    }
  };

  return (
    <Dialog fullWidth maxWidth={images?.length ? "md" : "sm"} open={open} onClose={onClose}>
      <DialogTitle>
        Change listing photos
        {" "}
        {listing?.title}
      </DialogTitle>
      <DialogContent>
        {images?.length
          ? (
            <Box sx={{ width: "100%", height: 200 }}>
              {images?.map(({ link, id }) => (
                <Box key={id} sx={{ position: "relative" }}>
                  <img src={link} alt="car" />
                  <RemoveCircleOutlineIcon
                    sx={{
                      width: 40,
                      height: 40,
                      cursor: "pointer",
                      position: "absolute",
                      top: 2,
                      right: 2,
                    }}
                    onClick={() => deleteImageHandler(id)}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            <Typography
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
              variant="h5"
            >
              This listing does not contain any photos.
            </Typography>
          )}
        <UploadPhotos setListingImages={setListingImages} listingImages={listingImages} />
      </DialogContent>
      <DialogActions sx={{
        display: "flex",
        justifyContent: "space-between",
        m: 2,
      }}
      >
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmitImagesHandler} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPhotosModal;
