import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../redux/authSlice";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Button
      variant="outlined"
      onClick={() => {
        localStorage.removeItem("token");
        dispatch(logoutUser());
        navigate("/sign-in");
      }}
    >
      Log out
    </Button>
  );
};

export default LogOut;
