import { useState, useEffect } from "react";
//import { useGateways } from "../context/GatewaysContext";

export function useDevices(gateway_id, initialState) {
  const [devices, setDevices] = useState(initialState);
  //const gateways } = useGateways();

  // Load devices data from gateway
  useEffect(() => {
    if (gateway_id > 0) {
        const item = localStorage.getItem("gateways");
        const gateway = JSON.parse(item).find((gateway) => gateway.id === gateway_id);
        if (gateway) {
            setDevices([]);
        }
    }
    else {
        setDevices([]);
    }
  }, []);

  return [devices, setDevices];
}
