import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "./Mian";
import NotFound from "./NotFound";
import Modal from "../components/Modal";
import SearchResults from "./SearchResults";
import Intro from "./Intro";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Intro /> },
        { path: "/main", element: <Main /> },
        { path: "/main/:category/:movieId", element: <Main /> },
        { path: "/search", element: <SearchResults /> },
        { path: "/search/movieId", element: <SearchResults /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
