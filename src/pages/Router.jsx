import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "./Main";
import NotFound from "./NotFound";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <NotFound />,
      children: [{ index: true, element: <Main /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}
