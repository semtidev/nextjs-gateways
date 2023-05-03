"use client";
import { useGateways } from "../context/GatewaysContext";
import { GatewayCard } from "../components/GatewayCard";

function Page() {
  const { gateways } = useGateways();
  return (
    <div className="flex justify-center">
      <div className="w-7/12">
        {gateways.map((gateway) => (
          <GatewayCard gateway={gateway} key={gateway.id} />
        ))}
      </div>
    </div>
  );
}

export default Page;
