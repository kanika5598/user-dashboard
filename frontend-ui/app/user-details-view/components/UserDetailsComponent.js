"use client";
import ErrorCard from "@/app/components/ErrorCard";
import HeaderComponent from "@/app/components/HeaderComponent";
import { useRouter } from "next/navigation";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const UserDetailsComponent = ({ user, error }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };
  return (
    <div className="container mx-auto w-full">
      <HeaderComponent />
      {error ? (
        <ErrorCard />
      ) : (
        <div className="flex justify-center">
          <div className="w-full max-w-lg p-2 rounded-lg my-3">
            <div className="bg-gray-50 p-4 rounded-md shadow-md min-h-[250px]">
              <div className="text-cyan-700 text-md font-bold text-center pb-2">
                User Details
              </div>
              <h2 className="text-sm font-semibold pb-1">
                User: {user.username}
              </h2>
              <p className="text-sm pb-1">Email: {user.email}</p>
              <p className="text-sm pb-1">Age: {user.age || "N/A"}</p>
              <p className="text-sm pb-1">Mobile: {user.mobile}</p>
              <p className="text-sm pb-4">
                Interests:{" "}
                {user.interest.length > 0 ? user.interest.join(", ") : "N/A"}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleBack}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white py-1 px-2 rounded flex items-center justify-center"
                >
                  <FaArrowAltCircleLeft className="mr-1" />
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsComponent;
