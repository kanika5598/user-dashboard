"use client";

import { useState, useEffect } from "react";
import { FaUserPlus, FaSave, FaBan } from "react-icons/fa";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/app/components/HeaderComponent";
import ErrorCard from "@/app/components/ErrorCard";

const AddUserComponent = ({ userData, userId, editError }) => {
  const [formData, setFormData] = useState({
    user: userData?.username || "",
    email: userData?.email || "",
    age: userData?.age || "",
    mobile: userData?.mobile || "",
    interest: userData?.interest || "",
  });

  const [errors, setErrors] = useState({
    user: "",
    email: "",
    age: "",
    mobile: "",
  });
  const [touched, setTouched] = useState({
    user: false,
    email: false,
    age: false,
    mobile: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(!!userId && !userData); // Loading only if userId exists and user data is not present
  const [isRedirectingToDashboard, setredirectingToDashboard] = useState(false);
  const router = useRouter();

  const isEditMode = !!userId;

  useEffect(() => {
    // Validate the form whenever formData changes
    validateForm();
  }, [formData, touched]); // Include touched as a dependency

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "user":
        if (!value && touched.user) {
          error = "Username is required";
        } else if (value && (value.length < 2 || value.length > 50)) {
          error = "Username must be between 2 and 50 characters";
        }
        break;
      case "email":
        if (!value && touched.email) {
          error = "Email is required";
        } else if (
          value &&
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        ) {
          error = "Email must be a valid email address";
        }
        break;
      case "age":
        if (
          value &&
          (!Number.isInteger(Number(value)) ||
            Number(value) <= 0 ||
            Number(value) >= 150)
        ) {
          error = "Age must be a valid integer between 0 and 149";
        }
        break;
      case "mobile":
        if (!value && touched.mobile) {
          error = "Mobile number is required";
        } else if (value && !/^[0-9]{10}$/.test(value)) {
          error = "Mobile number must be a 10-digit number";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    for (const field in formData) {
      newErrors[field] = validateField(field, formData[field]);
    }
    setErrors(newErrors);

    // Check if there are any errors in the entire form
    setIsFormValid(!Object.values(newErrors).some((error) => error));
  };

  useEffect(() => {
    //If user details are present, set the formData with the user details
    if (userData) {
      setFormData({
        user: userData?.username || "",
        email: userData?.email || "",
        age: userData?.age || "",
        mobile: userData?.mobile || "",
        interest: userData?.interest || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Validate this field immediately
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //Removed the event listener

    try {
      const interestArray =
        formData && formData.interest && !Array.isArray(formData.interest)
          ? formData.interest.split(",").map((s) => s.trim())
          : formData && formData.interest || []; // Split and trim interests
      const payload = {
        username: formData.user,
        email: formData.email,
        age: formData.age ? parseInt(formData.age) : null, // Convert age to number or null
        mobile: parseInt(formData.mobile), // Convert mobile to number
        interest: interestArray, // Use the array of strings
      };
      if (!isRedirectingToDashboard) {
        const requestMethod = isEditMode ? "PATCH" : "POST";
        const requestUri = isEditMode ? `/edit-user/${userId}` : "/add-user";
        const response = await fetch(`/api${requestUri}`, {
          method: requestMethod,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message ||
              `Failed to ${isEditMode ? "update" : "add"} user!`
          );
        }

        setSuccessMessage(
          `User ${isEditMode ? "updated" : "added"} successfully!`
        );
        setErrorMessage(null);
      }
      // router.push("/");
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage(error.message);
    }
  };

  const handleCancel = () => {
    setredirectingToDashboard(true);
    router.push("/");
  };
  const title = isEditMode ? "Edit User" : "Add User";
  const buttonIcon = isEditMode ? (
    <FaSave className="mr-2" />
  ) : (
    <FaUserPlus className="mr-1" />
  );

  return (
    <div className="container mx-auto w-full">
      <HeaderComponent />
      {loading ? (
        <p className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          Loading user details..
        </p>
      ) : editError ? (
        <ErrorCard />
      ) : (
        <div className="flex justify-center">
          <div className="w-full max-w-xl bg-white p-6 rounded-md shadow-md ">
            <div className="text-cyan-700 text-md font-bold text-center">
              {title}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="user"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`mt-1 w-full bg-gray-50 border-gray-700 shadow-sm md:text-sm px-2 py-1 ${
                    errors.user && touched.user ? "border-red-500" : ""
                  }`}
                />
                {errors.user && touched.user && (
                  <p className="text-red-500 text-xs py-1">{errors.user}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`mt-1 w-full bg-gray-50 border-gray-300 shadow-sm md:text-sm px-2 py-1${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs py-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age:
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 w-full bg-gray-50 border-gray-300 shadow-sm md:text-sm px-2 py-1 ${
                    errors.age && touched.age ? "border-red-500" : ""
                  }`}
                />
                {errors.age && touched.age && (
                  <p className="text-red-500 text-xs py-1">{errors.age}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile:
                </label>
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`mt-1 w-full bg-gray-50 border-gray-300 shadow-sm md:text-sm px-2 py-1${
                    errors.mobile && touched.mobile ? "border-red-500" : ""
                  }`}
                />
                {errors.mobile && touched.mobile && (
                  <p className="text-red-500 text-xs py-1">{errors.mobile}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="interest"
                  className="block text-sm font-medium text-gray-700"
                >
                  Interests (comma-separated):
                </label>
                <input
                  type="text"
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="mt-1 w-full bg-gray-50 border-gray-300 shadow-sm md:text-sm px-2 py-1"
                />
              </div>

              <div className="flex">
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white py-1 px-2 mt-2 rounded flex items-center"
                  disabled={!isFormValid} // Disable the button if the form is invalid
                  style={{
                    opacity: isFormValid ? 1 : 0.6,
                    cursor: isFormValid ? "pointer" : "not-allowed",
                  }} // Styling for disabled state
                >
                  {buttonIcon} {isEditMode ? "Save" : "Add User"}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-3 mt-2 ml-2 rounded flex justify-end items-center"
                >
                  Cancel
                </button>
              </div>
            </form>
            {successMessage && (
              <div className="bg-green-200/30 text-green-800 p-1 font-sans rounded-md mb-1 mt-4 text-sm text-center">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-200/30 text-red-800 p-1 font-sans rounded-md mb-1 mt-4 text-sm text-center">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUserComponent;
