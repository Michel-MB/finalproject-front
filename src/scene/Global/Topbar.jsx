import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import * as AuthService from "../../services/AuthService";
import Modal from "@mui/material/Modal";
import EventBus from "../../common/EventBus";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "13%",
  left: "90%",
  transform: "translate(-50%, -50%)",
  width: 300,
  borderRadius: "10px",
  p: 2,
};
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [CurrentUser, setCurrentUser] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    // console.log(user);
    if (user) {
      setCurrentUser(user);
      console.log(CurrentUser);
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);
  const logOut = () => {
    AuthService.logout();
    //  setShowModeratorBoard(false);
    //  setShowAdminBoard(false);
    setCurrentUser(undefined);
    navigate("/login");
    window.location.reload();
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {CurrentUser ? (
          <Box>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleOpen}>
              <PersonOutlinedIcon />
            </IconButton>
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
                <Box mt="8px" gridColumn="span 1">
                  <AccountCircleOutlinedIcon
                    style={{ color: colors.greenAccent[600], fontSize: 30 }}
                  />
                </Box>{" "}
                <Box mt="7px" gridColumn="span 5" gridRow="span 4">
                  <Typography
                    id="modal-modal-title"
                    variant="h3"
                    fontWeight="bold"
                    sx={{}}
                  >
                    {CurrentUser.firstname + " " + CurrentUser.lastname}
                  </Typography>
                </Box>
                <Box mt="7px" gridColumn="span 5" gridRow="span 4">
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    fontWeight="bold"
                    sx={{}}
                  >
                    {"Email: " + CurrentUser.email}
                  </Typography>
                </Box>
                <Box
                  gridColumn="span 1"
                  justifyContent="left"
                  alignContent="end"
                >
                  <IconButton onClick={logOut}>
                    <LogoutOutlinedIcon
                      style={{ color: colors.redAccent[600] }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Modal>
          </Box>
        ) : (
          <Box>
            <IconButton href="/login">
              <LoginOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
