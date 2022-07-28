import React, { createContext } from "react";
import { UserRouteService, PostRouteService } from "../services";

const services = {
  userRouteService: new UserRouteService("users"),
  postRouteService: new PostRouteService("posts"),
};

export const ServiceContext = createContext({ services: null });

export const ServiceProvider = ({ children }) => {
  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
