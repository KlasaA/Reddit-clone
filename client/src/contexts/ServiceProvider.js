import React, { createContext, useContext } from "react";
import {
  UserRouteService,
  PostRouteService,
  CommentRouteService,
  FavoriteRouteService,
  FollowedRouteService,
} from "../services";

const services = {
  userRouteService: new UserRouteService("users"),
  postRouteService: new PostRouteService("posts/"),
  commentRouteService: new CommentRouteService("comments/"),
  favoriteRouteService: new FavoriteRouteService("favorites/"),
  followedRouteService: new FollowedRouteService("following/"),
};

export const ServiceContext = createContext({ services: null });

export const ServiceProvider = ({ children }) => {
  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => useContext(ServiceContext);
