import {
  Box,
  Typography,
  useTheme,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTable } from "react-table";
import { mockDataTeam } from "../../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  getPublicContent,
  getSome,
  getallTeacher,
} from "../../../services/SubjectService";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Pagination from "@mui/material/Pagination";
import EventBus from "../../../common/EventBus";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import Autocomplete from "@mui/material/Autocomplete";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  borderRadius: "10px",
  p: 2,
};
const Courses = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [course, setcourse] = useState([]);
  const [code, setcode] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef();
  const [message, setMessage] = React.useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [showPassword1, setShowPassword1] = useState(false);
  const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);

  const handleMouseDownPassword1 = () => setShowPassword1(!showPassword1);
  const pageSizes = [3, 6, 2];

  const getRequestParams = (searchTitle, page, pageSize, code) => {
    let params = {};
    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };
  const getByIdParam = (code) => {
    let param2 = {};
    if (code) {
      param2["code"] = code;
    }
    return param2;
  };
  const retreiveTeachers = () => {
    getallTeacher()
      .then((response) => response.data)
      .then(
        (data) => {
          setTeachers(data);

          console.log(data);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setContent(_content);

          if (
            (error.response && error.response.status === 401,
            error.response && error.response.status === 403)
          ) {
            EventBus.dispatch("logout");

            navigate("/login");
            window.location.reload();
          }
        }
      );
  };
  const retrieveTutorials = () => {
    const params = getRequestParams(searchTitle, page, pageSize, code);

    getPublicContent(params)
      .then((response) => response.data)

      .then(
        (data) => {
          setSubject(data.reconciled);
          setCount(data.totalItems);

          console.log(data);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setContent(_content);

          if (
            (error.response && error.response.status === 401,
            error.response && error.response.status === 403)
          ) {
            EventBus.dispatch("logout");

            navigate("/login");
            window.location.reload();
          }
        }
      );
  };
  const retrieveTut = () => {
    const params = getByIdParam(code);

    getSome(params)
      .then((response) => response.data)

      .then(
        (data) => {
          setcourse(data);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setContent(_content);

          if (
            (error.response && error.response.status === 401,
            error.response && error.response.status === 403)
          ) {
            EventBus.dispatch("logout");
            navigate("/login");
            window.location.reload();
          }
        }
      );
  };

  useEffect(retrieveTut, [code]);
  useEffect(retrieveTutorials, [page, pageSize]);
  useEffect(retreiveTeachers, []);
  const refreshList = () => {
    retrieveTutorials();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };
  const handleRowClick = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    setMessage(`Movie "${params.row.code}" clicked`);
    setcode(params.row.code);
    const refresh = retrieveTut();
  };

  const columns = useMemo(
    () => [
      {
        accessor: "code",
        headerName: "id",
        field: "id",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        accessor: "description",
        headerName: "Course code",
        field: "courseCode",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        Header: "Status",
        accessor: "subject",
        headerName: "Course Name",
        field: "courseName",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        Header: "Status",
        field: "isInEvaluation",
        headerName: "Evalution Status",

        flex: 1,
        cellClassName: "name-column--cell",
        renderCell: ({ row: { isInEvaluation } }) => {
          return (
            <Box
              width="60%"
              // m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                isInEvaluation ? colors.greenAccent[600] : colors.redAccent[500]
              }
              borderRadius="4px"
            >
              {isInEvaluation ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
              {/* {access === "manager" && <SecurityOutlinedIcon />}
              {access === "user" && <LockOpenOutlinedIcon />} */}
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                {isInEvaluation}
              </Typography>
            </Box>
          );
        },
      },
      {
        accessor: "teacher",
        headerName: "Teacher Name",
        field: "teachId",
        flex: 1,
        cellClassName: "name-column--cell",
        renderCell: ({ row: { teachId } }) => {
          return (
            <Box
              width="60%"
              // m="0 auto"
              p="5px"
              display="flex"
              justifyContent="left"
              borderRadius="4px"
            >
              <PersonOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>{teachId.teacherName}</Typography>
            </Box>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        headerName: "Actions",

        renderCell: ({ row: { teachId } }) => {
          return (
            <Box>
              <IconButton onClick={handleOpen}>
                <PersonOutlinedIcon />
              </IconButton>
              <IconButton>
                <PersonOutlinedIcon />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    []
  );

  /////////////////////////////////
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
  ///////////////////////////////////////////

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: subject,
    });

  return (
    <Box m="20px">
      <Box>
        <Header title="COURSES" subtitle="Manage courses" />
      </Box>
      {/* Body Section */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="120px"
        gap="20px"
      >
        {/* Column 1 */}

        <Box
          gridColumn="span 12"
          gridRow="span 5"
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
                List of Courses
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <ControlPointOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          {/* Body */}
          <Box>
            <Box
              m="10px 0 0 0"
              p="0 15px"
              heigth="70vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.blueAccent[100],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
                "& .MuiTablePagination-toolbar": {
                  display: "none",
                },
              }}
            >
              <DataGrid
                rows={subject}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                onRowClick={(params, event) => {
                  setMessage(`Movie "${params.row.code}" clicked`);
                  setcode(params.row.code);
                }}
                sx={{ heigth: "400px" }}
              ></DataGrid>

              <Pagination
                className="my-3"
                count={count}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                color="secondary"
                shape="rounded"
                onChange={handlePageChange}
              />
              {message && <Alert severity="info">{message}</Alert>}
            </Box>
          </Box>
          {/* End of Column 1 */}
        </Box>

        {/* Column 2 */}

        {/* End of Body */}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
          backgroundColor={colors.primary[400]}
          sx={style}
        >
          <Box
            mt="5px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignContent="center"
            gridColumn="span 6"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
              >
                View Course
              </Typography>
            </Box>
          </Box>

          {/* <Box mt="7px" gridColumn="span 5" gridRow="span 4">
            <Typography
              id="modal-modal-title"
              variant="h3"
              fontWeight="bold"
              sx={{}}
            >
              hi
            </Typography>
          </Box>
          <Box mt="7px" gridColumn="span 5" gridRow="span 4">
            <Typography
              id="modal-modal-title"
              variant="h5"
              fontWeight="bold"
              sx={{}}
            >
              hi
            </Typography>
          </Box> */}

          <Box
            mt="25px "
            gridColumn="span 6"
            gridRow="span 4"
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
                    <Field name="color" component="select">
                      <option value="red">Red</option>
                      <option value="green">Green</option>
                      <option value="blue">Blue</option>
                    </Field>
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
      </Modal>
    </Box>
  );
};
/////////////////////////////////////////////

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
/////////////////////
export default Courses;
