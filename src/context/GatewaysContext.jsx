"use client";
import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const GatewaysContext = createContext();

export const useGateways = () => {
  const context = useContext(GatewaysContext);
  if (!context) throw new Error("useGateways must used within a provider");
  return context;
};

export const GatewayProvider = ({ children }) => {
  const [gateways, setGateways] = useState([
    {
      id: 1,
      title: "Gateway 1",
      description: "This is the gateway 1.",
    },
    {
      id: 2,
      title: "Gateway 2",
      description: "This is the gateway 2.",
    },
    {
      id: 3,
      title: "Gateway 3",
      description: "This is the gateway 3.",
    },
  ]);
  const createGatewy = (title, description) =>
    setGateways([
      ...gateways,
      {
        title,
        description,
        id: uuid()
      },
    ]);

  return (
    <GatewaysContext.Provider value={{ gateways, createGatewy }}>
      {children}
    </GatewaysContext.Provider>
  );
};
