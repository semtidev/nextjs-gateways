"use client";
import { useState, useEffect } from "react";
import { useGateways } from "../../context/GatewaysContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Modal } from "../../components/Modal";

function Page({ params }) {
  const {
    gateways,
    createGateway,
    updateGateway,
    devices,
    setDevices,
    deleteDevice,
    counterDevices,
    setCounterDevices,
  } = useGateways();
  const router = useRouter();
  const operation = params.id ? "Edit" : "New";
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Use this hooks for prevent page reload
  const [localDevices, setLocalDevices] = useState(devices);
  const [localCounter, setLocalCounter] = useState(counterDevices);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateGateway(params.id, data);
      toast.success("Gateway updated successfuly");
    } else {
      createGateway(data.name, data.ipv4, devices);
      toast.success("Gateway created successfuly");
    }
    router.push("/");
  });

  useEffect(() => {
    if (params.id) {
      const gatewayFound = gateways.find((gateway) => gateway.id === params.id);
      if (gatewayFound) {
        setValue("name", gatewayFound.name);
        setValue("ipv4", gatewayFound.ipv4);
        setDevices(gatewayFound.devices);
        setCounterDevices(gatewayFound.devices.length);
        console.log(gatewayFound.devices);
        // Persist devices
        localStorage.setItem("devices", JSON.stringify(gatewayFound.devices));
        localStorage.setItem("counter_devices", gatewayFound.devices.length);
        setLocalDevices(gatewayFound.devices);
        setLocalCounter(1);
      }
    }
  }, []);

  useEffect(() => {
    if (params.id) {
      const gatewayFound = gateways.find((gateway) => gateway.id === params.id);
      if (gatewayFound) {
        // Persist devices
        localStorage.setItem("devices", JSON.stringify(gatewayFound.devices));
        localStorage.setItem("counter_devices", gatewayFound.devices.length);
        setLocalDevices(gatewayFound.devices);
        setLocalCounter(gatewayFound.devices.length);
      }
    } else {
      if (localStorage.getItem("devices")) {
        setLocalDevices(JSON.parse(localStorage.getItem("devices")));
        setLocalCounter(parseInt(localStorage.getItem("counter_devices")));
      }
      else {
        setLocalDevices([]);
        setLocalCounter(0);
      }
    }
  }, [devices]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={onSubmit}
        className="bg-gray-700 p-10 w-3/12 max-h-screen overflow-y-auto"
      >
        <h2 className="text-center font-bold mb-4">{operation} Gateway</h2>
        <input
          className="bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full"
          type="text"
          placeholder="Write a name"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-red-400 block mb-2">
            This field is required
          </span>
        )}

        <input
          className="bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full"
          type="text"
          placeholder="Write a IPv4"
          {...register("ipv4", {
            required: {
              value: true,
              message: "This field is required",
            },
            pattern: {
              value:
                /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
              message: "This is not a valid IPv4",
            },
          })}
        />
        {errors.ipv4 && (
          <span className="text-red-400 block mb-3">{errors.ipv4.message}</span>
        )}

        <hr className="border-gray-500 my-5" />

        <h3 className="text-blue-400 font-medium uppercase mb-4">
          Peripheral devices ({localCounter}):
        </h3>

        {localDevices.map((device, key) => {
          let id_gateway = params.id ? params.id : 0;
          return id_gateway == device.gateway ? (
            <div
              key={key}
              className="bg-blue-200 text-gray-900 rounded-sm mb-3 px-3 py-3"
              onClick={() => toast.success("Edit mode")}
            >
              <div className="flex justify-between w-full">
                <h3 className="font-bold">{device.vendor}</h3>
                <button
                  className="bg-red-500 hover:bg-red-600 text-gray-200 rounded-sm px-3 py-1 inline-flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteDevice(device.id, device.gateway);
                    setCounterDevices(counterDevices - 1);
                  }}
                >
                  Delete
                </button>
              </div>
              <span className="text-gray-600 text-xs">ID: {device.id}</span><br/>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600 text-xs">Created at: <strong className="font-extrabold">{device.created_at}</strong></span>
                <span className="text-gray-600 text-xs">Status: <strong className="font-extrabold">{device.status.toUpperCase()}</strong></span>
              </div>
              
            </div>
          ) : null;
        })}

        <button
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-400 text-white px-4 py-2 mb-5 rounded-sm block w-full"
          disabled={
            parseInt(localStorage.getItem("counter_devices")) > 9 ? true : false
          }
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          Add peripheral device
        </button>

        <hr className="border-gray-500 my-6" />

        <div className="flex justify-between">
          <button
            className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-sm block w-full mr-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push("/");
            }}
          >
            Cancel
          </button>
          <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-sm block w-full">
            Save
          </button>
        </div>
      </form>
      {showModal && <Modal params={params} setOpenModal={setShowModal} />}
    </div>
  );
}

export default Page;
