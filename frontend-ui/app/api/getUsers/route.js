import { NextResponse } from "next/server";
require('dotenv').config;

async function getAllUsers() {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Backend API Error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching getAllUsers from backend:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users", error: error.message },
      { status: 500 }
    );
  }
}
