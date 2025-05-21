import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
// import Profile from "../pages/Profile";
// import JobList from "../pages/JobList";
// import Recommendations from "../pages/Recommendations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    //   { path: "profile", element: <Profile /> },
    //   { path: "jobs", element: <JobList /> },
    //   { path: "recommendations", element: <Recommendations /> },
    ],
  },
]);

export default router;
