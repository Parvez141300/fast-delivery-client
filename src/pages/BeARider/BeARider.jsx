import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import riderAnimation from "../../assets/LottieFiles/riderLottie.json"; // You'll need to add this Lottie file
import {
  FaUser,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaUpload,
} from "react-icons/fa";

// Import your regions data (same as in SendParcel)
import serviceBranches from "../../assets/service-branches/service-branches.json";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [districts, setDistricts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drivingLicensePreview, setDrivingLicensePreview] = useState(null);
  const [bikePapersPreview, setBikePapersPreview] = useState(null);

  const uniqueRegions = Array.from(
    new Set(serviceBranches.map((sb) => sb.region))
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
  });

  // Handle region change
  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setValue("region", region);

    if (region) {
      const filteredDistricts = serviceBranches
        .filter((branch) => branch.region === region)
        .map((branch) => branch.district);
      setDistricts(filteredDistricts);
    } else {
      setDistricts([]);
    }
  };

  // Handle file upload preview
  const handleFilePreview = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Upload files to Cloudinary
      const uploadPreset = "fast-delivery-images";
      const cloudName = "dapbx8al2";

      const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("cloud_name", cloudName);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        return await res.json();
      };

      // Upload driving license and bike papers
      const [drivingLicenseData, bikePapersData] = await Promise.all([
        data.drivingLicense[0] ? uploadFile(data.drivingLicense[0]) : null,
        data.bikePapers[0] ? uploadFile(data.bikePapers[0]) : null,
      ]);

      const riderData = {
        ...data,
        userId: user?.uid,
        userEmail: user?.email,
        drivingLicenseUrl: drivingLicenseData?.secure_url,
        bikePapersUrl: bikePapersData?.secure_url,
        status: "pending", // pending, approved, rejected
        applicationDate: new Date().toISOString(),
        role: "rider-applicant",
      };

      // Save to database
      const response = await axiosSecure.post("/riders/apply", riderData);

      if (response.data.success) {
        toast.success("Rider application submitted successfully!", {
          position: "top-center",
        });
        reset();
        setSelectedRegion("");
        setDistricts([]);
        setDrivingLicensePreview(null);
        setBikePapersPreview(null);
      }
    } catch (error) {
      console.error("Application error:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold  flex items-center justify-center gap-3">
            <FaMotorcycle className="text-primary" />
            Become a Rider
          </h1>
          <p className="text-primary mt-2">
            Join our team of delivery riders and start earning today!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div className="bg-base-300 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-primary mb-6">
              Rider Application Form
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary flex items-center gap-2">
                  <FaUser className="text-primary" />
                  Personal Information
                </h3>

                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name *</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="input w-full focus-within:outline-0"
                      readOnly
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email *</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary">
                      @
                    </span>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="input w-full focus-within:outline-0"
                      readOnly
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Age & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Age */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Age *</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="18"
                        min="18"
                        max="65"
                        className="input w-full focus-within:outline-0"
                        {...register("age", {
                          required: "Age is required",
                          min: {
                            value: 18,
                            message: "Must be at least 18 years old",
                          },
                          max: {
                            value: 65,
                            message: "Must be under 65 years old",
                          },
                        })}
                      />
                    </div>
                    {errors.age && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.age.message}
                      </span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone Number *</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+8801XXXXXXXXX"
                        className="input w-full focus-within:outline-0"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^\+8801[3-9]\d{8}$/,
                            message: "Please enter a valid Bangladeshi number",
                          },
                        })}
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* National ID */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      National ID Card Number *
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your NID number"
                      className="input w-full focus-within:outline-0"
                      {...register("nationalId", {
                        required: "National ID is required",
                        pattern: {
                          value: /^\d{10,17}$/,
                          message: "Please enter a valid National ID number",
                        },
                      })}
                    />
                  </div>
                  {errors.nationalId && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.nationalId.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Location Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  Service Area
                </h3>

                {/* Region & District */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Region */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Region *</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      onChange={handleRegionChange}
                      value={selectedRegion}
                    >
                      <option value="">Select Region</option>
                      {uniqueRegions.map((region, index) => (
                        <option key={index} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                    {errors.region && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.region.message}
                      </span>
                    )}
                  </div>

                  {/* District */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">District *</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      disabled={!selectedRegion}
                      {...register("district", {
                        required: "District is required",
                      })}
                    >
                      <option value="">Select District</option>
                      {districts.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.district.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Vehicle Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                  <FaMotorcycle className="text-primary" />
                  Vehicle Information
                </h3>

                {/* Bike Registration Number */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Bike Registration Number *
                    </span>
                  </label>
                  <div className="relative">
                    <FaMotorcycle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., DHAKA-METRO-GA-11-1234"
                      className="input w-full focus-within:outline-0 uppercase"
                      {...register("bikeRegistration", {
                        required: "Bike registration number is required",
                      })}
                    />
                  </div>
                  {errors.bikeRegistration && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.bikeRegistration.message}
                    </span>
                  )}
                </div>

                {/* Bike CC */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Bike Engine Capacity (CC) *
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("bikeCC", {
                      required: "Bike CC is required",
                    })}
                  >
                    <option value="">Select CC</option>
                    <option value="100">100 CC</option>
                    <option value="110">110 CC</option>
                    <option value="125">125 CC</option>
                    <option value="135">135 CC</option>
                    <option value="150">150 CC</option>
                    <option value="165">165 CC</option>
                    <option value="200">200 CC</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.bikeCC && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.bikeCC.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Document Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <FaShieldAlt className="text-primary" />
                  Required Documents
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Driving License */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Driving License *</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="file-input focus-within:outline-0 w-full"
                      {...register("drivingLicense", {
                        required: "Driving license is required",
                      })}
                      onChange={(e) =>
                        handleFilePreview(e, setDrivingLicensePreview)
                      }
                    />
                    {drivingLicensePreview && (
                      <div className="mt-2">
                        <img
                          src={drivingLicensePreview}
                          alt="Driving License Preview"
                          className="w-32 h-32 object-cover rounded border"
                        />
                      </div>
                    )}
                    {errors.drivingLicense && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.drivingLicense.message}
                      </span>
                    )}
                  </div>

                  {/* Bike Registration Papers */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Bike Registration Papers *
                      </span>
                    </label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="file-input focus-within:outline-0 w-full"
                      {...register("bikePapers", {
                        required: "Bike papers are required",
                      })}
                      onChange={(e) =>
                        handleFilePreview(e, setBikePapersPreview)
                      }
                    />
                    {bikePapersPreview && (
                      <div className="mt-2">
                        <img
                          src={bikePapersPreview}
                          alt="Bike Papers Preview"
                          className="w-32 h-32 object-cover rounded border"
                        />
                      </div>
                    )}
                    {errors.bikePapers && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.bikePapers.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Delivery Experience (Years)
                  </span>
                </label>
                <select
                  className="select focus-within:outline-0 w-full"
                  {...register("experience")}
                >
                  <option value="0">No experience</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>

              {/* Availability */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Weekly Availability (Hours) *
                  </span>
                </label>
                <select
                  className="select focus-within:outline-0 w-full"
                  {...register("availability", {
                    required: "Availability is required",
                  })}
                >
                  <option value="">Select hours per week</option>
                  <option value="20">20 hours</option>
                  <option value="30">30 hours</option>
                  <option value="40">40 hours</option>
                  <option value="50">50+ hours</option>
                </select>
                {errors.availability && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.availability.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg w-full"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <FaUpload />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Lottie Animation */}
          <div className="bg-base-300 rounded-lg shadow-lg p-6 flex flex-col justify-center">
            <div className="text-center">
              <Lottie
                animationData={riderAnimation}
                loop={true}
                className="max-w-md mx-auto"
              />
              <h3 className="text-xl font-semibold text-primary mt-4">
                Join Our Rider Team!
              </h3>
              <div className="text-primary mt-4 space-y-2 text-left">
                <p>✅ Flexible working hours</p>
                <p>✅ Competitive earnings</p>
                <p>✅ Weekly payments</p>
                <p>✅ Supportive community</p>
                <p>✅ Growth opportunities</p>
              </div>
              <div className="mt-6 p-4 bg-base-200 rounded-lg">
                <p className="text-sm text-accent">
                  <strong>Note:</strong> Your application will be reviewed
                  within 2-3 business days. You'll receive an email notification
                  once it's processed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeARider;
