import { NextResponse } from "next/server";
require('dotenv').config;

async function updateUserDetailsById(id, userData) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`;
    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Backend API Update Error: ${response.status} - ${
          errorData.message || "Failed to update user"
        }`
      );
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Error updating user in backend:", error);
    throw error;
  }
}

export async function PATCH(request, { params }) {
  try {
    const requestParams = await params;
    const userData = await request.json();
    const { id } = requestParams;
    const updatedUser = await updateUserDetailsById(id, userData);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user!", error: error.message },
      { status: 500 }
    );
  }
}
