// src/services/api.ts
interface UserProfile {
    username: string;
    displayName: string;
    identity: string;
    store:{
      itemsInCart: number;
    }
  }

export async function fetchUserProfile(): Promise<UserProfile> {
  const response = await fetch('/api/v1/user/session');
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch profile');
  }
  
  const data = await response.json();
  return data.user;
}


