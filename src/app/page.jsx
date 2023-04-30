"use client";
import { useGateways } from "../context/GatewaysContext";
import { GatewayCard } from "../components/GatewayCard";

function Page() {
  const { gateways } = useGateways();
  return (
    <div>
      {gateways.map((gateway) => (
        <GatewayCard gateway={gateway} key={gateway.id} />
      ))}
    </div>
  );
}

export default Page;
