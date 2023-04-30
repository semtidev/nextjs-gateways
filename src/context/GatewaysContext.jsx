"use client";
import { createContext, useContext } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const GatewaysContext = createContext();

export const useGateways = () => {
  const context = useContext(GatewaysContext);
  if (!context) throw new Error("useGateways must used within a provider");
  return context;
};

export const GatewayProvider = ({ children }) => {
  const [gateways, setGateways] = useLocalStorage("gateways", []);

  // Create Gateway
  const createGateway = (title, description) =>
    setGateways([
      ...gateways,
      {
        title,
        description,
        id: uuid(),
      },
    ]);

  // Delete Gateway
  const deleteGateway = (id) =>
    setGateways([...gateways.filter((gateway) => gateway.id !== id)]);

  // Update Gateway
  const updateGateway = (id, newData) =>
    setGateways([
      ...gateways.map((gateway) =>
        gateway.id === id ? { ...gateway, ...newData } : gateway
      ),
    ]);

  return (
    <GatewaysContext.Provider
      value={{ gateways, createGateway, deleteGateway, updateGateway }}
    >
      {children}
    </GatewaysContext.Provider>
  );
};
