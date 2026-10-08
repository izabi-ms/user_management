export interface User {
  id: number;
  name: string;
  email: string;
}

export type CreateUserRequest = Omit<User, "id">;

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/users";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(API_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch users: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function createUser(
  user: CreateUserRequest
): Promise<User> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create user: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}