import { Button, Box } from "@mui/material";

const Login = () => {
  const onGoogleSignInHandler = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_SERVER}/user/auth/google`;
  };

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
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default Login;
