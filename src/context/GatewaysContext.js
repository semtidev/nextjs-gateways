"use client";
import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useDevices } from "../hooks/useDevices";

export const GatewaysContext = createContext();

export const useGateways = () => {
  const context = useContext(GatewaysContext);
  if (!context) throw new Error("useGateways must used within a provider");
  return context;
};

export const GatewayProvider = ({ children }) => {
  const [gateways, setGateways] = useLocalStorage(
    "gateways",
    localStorage.getItem("gateways")
      ? JSON.parse(localStorage.getItem("gateways"))
      : []
  );
  const [devices, setDevices] = useDevices(0, []);
  const [counterDevices, setCounterDevices] = useState(0);

  // Create Gateway
  const createGateway = (name, ipv4, devices) => {
    let id_device = uuid();
    // Set devices gateway
    devices.map((device) => {
      if (device.gateway == 0) device.gateway = id_device;
    });
    setGateways([
      ...gateways,
      {
        name,
        ipv4,
        devices,
        id: id_device,
      },
    ]);
  };

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

  // Create Device
  const createDevice = (gateway, vendor, status) => {
    let id = uuid(),
      tempDate = new Date(),
      create_date =
        tempDate.getDate() +
        "/" +
        (tempDate.getMonth() + 1) +
        "/" +
        tempDate.getFullYear();

    setDevices([
      ...devices,
      {
        id: id,
        created_at: create_date,
        gateway,
        vendor,
        status,
      },
    ]);

    // Persist devices
    localStorage.setItem(
      "devices",
      JSON.stringify([
        ...devices,
        {
          id: id,
          created_at: create_date,
          gateway,
          vendor,
          status,
        },
      ])
    );
    localStorage.setItem(
      "counter_devices",
      [
        ...devices,
        {
          id: id,
          created_at: create_date,
          gateway,
          vendor,
          status,
        },
      ].length
    );

    const gatewayFound = gateways.find((item) => item.id === gateway);
    if (gatewayFound) {
      gatewayFound.devices.push({
        id: id,
        created_at: create_date,
        gateway,
        vendor,
        status,
      });
    }
  };

  // Delete Device
  const deleteDevice = (id, gateway) => {
    setDevices([...devices.filter((device) => device.id !== id)]);
    gateways.map((item) => {
      if (item.id == gateway) {
        let newValues = item.devices.filter((device) => device.id !== id);
        item.devices = newValues;
      }
    });
  };

  return (
    <GatewaysContext.Provider
      value={{
        gateways,
        createGateway,
        deleteGateway,
        updateGateway,
        devices,
        setDevices,
        createDevice,
        deleteDevice,
        counterDevices,
        setCounterDevices,
      }}
    >
      {children}
    </GatewaysContext.Provider>
  );
};
