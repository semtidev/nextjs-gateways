"use client";
import { useState, useEffect } from "react";
import { useGateways } from "../../context/GatewaysContext";
import { useRouter } from "next/navigation";

function Page({ params }) {
  const [gateway, setGateway] = useState({
    title: "",
    description: "",
  });
  const { gateways, createGateway, updateGateway } = useGateways();
  const router = useRouter();

  const handleChange = (e) =>
    setGateway({ ...gateway, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      updateGateway(params.id, gateway);
    } else {
      createGateway(gateway.title, gateway.description);
    }
    router.push("/");
  };

  useEffect(() => {
    if (params.id) {
      const gatewayFound = gateways.find((gateway) => gateway.id === params.id);
      if (gatewayFound)
        setGateway({
          title: gatewayFound.title,
          description: gatewayFound.description,
        });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Write a title"
        value={gateway.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        rows="10"
        placeholder="Write a description"
        value={gateway.description}
        onChange={handleChange}
      ></textarea>
      <button>Save</button>
    </form>
  );
}

export default Page;
