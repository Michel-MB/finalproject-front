import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  Link,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { Formik } from "formik";
import { tokens } from "../../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import image from "../../assets/user.png";
import { login } from "../../services/AuthService";
const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [message, setMessage] = React.useState("");
  let navigate = useNavigate();
  const handleFormSubmit = (values) => {
    console.log(values);
    const { email, password } = values;
    setMessage("");
    login(email, password).then(
      () => {
        navigate("/dashboard");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <Box
      m="20px"
      sx={{
        "& label.Mui-focused": {
          color: "white",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "yellow",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        },
      }}
    >
      {message && (
        <Alert variant="outlined" severity="error">
          {message}
        </Alert>
      )}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
      >
        <Box gridColumn="span 4" gridRow="span 4"></Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignContent="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Login
              </Typography>
            </Box>
            <Box>
              {/* <IconButton>
                <ControlPointOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton> */}
            </Box>
          </Box>
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={image}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h2"
                color={colors.greenAccent[200]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                Welcome
              </Typography>
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
              ></Typography>
            </Box>
          </Box>
          <Box
            mt="25px"
            p="0 60px"
            justifyContent="space-between"
            alignContent="center"
          >
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="10px"
                    gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Email"
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{
                        gridColumn: "span 6",
                      }}
                    />
                    <TextField
                      variant="outlined"
                      type="password"
                      label="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact}
                      name="password"
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{ gridColumn: "span 6" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="15px">
                    <Button type="submit" color="secondary" variant="contained">
                      Login
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            <Box>
              <Typography
                variant="h4"
                color={colors.greenAccent[200]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                Dont have an account ?{" "}
                <Link color="secondary" href="/register">
                  Register
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  //   email: yup.string().email("invalid email").required("required"),
  email: yup.string().required("required"),
  password: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
});
const initialValues = {
  email: "",
  password: "",
};

export default Login;
