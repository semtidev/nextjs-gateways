import { Navbar } from "@/components/Navbar";
import { GatewayProvider } from "../context/GatewaysContext";
import { Toaster } from "./Toaster";
import { Layout } from "../components/Layout";
import "./globals.css";

export const metadata = {
  title: "Gateways App",
  description: "Generated by manage gateways",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <GatewayProvider>
          <Navbar />
          <Layout>{children}</Layout>
          <Toaster />
        </GatewayProvider>
      </body>
    </html>
  );
}