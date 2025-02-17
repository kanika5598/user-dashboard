import { NextResponse } from "next/server";
require('dotenv').config;

export async function POST(request) {
    try {
      const userData = await request.json();
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add user to backend');
      }
  
      const newUser = await response.json();
      return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: 'Failed to add user!', error: error.message },
        { status: 500 }
      );
    }
  }
