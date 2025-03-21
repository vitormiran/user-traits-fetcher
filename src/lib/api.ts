
/**
 * API client for fetching user traits
 * 
 * Note: In a real implementation, this would make actual API calls to a backend
 * that handles the Segment API requests. For this demo, we're mocking the response.
 */

// This would typically be an environment variable
const API_URL = '/api/profile';

export async function fetchUserTraits(userId: string): Promise<any> {
  try {
    // In a real implementation, this would be the actual API call:
    // const response = await fetch(`${API_URL}/${userId}`);
    
    // For demonstration purposes, we're simulating a network request
    console.log(`Fetching traits for user: ${userId}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response data for demo purposes
    const mockTraits = {
      userId,
      traits: {
        email: `${userId.toLowerCase()}@example.com`,
        name: `User ${userId}`,
        plan: "premium",
        loginCount: 42,
        lastLogin: new Date().toISOString(),
        preferences: {
          theme: "light",
          notifications: true,
          language: "en"
        },
        subscription: {
          status: "active",
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      }
    };
    
    return mockTraits;
    
    // If we were actually making a request:
    // if (!response.ok) {
    //   throw new Error(`API error: ${response.status}`);
    // }
    // return await response.json();
  } catch (error) {
    console.error('Error fetching user traits:', error);
    throw error;
  }
}
