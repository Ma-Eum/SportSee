import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import Profile from "../pages/Profile";
import NotFound from "../pages/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "profile/:userId", // ✅ Harmonisé avec le useParams et navigate
        element: <Profile />
      }
      ,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);