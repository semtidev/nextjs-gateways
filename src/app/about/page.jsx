"use client"
import { useGateways } from "../../context/GatewaysContext"

function page() {
  const {gateways} = useGateways()

  return (
    <div>About page</div>
  )
}

export default page