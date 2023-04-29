"use client";
import { useState } from "react";
import { useGateways } from "../../context/GatewaysContext";
import { useRouter } from "next/navigation";

function Page() {
  const [gateway, setGateway] = useState();
  const { createGatewy } = useGateways();
  const router = useRouter();

  const handleChange = (e) =>
    setGateway({ ...gateway, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createGatewy(gateway.title, gateway.description);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Write a title"
        onChange={handleChange}
      />
      <textarea
        name="description"
        rows="10"
        placeholder="Write a description"
        onChange={handleChange}
      ></textarea>
      <button>Save</button>
    </form>
  );
}

export default Page;
