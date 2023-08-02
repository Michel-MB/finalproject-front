import { Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import Header from "../../../components/Header";
import Alert from "@mui/material/Alert";
const Faculty = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* Header Section */}
      <Box>
        <Header title="FACULTY" subtitle="Manage faculty members" />
      </Box>

      {/* Body Section */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Column 1 */}
        <Box
          gridColumn="span 8"
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
                List of Faculty Me
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
          <Box></Box>
          {/* End of Column 1 */}
        </Box>

        {/* Column 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          {/* header */}
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
                List Of Courses
              </Typography>
            </Box>
          </Box>
          {/* Body */}
          <Box></Box>
          {/* End of Column 2 */}
        </Box>
        {/* End of Body */}
      </Box>
    </Box>
  );
};

export default Faculty;
