const {
  default: UserDetailsComponent,
} = require("../components/UserDetailsComponent");

const getUserById = async (id) => {
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
export default async function UserDetailsView({ params }) {
  let userData = null;
  let error = null;
  try {
    const responseParams = await params;
    const { id } = responseParams;
    userData = await getUserById(id);
  } catch (err) {
    error = err.message;
  }
  return <UserDetailsComponent user={userData} error={error} />;
}
