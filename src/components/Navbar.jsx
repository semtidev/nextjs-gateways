"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Navbar() {
  const router = useRouter();
  return (
    <header>
      <Link href="/">
        <h1>Gateways App</h1>
      </Link>

      <div>
        <button onClick={() => router.push("/new")}>Add Gateway</button>
      </div>
    </header>
  );
}
