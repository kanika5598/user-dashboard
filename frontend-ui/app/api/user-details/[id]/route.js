import { NextResponse } from "next/server";

async function getUserById(id) {
  try {
    const apiUrl = `http://localhost:4000/users/${id}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Backend API Error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user from backend:", error);
    throw error; // Re-throw the error for the Next.js route handler to catch
  }
}

export async function GET(request, { params }) {
  try {
    const responseParams = await params;
    const { id } = responseParams;
    const user = await getUserById(id);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user", error: error.message },
      { status: 500 }
    );
  }
}
