// src/services/api.ts
interface UserProfile {
    username: string;
    displayName: string;
    profilePhotoURL: string;
  }

export async function fetchUserProfile(): Promise<UserProfile> {
  const response = await fetch('/api/v1/user/profile');
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch profile');
  }
  
  const data = await response.json();
  return data.user;
}


