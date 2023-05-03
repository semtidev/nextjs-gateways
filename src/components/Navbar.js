"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGateways } from "../context/GatewaysContext";

export function Navbar() {
  const router = useRouter();
  const { gateways } = useGateways()
  return (
    <header className="flex justify-between items-center bg-gray-800 px-28 py-3">
      <Link href="/">
        <h1 className="font-bold text-3xl text-white">
            Gateways App
            <span className="text-sm ml-5 text-slate-300">{ gateways.length } gateways</span>
        </h1>
      </Link>

      <div>
        <button
          className="bg-green-600 hover:bg-green-700 px-5 py-2 text-gray-50 font-bold rounded-sm inline-flex items-center"
          onClick={() => router.push("/new")}
        >
          Add Gateway
        </button>
      </div>
    </header>
  );
}
