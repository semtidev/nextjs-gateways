import { useRouter } from "next/navigation";
import { useGateways } from "../context/GatewaysContext";

export const GatewayCard = ({ gateway }) => {
  const router = useRouter();
  const { deleteGateway } = useGateways();
  return (
    <div
      style={{ background: "#202020", color: "white" }}
      onClick={() => router.push(`/edit/${gateway.id}`)}
    >
      <h3>{gateway.title}</h3>
      <button
        onClick={(e) => {
          e.stopPropagation();
          const confirm = window.confirm("Are you sure Delete this gateway?");
          if (confirm) deleteGateway(gateway.id);
        }}
      >
        Delete
      </button>
      <p>{gateway.description}</p>
    </div>
  );
};
