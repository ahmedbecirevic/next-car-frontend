import { Button } from "@mui/material";

function Login() {
  return (
    <Button
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Sign in with Google
    </Button>
  );
}

export default Login;
