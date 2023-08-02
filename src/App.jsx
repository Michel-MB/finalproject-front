import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scene/global/Topbar";
import Sidebar from "./scene/global/Sidebar";
import Dashboard from "./scene/dashboard";
import Subject from "./scene/Subjects";
import Academic from "./scene/Admin/Academic";
import Charts from "./scene/Admin/Charts";
import Courses from "./scene/Admin/Courses";
import Criteria from "./scene/Admin/Criteria";
import Faculty from "./scene/Admin/Faculty";
import Questionaire from "./scene/Admin/Questionaire";
import Reports from "./scene/Reports";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Department from "./scene/Admin/Department";
import Form from "./scene/SignUp";
import Login from "./scene/Login";
import * as AuthService from "./services/AuthService";
import EventBus from "./common/EventBus";
// import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [CurrentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      console.log(user);
      // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
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
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {CurrentUser && <Sidebar isSidebar={isSidebar} user={CurrentUser} />}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} user={CurrentUser} />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subjects" element={<Subject />} />
              <Route path="/academics" element={<Academic />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/Courses" element={<Courses />} />
              <Route path="/department" element={<Department />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/questionnaire" element={<Questionaire />} />
              <Route path="/report" element={<Reports />} />
              <Route path="/criteria" element={<Criteria />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Form />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
