import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import {
  Card, Container, Typography, Button, Box,
} from "@mui/material";
import { useEffect } from "react";

import useResponsive from "../hooks/useResponsive";
import Page from "../components/Page";
import Iconify from "../components/Iconify";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({ [theme.breakpoints.up("md")]: { display: "flex" } }));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const Login = () => {
  const navigate = useNavigate();
  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");

  const onGoogleSignInHandler = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/users/auth/google`;
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title="Sign in">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 3, mb: 5 }}>
              Hi, Welcome Back to NextCar
            </Typography>
            <img src="/static/illustrations/illustration_login.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Box sx={{
              bgcolor: "secondary.light",
              height: "45vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              p: 3,
              borderRadius: "7px",
            }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography color="white" variant="h4" gutterBottom>
                  Sign in With Google Below
                </Typography>
                <Button onClick={onGoogleSignInHandler}>
                  <Box sx={{
                    my: 2,
                    width: "15vw",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    bgcolor: "primary.lighter",
                    borderRadius: "10px",
                  }}
                  >
                    <img src="/static/images/google.svg" alt="google" />
                  </Box>
                </Button>
              </Box>
            </Box>

          </ContentStyle>

        </Container>
      </RootStyle>
    </Page>
  );
};

export default Login;
