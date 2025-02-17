import { NextResponse } from "next/server";
require('dotenv').config;

async function deleteUserById(id) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`;
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Backend API Error: ${response.status} - ${response.statusText}`
      );
    }

    return { status: response.status, message: "User Deleted successfully." };
  } catch (error) {
    console.error("Error while delete user:", error);
    throw error; // Re-throw the error for the Next.js route handler to catch
  }
}

export async function DELETE(request, { params }) {
  try {
    const responseParams = await params;
    const { id } = responseParams;
    const resData = await deleteUserById(id);
    return NextResponse.json(resData);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete user.", error: error.message },
      { status: 500 }
    );
  }
}
