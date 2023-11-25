import { createBrowserRouter } from "react-router-dom";
import Todos from "./components/Todos";
import Main from "./routes/Main";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>Wrong URL or Error</h1>,
    children: [
      {
        path: "todo/:filterId",
        element: <Main />,
      },
    ],
  },
]);

export default router;
