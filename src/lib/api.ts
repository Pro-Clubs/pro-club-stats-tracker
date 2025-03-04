import { getAuthHeader } from "./auth";
import { useAuthStore } from "./auth";

// Read from environment variables with fallback
const apiBaseUrl = import.meta.env.VITE_API_URL || "https://pro-clubs.app/api/v1";

// Centralized API configuration for easy updates
export const API_CONFIG = {
  BASE_URL: apiBaseUrl,
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",

    // Dashboard and user data
    DASHBOARD: "/dashboard",
    SQUAD: "/squad",
    STORAGE: "/storage",

    // Search endpoints
    SEARCH: "/search",
    SEARCH_SUBMIT: "/search/submit",
    SEARCH_CLUB: "/search/club",

    // Statistics endpoints
    STATS_AGGREGATE: "/statistics/aggregate",
    STATS_LEADERBOARD: "/statistics/leaderboard",
    STATS_RANKINGS_PLAYER: "/statistics/rankings/player",
    STATS_RANKINGS_CLUB: "/statistics/rankings/club",
    STATS_RANKINGS_PLAYER_POINTS: "/statistics/rankings/player/points",
    STATS_RANKINGS_PLAYER_POSITIONS: "/statistics/rankings/player/positions",

    // Player endpoints
    PLAYER_ATTRIBUTE_SEARCH: "/player/attribute/search",
    PLAYER_COMPARE: "/player/compare",
    PLAYER_INDEX: "/player/index",
    PLAYER_SEARCH: "/player/search",
    PLAYER_CARD: "/player/card",

    // Club endpoints with dynamic parameters
    CLUB: "/club/{clubId}/platform/{platform}",
    CLUB_CAREER: "/club/{clubId}/platform/{platform}/career",
    CLUB_LEAGUE: "/club/{clubId}/platform/{platform}/league",
    CLUB_MEMBERS: "/club/{clubId}/platform/{platform}/members",
    CLUB_PLAYER: "/club/{clubId}/platform/{platform}/players/{player}",
    CLUB_SQUAD: "/club/{clubId}/platform/{platform}/squad"
  }
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token?: string;
  token?: string; // Fallback for token field
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

// We don't define the DashboardData interface since we don't know
// the structure of the API response
export type DashboardData = any;

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Login failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
    throw new Error("Authentication failed");
  }
}

// Function to fetch dashboard data after login
export async function fetchDashboardData(): Promise<any> {
  try {
    console.log("Starting fetchDashboardData");
    const result = await fetchWithAuth<any>(API_CONFIG.ENDPOINTS.DASHBOARD);
    console.log("Dashboard API response:", result);
    return result;
  } catch (error) {
    console.error("Error in fetchDashboardData:", error);
    throw error;
  }
}

export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const authHeaders = getAuthHeader();

  // Ensure endpoint starts with / if it's a relative path
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  try {
    console.log(`Fetching from ${API_CONFIG.BASE_URL}${normalizedEndpoint} with auth`);
    console.log("Auth headers:", authHeaders);

    const response = await fetch(`${API_CONFIG.BASE_URL}${normalizedEndpoint}`, {
      ...options,
      credentials: 'include', // Include cookies if the API uses them
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...options.headers,
      },
    });

    console.log(`Response status: ${response.status}`);

    // Handle 401 Unauthorized errors specifically (expired token)
    if (response.status === 401) {
      // Clear auth state
      useAuthStore.getState().logout();
      // Redirect can be done at component level when auth state changes
      throw new Error("Session expired. Please log in again.");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}