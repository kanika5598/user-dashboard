import UserDashboard from "./components/UserDashboard";
import { headers } from "next/headers";

const getAllUsers = async (httpValue, host) => {
  try {
    const apiUrl = `${httpValue}://${host}/api/getUsers`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export default async function Home() {
  let userData = null;
  let error = null;
  const headersList = await headers();
  const host = headersList.get("host");
  const httpValue = process.env.httpValue;

  try {
    userData = await getAllUsers(httpValue, host);
  } catch (err) {
    error = err.message;
  }
  return <UserDashboard user={userData} error={error} />;
}
