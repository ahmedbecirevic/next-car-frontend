import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Slide, Snackbar, SnackbarContent } from "@mui/material";

import { resetSnackbar } from "../../redux/snackbarSlice";

const SnackBar = () => {
  const dispatch = useDispatch();

  const { errorMessage, successMessage } = useSelector((state) => state.snackbar);

  const [snackbarData, setSnackbarData] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (errorMessage?.text) {
      setSnackbarData({ text: errorMessage.text, color: "red" });
      setShowSnackbar(true);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      setSnackbarData({ text: successMessage?.text, color: "green" });
      setShowSnackbar(true);
    }
  }, [successMessage]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={3500}
      open={showSnackbar}
      onClose={() => {
        setShowSnackbar(false);
        setSnackbarData(null);
        dispatch(resetSnackbar());
      }}
      TransitionComponent={Slide}
    >
      {snackbarData?.color && snackbarData?.text && (
        <SnackbarContent
          style={{ backgroundColor: snackbarData.color }}
          message={<span>{snackbarData.text}</span>}
        />
      )}
    </Snackbar>
  );
};

export default SnackBar;
