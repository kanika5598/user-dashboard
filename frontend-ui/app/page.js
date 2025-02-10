import UserDashboard from "./components/UserDashboard";

const getAllUsers = async () => {
  try {
    const apiUrl = "http://localhost:3000/api/getUsers";
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
  try {
    userData = await getAllUsers();
  } catch (err) {
    error = err.message;
  }
  return <UserDashboard user={userData} error={error} />;
}
