import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTable } from "react-table";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { getPublicContent, getSome } from "../../services/SubjectService";
import Pagination from "@mui/material/Pagination";
import EventBus from "../../common/EventBus";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
const Subject = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate();
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState([]);
  const [course, setcourse] = useState([]);
  const [code, setcode] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef();
  const [message, setMessage] = React.useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(2);

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

  useEffect(retrieveTutorials, [page, pageSize]);

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
        Header: "Title",
        accessor: "code",
        headerName: "Name",
        field: "code",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        Header: "Description",
        accessor: "description",
        headerName: "Name",
        field: "description",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        Header: "Status",
        accessor: "subject",
        headerName: "Name",
        field: "subject",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        Header: "Actions",
        accessor: "actions",
        headerName: "Name",

        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span>
                <i className="far fa-edit action mr-2 px-3"></i>
              </span>

              <span>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: subject,
    });

  return (
    <Box m="20px">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      <Box
        m="40px 0 0 0"
        heigth="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
        }}
      >
        <DataGrid
          rows={subject}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={handleRowClick}
        ></DataGrid>

        <Pagination
          className="my-3"
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
        {message && <Alert severity="info">{message}</Alert>}

        <DataGrid
          rows={course}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={handleRowClick}
        ></DataGrid>
      </Box>
    </Box>
  );
};
export default Subject;
