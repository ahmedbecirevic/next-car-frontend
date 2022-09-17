import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { requestWithAuthHeader } from "../../api/helpers";
import CustomCard from "../../components/CustomCard";
import { setErrorMessage } from "../../redux/snackbarSlice";

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await requestWithAuthHeader("GET", "/users");
        setUser(response?.data);
      } catch (error) {
        dispatch(setErrorMessage({ text: "Could not fetch user data!" }));
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getActions = () => {
    const actions = [{
      label: "Log out",
      action: () => {
        localStorage.removeItem("token");
        navigate("/sign-in");
      },
    }];

    if (!user?.phoneNumber) {
      actions.push({
        label: !user?.phoneNumber && "Add phone number",
        action: () => setIsOpen(true),
      });
    }

    return actions;
  };

  const closeModalHandler = () => {
    setIsOpen(false);
    setPhoneNumber("");
  };

  const onSaveNumberHandler = async () => {
    try {
      await requestWithAuthHeader("POST", "/users/phone-number", { phoneNumber });
      setUser((prevValue) => ({ ...prevValue, phoneNumber }));
      closeModalHandler();
    // eslint-disable-next-line no-empty
    } catch {}
  };

  return (
    <>
      <CustomCard
        title="Profile"
        details={[{
          property: "Name",
          value: user?.displayName,
        },
        {
          property: "email",
          value: user?.email,
        },
        {
          property: "phone number",
          value: user?.phoneNumber,
        },
        {
          property: "account created at",
          value: new Date(user?.createdAt).toLocaleString(),
        },
        ]}
        actions={getActions()}
      />
      <Dialog maxWidth="xs" fullWidth open={isOpen} onClose={closeModalHandler}>
        <DialogTitle>Add phone number</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: 1 }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            label="Phone number"
            inputProps={{ maxlength: 12 }}
            type="number"
          />
        </DialogContent>
        <DialogActions sx={{
          display: "flex",
          justifyContent: "space-between",
          m: 1,
        }}
        >
          <Button onClick={closeModalHandler}>Cancel</Button>
          <Button variant="contained" onClick={onSaveNumberHandler}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfilePage;
