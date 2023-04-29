import { useRouter } from "next/navigation";

export const GatewayCard = ({ gateway }) => {
  const router = useRouter();
  return (
    <div
      style={{ background: "#202020", color: "white" }}
      onClick={() => router.push(`/edit/${gateway.id}`)}
    >
      <h3>{gateway.title}</h3>
      <button>Delete</button>
      <p>{gateway.description}</p>
    </div>
  );
};
