"use client";

import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaPlus, FaDumpster } from "react-icons/fa";
import { useRouter } from "next/navigation";
import HeaderComponent from "./HeaderComponent";
import ErrorCard from "./ErrorCard";

const UserDashboard = ({ user, error }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState(null);
  const [deleteSuccessMessage, setDeleteMeSuccessssage] = useState(null);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUsers(user);
    } else if (error) {
      setError(error);
    }
    setLoading(false);
  }, [user, error]);

  const handleAddUser = () => {
    //  Navigate to add user view page
    router.push("/add-user-view");
  };

  const handleEditUser = (userId) => {
    //  Navigate to the edit user page
    router.push(`/add-user-view/${userId}`);
  };

  const handleViewDetails = (userId) => {
    //  Navigate to the view user page
    router.push(`/user-details-view/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    //  delete user by id
    try {
      const response = await fetch(`/api/delete-user/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        setDeleteErrorMessage("Failed to delete User!");
        return;
      }
      setUsers((users) => users.filter((user) => user.id !== userId));
      router.refresh();
      setDeleteMeSuccessssage(`User with Id: ${userId} deleted successfully!`);
      setDeleteErrorMessage(null);
    } catch (error) {
      setDeleteMeSuccessssage(null);
      setDeleteErrorMessage("Failed to delete User!");
    }
  };

  if (loading) {
    return (
      <p className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        Loading dashboard..
      </p>
    );
  }

  return (
    <div className="container mx-auto w-full">
      <HeaderComponent />
      <div className="flex justify-start mb-4 pr-4">
        {deleteSuccessMessage ? (
          <p className="py-2 text-sm ml-2 text-green-600 font-semibold font-sans">
            {deleteSuccessMessage}
          </p>
        ) : (
          <p className="py-2 text-sm ml-2 text-red-600 font-semibold font-sans">
            {deleteErrorMessage}
          </p>
        )}
        <button
          onClick={handleAddUser}
          className="ml-auto bg-cyan-600 hover:bg-cyan-700 text-white py-1 px-2 rounded flex items-center"
        >
          <FaPlus className="mr-1" /> Add User
        </button>
      </div>
      {errors ? (
        <ErrorCard />
      ) : (
        <div className="overflow-auto rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Name
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Email
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Age
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Mobile
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Interests
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    No users, start by adding new users!
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.age || "N/A"}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.mobile}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.interest ? user.interest.join(", ") : "N/A"}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="text-yellow-600/70 hover:text-yellow-700 tracking-wider mr-2 text-lg"
                        title="Edit User"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleViewDetails(user.id)}
                        className="text-cyan-600/70 hover:text-cyan-700 tracking-wider mr-2 text-lg"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600/70 hover:text-red-700 tracking-wider text-lg"
                        title="Delete User"
                      >
                        <FaDumpster />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
