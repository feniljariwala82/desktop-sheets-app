import HomePage from "pages/Home";
import { createMemoryRouter } from "react-router-dom";
import "styles/App.scss";

const router = createMemoryRouter(
  [
    {
      path: "home",
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
  ],
  {
    initialEntries: ["/home"],
  }
);

export default router;
