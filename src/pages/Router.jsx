import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "./Mian";
import NotFound from './NotFound'
import Modal from "../components/Modal";


export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <Main /> },
                {path : '/:category/:movieId', element : <Main/>}
            ]
        }
    ])
    return <RouterProvider router={router} />
}