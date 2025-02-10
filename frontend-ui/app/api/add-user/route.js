import { NextResponse } from "next/server";

export async function POST(request) {
    try {
      const userData = await request.json();
      const apiUrl = 'http://localhost:4000/users';
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
      console.error('Error adding user to backend:', error);
      return NextResponse.json(
        { message: 'Failed to add user!', error: error.message },
        { status: 500 }
      );
    }
  }
