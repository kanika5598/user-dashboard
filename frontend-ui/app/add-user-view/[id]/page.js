import AddUserComponent from "../components/AddUserComponent";
import { headers } from "next/headers";

const getUserDetailsById = async (httpValue, host, id) => {
  try {
    const apiUrl = `${httpValue}://${host}/api/user-details/${id}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Backend API Error: ${response.status} - ${response.statusText}`
      );
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw error;
  }
};
export default async function EditUserView({ params }) {
  let userData = null;
  let error = null;
  const headersList = await headers();
  const host = headersList.get("host");
  const httpValue = process.env.httpValue;
  try {
    const responseParams = await params;
    const { id } = responseParams;
    userData = await getUserDetailsById(httpValue, host, id);
  } catch (err) {
    error = err.message;
  }
  return <AddUserComponent userData={userData} editError={error} userId={userData?.id} />;
}
