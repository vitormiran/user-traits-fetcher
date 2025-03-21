
/**
 * Storage utilities for saving and retrieving user traits
 */

const STORAGE_KEY_PREFIX = 'user_traits_';

/**
 * Save user traits to both localStorage and cookies
 */
export function saveUserTraits(userId: string, data: any): void {
  try {
    // Save to localStorage
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${userId}`, JSON.stringify(data));
    
    // Save to cookies (with 7-day expiration)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    document.cookie = `${STORAGE_KEY_PREFIX}${userId}=${encodeURIComponent(JSON.stringify(data))}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
    
    console.log('User traits saved successfully');
  } catch (error) {
    console.error('Error saving user traits:', error);
  }
}

/**
 * Get user traits from localStorage
 */
export function getUserTraitsFromStorage(userId: string): any | null {
  try {
    const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}${userId}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting user traits from localStorage:', error);
    return null;
  }
}

/**
 * Get user traits from cookies
 */
export function getUserTraitsFromCookie(userId: string): any | null {
  try {
    const cookies = document.cookie.split(';');
    const cookieName = `${STORAGE_KEY_PREFIX}${userId}=`;
    
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(cookieName) === 0) {
        return JSON.parse(decodeURIComponent(cookie.substring(cookieName.length)));
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user traits from cookies:', error);
    return null;
  }
}

/**
 * Get previously stored user IDs
 */
export function getStoredUserIds(): string[] {
  try {
    const userIds: string[] = [];
    
    // Check localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
        userIds.push(key.substring(STORAGE_KEY_PREFIX.length));
      }
    }
    
    return [...new Set(userIds)]; // Remove duplicates
  } catch (error) {
    console.error('Error getting stored user IDs:', error);
    return [];
  }
}
