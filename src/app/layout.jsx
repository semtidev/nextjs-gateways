import { Navbar } from "@/components/Navbar";
import { GatewayProvider } from "../context/GatewaysContext";
import "./globals.css";

export const metadata = {
  title: "Gateways App",
  description: "Generated by manage gateways devices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GatewayProvider>
          <Navbar/>
          {children}
        </GatewayProvider>
      </body>
    </html>
  );
}
