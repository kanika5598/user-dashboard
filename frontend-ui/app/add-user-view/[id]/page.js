import AddUserComponent from "../components/AddUserComponent";

const getUserDetailsById = async (id) => {
  try {
    const apiUrl = `http://localhost:3000/api/user-details/${id}`;
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
  try {
    const responseParams = await params;
    const { id } = responseParams;
    userData = await getUserDetailsById(id);
  } catch (err) {
    error = err.message;
  }
  return <AddUserComponent userData={userData} editError={error} userId={userData?.id} />;
}
