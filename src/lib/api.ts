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

export interface DashboardData {
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    last_login_at?: string;
  };
  stats: {
    total_clubs: number;
    total_players: number;
    total_matches: number;
    total_goals: number;
    total_assists: number;
    total_clean_sheets: number;
    total_users: number;
    player_of_the_week?: {
      name: string;
      position: string;
      rating: number;
      goals: number;
      assists: number;
      club_name: string;
      platform: string;
      match_date: string;
    };
  };
  recent?: string[]; // Array of recent match results: 'W', 'L', 'D'
  recent_clubs?: Array<{
    id: number;
    name: string;
    platform: string;
    members_count: number;
    wins: number;
    losses: number;
    ties: number;
    division: number;
    last_match_date: string;
  }>;
  popular_clubs?: Array<{
    id: number;
    name: string;
    platform: string;
    members_count: number;
    popularity_score: number;
  }>;
}

// Fallback mock data in case the API fails
export const mockDashboardData: DashboardData = {
  user: {
    id: 1,
    name: "Demo User",
    email: "demo@example.com",
    created_at: "2023-01-15T12:00:00Z",
    updated_at: "2023-04-20T09:30:00Z",
    last_login_at: new Date().toISOString()
  },
  stats: {
    total_clubs: 245,
    total_players: 3890,
    total_matches: 12450,
    total_goals: 31287,
    total_assists: 18932,
    total_clean_sheets: 4215,
    total_users: 1245,
    player_of_the_week: {
      name: "Alex Johnson",
      position: "ST",
      rating: 9.2,
      goals: 4,
      assists: 2,
      club_name: "FC Thunderbolts",
      platform: "PS5",
      match_date: "2023-04-18T20:30:00Z"
    }
  },
  recent: ['W', 'W', 'L', 'D', 'W', 'L', 'W', 'W', 'D', 'W'],
  recent_clubs: [
    {
      id: 123,
      name: "FC Thunderbolts",
      platform: "PS5",
      members_count: 11,
      wins: 18,
      losses: 3,
      ties: 2,
      division: 2,
      last_match_date: "2023-04-18T20:30:00Z"
    },
    {
      id: 124,
      name: "United Strikers",
      platform: "XBOX",
      members_count: 14,
      wins: 15,
      losses: 5,
      ties: 3,
      division: 3,
      last_match_date: "2023-04-17T19:45:00Z"
    }
  ],
  popular_clubs: [
    {
      id: 123,
      name: "FC Thunderbolts",
      platform: "PS5",
      members_count: 11,
      popularity_score: 92
    },
    {
      id: 129,
      name: "Royal Kickers",
      platform: "PC",
      members_count: 16,
      popularity_score: 88
    }
  ]
};

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
export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    console.log("Starting fetchDashboardData");
    const result = await fetchWithAuth<DashboardData>(API_CONFIG.ENDPOINTS.DASHBOARD);
    
    if (!result || !result.stats) {
      console.warn("API returned incomplete data, using mock data");
      return { ...mockDashboardData };
    }
    
    return result;
  } catch (error) {
    console.error("Error in fetchDashboardData, using mock data instead:", error);
    // Return mock data as fallback
    return { ...mockDashboardData };
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