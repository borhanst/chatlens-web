import { apiWithAuth, getValidToken } from './tokenService';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN_TYPE = import.meta.env.VITE_AUTHORIZATION_TOKEN_TYPE;

interface UpdateUserData {
  email?: string;
  username?: string;
  password?: string;
  profile?: {
    is_active?: boolean;
    first_name?: string;
    last_name?: string;
    profile_image?: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}

export const updateUserProfile = async (userData: UpdateUserData): Promise<ApiResponse<any>> => {
  try {
    const response = await apiWithAuth(`${API_BASE_URL}/api/auth/users/me/`, {
      method: 'PATCH',
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }

    return {
      success: true,
      data,
      message: 'Profile updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred'
    };
  }
};

export const changePassword = async (currentPassword: string, newPassword: string): Promise<ApiResponse<any>> => {
  try {
    const response = await apiWithAuth(`${API_BASE_URL}/api/auth/users/set_password/`, {
      method: 'POST',
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to change password');
    }

    return {
      success: true,
      data,
      message: 'Password updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred'
    };
  }
};

export const uploadProfileImage = async (file: File): Promise<ApiResponse<any>> => {
  try {
    const formData = new FormData();
    formData.append('profile.profile_image', file);

    const token = await getValidToken();
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/users/me/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `${TOKEN_TYPE} ${token}`
      },
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload image');
    }

    return {
      success: true,
      data,
      message: 'Profile image updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred'
    };
  }
};