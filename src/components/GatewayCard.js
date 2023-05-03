import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { useGateways } from "../context/GatewaysContext";
import { toast } from "react-hot-toast";

export const GatewayCard = ({ gateway }) => {
  const router = useRouter();
  const { deleteGateway } = useGateways();
  const [ showConfirm, setShowConfirm ] = useState(false);
  return (
    <Fragment>
      <div
        className="bg-gray-700 hover:bg-gray-600 rounded-sm cursor-pointer px-20 py-5 m-2 mb-4"
        onClick={() => router.push(`/edit/${gateway.id}`)}
      >
        <div className="flex justify-between">
          <h3 className="font-bold">{gateway.name}</h3>
          <button
            className="bg-red-600 hover:bg-red-700 rounded-sm px-3 py-1 inline-flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
          >
            Delete
          </button>
        </div>
        <p className="text-gray-300">{gateway.ipv4}</p>
        <span className="text-gray-400 text-xs">{gateway.id}</span>

        <hr className="border-gray-500 my-5" />

        <h3 className="text-blue-400 font-medium uppercase mb-4">
          Peripheral devices:
        </h3>

        {gateway.devices.map((device, key) => {
          return gateway.id == device.gateway ? (
            <div
              key={key}
              className="bg-blue-300 text-gray-900 rounded-sm mb-3 px-3 py-3"
            >
              <div className="flex w-full">
                <h3 className="font-bold">{device.vendor}</h3>
              </div>
              <span className="text-gray-600 text-xs">ID: {device.id}</span><br/>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600 text-xs">Created at: <strong className="font-extrabold">{device.created_at}</strong></span>
                <span className="text-gray-600 text-xs">Status: <strong className="font-extrabold">{device.status.toUpperCase()}</strong></span>
              </div>
            </div>
          ) : null;
        })}
      </div>
      {showConfirm ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowConfirm(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex">
                  <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-medium text-gray-800">
                      Delete gateway ?
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      This gateway and all its peripheral devices will be
                      Deleted. Confirm that you want to perform this operation.
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        onClick={() => {
                          setShowConfirm(false);
                          deleteGateway(gateway.id);
                          toast.success("Gateway deleted successfuly");
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={() => setShowConfirm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </Fragment>
  );
};
