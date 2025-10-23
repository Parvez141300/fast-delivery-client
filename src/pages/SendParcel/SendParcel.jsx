import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import serviceBranches from "../../assets/service-branches/service-branches.json";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

const uniqueRegions = Array.from(
  new Set(serviceBranches.map((sb) => sb.region))
);

const SendParcel = () => {
  const { user } = useAuth();
  const [senderServiceCenter, setSenderServiceCenter] = useState([]);
  const [receiverServiceCenter, setReceiverServiceCenter] = useState([]);
  const axiosInstance = useAxios();
  //   react hook form
  const {
    register,
    unregister,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  //   hook form watch
  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  //   unregister weight field when it's parcel type is document
  useEffect(() => {
    if (parcelType === "document") {
      unregister("weight");
    }
  }, [parcelType]);

  //   filter sender service center district filtered by region
  useEffect(() => {
    if (senderRegion) {
      const filter = serviceBranches.filter(
        (serviceBranch) => serviceBranch.region === senderRegion
      );
      const district = filter.map((f) => f.district);
      setSenderServiceCenter(district);
    }
  }, [senderRegion]);

  //   filter receiver service center district filtered by region
  useEffect(() => {
    if (receiverRegion) {
      const filter = serviceBranches.filter(
        (serviceBranch) => serviceBranch.region === receiverRegion
      );
      const district = filter.map((f) => f.district);
      setReceiverServiceCenter(district);
    }
  }, [receiverRegion]);

  //   calculate cost function
  const calculateCost = (data) => {
    let baseCost = 0;
    let weightCost = 0;
    let regionCost = 0;
    if (data?.parcelType === "document") {
      baseCost += 60;
    } else {
      baseCost += 80;
      if (parseFloat(data?.weight) <= 3) {
        weightCost += 20;
      } else if (parseFloat(data?.weight) <= 5) {
        weightCost += 30;
      } else {
        weightCost = 20 * parseFloat(data?.weight);
      }
    }
    if (data?.senderRegion === receiverRegion) {
      regionCost += 110;
    } else {
      regionCost += 150;
    }
    const totalCost = baseCost + weightCost + regionCost;
    return {
      total: totalCost,
      breakDown: {
        baseCost,
        weightCost,
        regionCost,
      },
    };
  };

  //   submit form
  const onSubmit = (data) => {
    const cost = calculateCost(data);
    const costCalculation = calculateCost(data);

    // alert for showing the details of the delivery cost
    Swal.fire({
      title: "🎁 Delivery Cost Calculation",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm & Submit",
      cancelButtonText: "Cancel",
      preConfirm: () => confirmParcel(data, costCalculation.total),
      html: `
        <div className="space-y-5">
            <div class="flex justify-center">
                ${
                  data?.senderRegion === data?.receiverRegion
                    ? `<span class="font-semibold">Same Region</span>`
                    : `<span class="font-semibold">Outside Region</span>`
                }
            </div>
            <div class="flex justify-between">
              <span>Base Cost (${
                data.parcelType === "document" ? "Document" : "Non-Document"
              }):</span>
              <span class="font-semibold">৳${
                costCalculation?.breakDown?.baseCost
              }</span>
            </div>
            ${
              data.parcelType === "non-document"
                ? `
            <div class="flex justify-between">
              <span>Weight Charge (${data.weight}kg):</span>
              <span class="font-semibold">৳${costCalculation?.breakDown?.weightCost}</span>
            </div>
            `
                : ""
            }

            ${
              costCalculation?.breakDown?.regionCost > 0
                ? `
                <div class="flex justify-between items-center">
                    <span>Region Delivery:</span>
                    <span class="font-semibold">৳${costCalculation?.breakDown?.regionCost}</span>
                </div>
                `
                : ""
            }
           

            <hr class="my-3">
            <div class="flex justify-between items-center text-lg font-bold text-primary">
              <span>Total Cost:</span>
              <span>৳${costCalculation.total}</span>
            </div>
        </div>
        `,
    });
  };

  // confirm parcel to save to the mongodb database
  const confirmParcel = (data, amount) => {
    const parcelData = {
      ...data,
      amount,
      createdBy: user?.email,
      creationDate: new Date().toISOString(),
      status: "pending",
      paymentStatus: "unpaid",
      trackingId: `TRK-${Date.now()}`,
    };
    axiosInstance.post("/parcels", parcelData).then((res) => {
      if (res.data.insertedId) {
        console.log("data ", parcelData);
        Swal.fire({
          title: "Successfully Added Parcel",
          icon: "success",
          draggable: true,
        });
        reset();
      }
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Send Parcel</h1>
        <p className="text-gray-600 mt-2">
          Fast and reliable door-to-door delivery service
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* parcel title, type, weight */}
        <div className="bg-primary/50 p-5 rounded-lg">
          <h2 className="text-xl mb-4">📦 Parcel Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Parcel Type */}
            <div>
              <label className="label">
                <span className="label-text">Parcel Type *</span>
              </label>
              <select
                className="select w-full focus-within:outline-0"
                {...register("parcelType", {
                  required: "Parcel type is required",
                })}
              >
                <option value="">Select Parcel Type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
              {errors.parcelType && (
                <span className="text-red-500 text-sm">
                  {errors.parcelType.message}
                </span>
              )}
            </div>

            {/* Parcel Title */}
            <div>
              <label className="label">
                <span className="label-text">Parcel Title *</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Important Documents, Electronics"
                className="input focus-within:outline-0 w-full"
                {...register("title", { required: "Parcel title is required" })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Weight (only for non-document) */}
            {parcelType === "non-document" && (
              <div>
                <label className="label">
                  <span className="label-text">
                    Weight (kg) {parcelType === "non-document" && "*"}
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="0.5"
                  step="0.1"
                  min="0.1"
                  className="input focus-within:outline-0 w-full"
                  disabled={parcelType !== "non-document"}
                  {...register("weight", {
                    required:
                      parcelType === "non-document"
                        ? "Weight is required for non-documents"
                        : false,
                    min: {
                      value: 0.1,
                      message: "Weight must be at least 0.1kg",
                    },
                  })}
                />
                {errors.weight && (
                  <span className="text-red-500 text-sm">
                    {errors.weight.message}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        {/* parcel sender and receiver info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-primary/50 p-5 rounded-lg">
          {/* sender information */}
          <div>
            <h2 className="text-xl mb-4">👤 Sender Information</h2>
            {/* sender name field */}
            <div>
              <label className="label">Sender Name *</label>
              <input
                type="text"
                placeholder="Your full name"
                className="input focus-within:outline-0 w-full"
                {...register("senderName", {
                  required: "Sender name is required",
                })}
              />
              {errors.senderName && (
                <span className="text-red-500 text-sm">
                  {errors.senderName.message}
                </span>
              )}
            </div>
            {/* sender contact field */}
            <div>
              <label className="label">Sender Contact *</label>
              <input
                type="tel"
                placeholder="+8801XXXXXXXXX"
                className="input focus-within:outline-0 w-full"
                {...register("senderContact", {
                  required: "Contact number is required",
                })}
              />
              {errors.senderContact && (
                <span className="text-red-500 text-sm">
                  {errors.senderContact.message}
                </span>
              )}
            </div>
            {/* sender region & service district */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* region field */}
              <div>
                <label className="label">Sender Region *</label>
                <select
                  className="select focus-within:outline-0 w-full"
                  {...register("senderRegion", {
                    required: "Region is required",
                  })}
                >
                  <option value="">Select Region</option>
                  {uniqueRegions.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.senderRegion && (
                  <span className="text-red-500 text-sm">
                    {errors.senderRegion.message}
                  </span>
                )}
              </div>
              {/* service center */}
              <div>
                <label className="label">Sender Service Center *</label>
                <br />
                <select
                  className="select focus-within:outline-0 w-full"
                  {...register("senderServiceDistrictCenter", {
                    required: "Sender Service Center is required",
                  })}
                  disabled={!senderRegion}
                >
                  <option value="">Select District</option>
                  {senderServiceCenter.map((center, index) => (
                    <option key={index} value={center}>
                      {center}
                    </option>
                  ))}
                </select>
                {errors.senderServiceDistrictCenter && (
                  <span className="text-red-500 text-sm">
                    {errors.senderServiceDistrictCenter.message}
                  </span>
                )}
              </div>
            </div>
            {/* sender Address */}
            <div>
              <label className="label">Sender Pickup Address *</label>
              <textarea
                placeholder="Full pickup address with details"
                className="textarea focus-within:outline-0 h-20 w-full"
                {...register("senderAddress", {
                  required: "Pickup address is required",
                })}
              />
              {errors.senderAddress && (
                <span className="text-red-500 text-sm">
                  {errors.senderAddress.message}
                </span>
              )}
            </div>
          </div>

          {/* receiver information */}
          <div>
            <h2 className="text-xl mb-4">👥 Receiver Information</h2>
            {/* receiver name field */}
            <div>
              <label className="label">Receiver Name *</label>
              <input
                type="text"
                placeholder="Receiver's full name"
                className="input focus-within:outline-0 w-full"
                {...register("receiverName", {
                  required: "Receiver name is required",
                })}
              />
              {errors.receiverName && (
                <span className="text-red-500 text-sm">
                  {errors.receiverName.message}
                </span>
              )}
            </div>
            {/* receiver contact field */}
            <div>
              <label className="label">Receiver Contact *</label>
              <input
                type="tel"
                placeholder="Receiver's full name"
                className="input focus-within:outline-0 w-full"
                {...register("receiverContact", {
                  required: "Receiver name is required",
                })}
              />
              {errors.receiverContact && (
                <span className="text-red-500 text-sm">
                  {errors.receiverContact.message}
                </span>
              )}
            </div>
            {/* receiver region and service district */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* receiver region */}
              <div>
                <label className="label">Receiver Region *</label>
                <select
                  className="select focus-within:outline-0 w-full"
                  {...register("receiverRegion", {
                    required: "Receiver region is required",
                  })}
                >
                  <option value="">Select Region</option>
                  {uniqueRegions.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.receiverRegion && (
                  <span className="text-red-500 text-sm">
                    {errors.receiverRegion.message}
                  </span>
                )}
              </div>
              {/* receiver district */}
              <div>
                <label className="label">Receiver Service Center *</label>
                <select
                  className="select focus-within:outline-0 w-full"
                  {...register("receiverServiceDistrictCenter", {
                    required: "Receiver region is required",
                  })}
                  disabled={!receiverRegion}
                >
                  <option value="">Select Region</option>
                  {receiverServiceCenter.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.receiverServiceDistrictCenter && (
                  <span className="text-red-500 text-sm">
                    {errors.receiverServiceDistrictCenter.message}
                  </span>
                )}
              </div>
            </div>
            {/* receiver Address */}
            <div>
              <label className="label">Receiver Delivery Address *</label>
              <textarea
                placeholder="Full delivery address with details"
                className="textarea focus-within:outline-0 h-20 w-full"
                {...register("receiverAddress", {
                  required: "Delivery address is required",
                })}
              />
              {errors.receiverAddress && (
                <span className="text-red-500 text-sm">
                  {errors.receiverAddress.message}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Submit Button & reset button */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => reset()}
            type="button"
            className="btn btn-primary btn-outline"
          >
            🔄️ Reset
          </button>
          <button type="submit" className="btn btn-primary">
            🚚 Calculate & Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
