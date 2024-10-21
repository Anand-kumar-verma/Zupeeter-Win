import { Route, Routes } from "react-router-dom";
import BeforeLogin from "./BeforeLogin";
import LayoutAviator from "./GamePage/Layout";
import PlayGame from "./GamePage/PlayGame";
import SplashScreen from "./SplashScreen";
import "./assets/style/main.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/home/Dashboard";
import Test from "./pages/test";
import { routes } from "./route";
import { deCryptData } from "./shared/secret";
import { adminroutes } from "./AdminRoutes";
import AdminLayout from "./Adminpages/Layout";

function App() {
  const userData = deCryptData(localStorage.getItem("user_id"));
  const isAuthenticated = userData ? true : false;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/test" element={<Test />} />
      <Route path="/register" element={<Register />} />
      <Route path="/before-login" element={<BeforeLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/playgame"
        element={<LayoutAviator component={<PlayGame />} />}
      />

      {isAuthenticated ? (
        routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))
      ) : (
        <Route path="/" element={<Login />} />
      )}

      {isAuthenticated && (userData.user_type === "Admin" || userData.user_type === "Super Admin") ? (
        adminroutes.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            element={
              <AdminLayout
                id={route.id}
                navLink={route.path}
                navItem={route.navItem}
                component={route.component}
              />
            }
          />
        ))
      ) : (
        <Route path="/" element={<Login />} />
      )}

      <Route path="/splash" element={<SplashScreen />} />
    </Routes>
  );
}

export default App;
