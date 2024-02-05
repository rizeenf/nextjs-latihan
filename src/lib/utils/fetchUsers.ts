export const fetchUsersAuth = async () => {
  try {
    const response = await fetch(
      `https://65bb679052189914b5bc0331.mockapi.io/api/auth`
    );
    if (!response.ok) {
      console.error("Cannot find any users.", response.status);
    }
    const userData = await response.json();

    return userData;
  } catch (error) {
    console.error("Error while fetching users.", error);
  }
};

export const fetchUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  const data = await res.json();

  return data;
};
