import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/books/details/:id",
      element: <ShowBook />,
    },
    {
      path: "/books/create",
      element: <CreateBook />,
    },
    {
      path: "/books/edit/:id",
      element: <EditBook />,
    },
    {
      path: "/books/delete/:id",
      element: <DeleteBook />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
