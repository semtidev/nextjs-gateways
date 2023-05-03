import { useState, useEffect } from "react";
import { useGateways } from "../context/GatewaysContext";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export const Modal = ({ params, setOpenModal }) => {
  const {
    gateways,
    createGateway,
    updateGateway,
    devices,
    createDevice,
    counterDevices,
    setCounterDevices,
  } = useGateways();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    createDevice(data.gateway, data.vendor, data.status);
    setOpenModal(false);
    toast.success("Device created successfuly");
    setCounterDevices(counterDevices + 1);
  });

  useEffect(() => {
    if (params.id) {
      const gatewayFound = gateways.find((gateway) => gateway.id === params.id);
      if (gatewayFound) {
        setValue("gateway", gatewayFound.id);
      }
    } else {
      setValue("gateway", 0);
    }
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div>
              <form onSubmit={onSubmit} className="p-5">
                <h2 className="text-center text-gray-800 font-bold mb-4">
                  New Device
                </h2>

                <input type="hidden" {...register("gateway", {})} />

                <input
                  className="bg-gray-100 text-gray-900 py-3 px-4 mb-2 block focus:outline-none w-full"
                  type="text"
                  placeholder="Write a vendor"
                  {...register("vendor", { required: true })}
                />
                {errors.vendor && (
                  <span className="text-red-400 block mb-2">
                    This field is required
                  </span>
                )}

                <div className="flex py-3 px-4 mb-2">
                  <label className="float-left text-gray-800">Online</label>
                  <input
                    className="ml-2"
                    type="radio"
                    {...register("status", {})}
                    value={'online'}
                  />
                  <label className="float-left text-gray-800 ml-5">Offline</label>
                  <input
                    className="ml-2"
                    type="radio"
                    {...register("status", {})}
                    value={'offline'}
                  />
                </div>

                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-sm block w-full">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
