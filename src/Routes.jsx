import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import InstagramMessages from "pages/InstagramMessages";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
    {
      path: "instagrammessages",
      element: <InstagramMessages />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
