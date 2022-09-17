import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/sign-in");
      }}
    >
      Log out
    </Button>
  );
};

export default LogOut;
