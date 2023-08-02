import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../../theme";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import image from "../../assets/images2.png";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import { register } from "../../services/AuthService";
const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [showPassword1, setShowPassword1] = useState(false);
  const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);

  const handleMouseDownPassword1 = () => setShowPassword1(!showPassword1);
  const [message, setMessage] = React.useState("");
  const handleFormSubmit = (values) => {
    console.log(values);
    const { firstName, lastName, email, contact, password } = values;
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(contact);
    console.log(password);
    setMessage("");
    register(firstName, lastName, email, contact, password).then(
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
          borderBottomColor: "white",
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
        "&.MuiFormHelperText-root": {
          marginTop: "9px",
        },
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="145px"
        gap="10px"
      >
        <Box gridColumn="span 4" gridRow="span 4"></Box>
        <Box
          gridColumn="span 4"
          gridRow="span 4"
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
                Sign Up
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
              <PersonAddIcon width="130px" height="130px" fontSize="large" />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h2"
                color={colors.greenAccent[200]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                Create new Account
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
                    gap="20px"
                    gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      focused
                      type="text"
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={!!touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 3" }}
                      InputProps={{
                        // <-- This is where the toggle button is added.

                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBoxOutlinedIcon />
                          </InputAdornment>
                        ),
                        style: {
                          height: "40px",
                          padding: "0 14px",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      focused
                      type="text"
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={!!touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 3" }}
                      InputProps={{
                        // <-- This is where the toggle button is added.

                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                        style: {
                          height: "40px",
                          padding: "0 14px",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      focused
                      type="email"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 6" }}
                      InputProps={{
                        // <-- This is where the toggle button is added.

                        startAdornment: (
                          <InputAdornment position="start">
                            <AlternateEmailOutlinedIcon />
                          </InputAdornment>
                        ),
                        style: {
                          height: "40px",
                          padding: "0 14px",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      focused
                      type="text"
                      label="Contact Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact}
                      name="contact"
                      error={!!touched.contact && !!errors.contact}
                      helperText={touched.contact && errors.contact}
                      sx={{ gridColumn: "span 6" }}
                      InputProps={{
                        // <-- This is where the toggle button is added.

                        startAdornment: (
                          <InputAdornment position="start">
                            <CallOutlinedIcon />
                          </InputAdornment>
                        ),
                        style: {
                          height: "40px",
                          padding: "0 14px",
                        },
                      }}
                    />
                    <TextField
                      size="small"
                      variant="outlined"
                      focused
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      error={!!touched.address1 && !!errors.address1}
                      helperText={touched.address1 && errors.address1}
                      sx={{ gridColumn: "span 6" }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <RemoveRedEyeIcon />
                            ) : (
                              <VisibilityOffOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOffOutlinedIcon />
                              ) : (
                                <RemoveRedEyeIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment position="start">
                            <PasswordOutlinedIcon />
                          </InputAdornment>
                        ),
                        style: {
                          height: "40px",
                          padding: "0 14px",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      focused
                      type={showPassword1 ? "text" : "password"}
                      label="Confirm Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmPassword}
                      name="confirmPassword"
                      error={!!touched.address2 && !!errors.address2}
                      helperText={touched.address2 && errors.address2}
                      sx={{ gridColumn: "span 6" }}
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword1}
                              onMouseDown={handleMouseDownPassword1}
                            >
                              {showPassword1 ? (
                                <VisibilityOffOutlinedIcon />
                              ) : (
                                <RemoveRedEyeIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment position="start">
                            <PasswordOutlinedIcon />
                          </InputAdornment>
                        ),
                        style: {
                          height: "35px",
                          padding: "0 14px",
                        },
                      }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="5px">
                    <Button type="submit" color="secondary" variant="contained">
                      Create New User
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  password: "",
  confirmPassword: "",
};

export default Form;
