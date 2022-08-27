import React, { createContext } from "react";
import {
  UserRouteService,
  PostRouteService,
  CommentRouteService,
} from "../services";

const services = {
  userRouteService: new UserRouteService("users"),
  postRouteService: new PostRouteService("posts/"),
  commentRouteService: new CommentRouteService("comments/"),
};

export const ServiceContext = createContext({ services: null });

export const ServiceProvider = ({ children }) => {
  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
