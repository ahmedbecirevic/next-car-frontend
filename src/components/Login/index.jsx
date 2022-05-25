import { Button, Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();

  const onGoogleSignInHandler = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/users/auth/google`;
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="primary"
        onClick={onGoogleSignInHandler}
        sx={{ bgcolor: "primary.main" }}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default Login;
