import { UserUpdateDTO } from "@/models/UserUpdateDTO";
import apiClient from "../axios";

interface ChangePasswordParams {
  newPassword: string;
  token: string | null;
  oldPassword?: string;
  username?: string;
}


export const fetchUsers = async (
  page: number,
  search: string,
  filters: { role?: string; status?: string },
  token: string | null
) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("search", search);
  if (filters.role) params.append("role", filters.role);
  if (filters.status) params.append("status", filters.status);

  try {
    const response = await apiClient.get(`admin/users?${params}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};


export const updateProfile = async (
  profileData: UserUpdateDTO,
  token: string | null
): Promise<void> => {
  try {
    await apiClient.put("users/update-profile", profileData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error("Failed to update profile", error);
    throw error;
  }
};


export const deleteUser = async (token: string | null, username?: string | null) => {
  const url = username ? `admin/users/${username}` : `users/delete-account`;

  await apiClient.delete(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const checkUserRole = async (token: string | null): Promise<boolean> =>  {
  try {
    const response = await apiClient.get("users/is-admin", {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const data = await response.data;
    return data.admin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// export const changePassword = async (
//   newPassword: string,
//   token: string | null,
//   oldPassword?: string,
//   username?: string | null
// ) => {
//   const payload: { oldPassword: string; newPassword: string } = {
//     if(oldPassword) {
//       oldPassword,
//     }
//     newPassword,
//   };

//   const url = username ? `admin/users/${username}/reset-password` : `users/change-password`;

//   await apiClient.post(`${url}`, payload, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };



export const changePassword = async (params: ChangePasswordParams) => {
  const { newPassword, token, oldPassword, username } = params;

  // Validate required parameters
  if (!username && !oldPassword) {
    throw new Error("Old password is required for non-admin password changes");
  }

  // Create appropriate payload based on user type
  const payload = username
    ? { newPassword }
    : { 
        oldPassword: oldPassword!,
        newPassword
      };

  // Build the correct endpoint URL
  const endpoint = username
    ? `admin/users/${encodeURIComponent(username)}/reset-password`
    : `users/change-password`;

  // Execute the API request
  await apiClient.post(endpoint, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// export const changePassword = async (
//   newPassword: string,
//   token: string | null,
//   oldPassword?: string,
//   username?: string | null
// ) => {
//   if (!username && !oldPassword) {
//     throw new Error("Old password is required for non-admin password changes");
//   }

//   const payload = username 
//     ? { newPassword: newPassword }
//     : { 
//         oldPassword: oldPassword!,
//         newPassword: newPassword 
//       };

//   const endpoint = username 
//     ? `admin/users/${encodeURIComponent(username)}/reset-password`
//     : `users/change-password`;

//   await apiClient.post(endpoint, payload, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

export const changeUsername = async (
  newUsername: string,
  token: string | null,
  username?: string | null
) => {
  const payload: {newUsername: string;} = {
    newUsername,
  };

  const url = username ? `admin/users/${username}` : `users`;

  await apiClient.put(`${url}/change-username`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getCurrentUser = async (token: string | null) => {
  try {
    const response = await apiClient.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch current user", error);
    throw error;
  }
};
