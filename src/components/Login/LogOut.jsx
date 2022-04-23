import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

import { logoutUser } from "../../redux/authSlice";

const LogOut = () => {
  const dispatch = useDispatch();

  return (
    <Button
      variant="primary"
      onClick={() => dispatch(logoutUser())}
    >
      Log out
    </Button>
  );
};

export default LogOut;
