import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { Login } from "./page/Login.tsx";
import { Register } from "./page/Register.tsx";
import { Profile } from "./page/Profile.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Profile />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <div>404</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
