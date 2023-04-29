"use client"
import { useGateways } from "../../context/GatewaysContext"

function page() {
  const {gateways} = useGateways()
  console.log(gateways)

  return (
    <div>About page</div>
  )
}

export default page