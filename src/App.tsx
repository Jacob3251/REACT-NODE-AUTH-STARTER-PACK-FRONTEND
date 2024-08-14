import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/auth/login",
      element: <Login></Login>,
    },
    {
      path: "/auth/register",
      element: <Register></Register>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
