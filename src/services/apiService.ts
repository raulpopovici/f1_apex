const API_BASE_URL = "http://localhost:5047/api";

export interface UpdateFavoritesDto {
  FavoriteTeams: string[];
  FavoriteDrivers: string[];
}

export interface UserDto {
  userId: string;
  username: string;
  role: string;
  favoriteTeams: string[];
  favoriteDrivers: string[];
  repostedPostIds: string[];
  likedPostIds: string[];
}

export interface LoginDto {
  Email: string;
  Password: string;
}

export interface RegisterUserDto {
  FullName: string;
  Email: string;
  Password: string;
  Role: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      // For 204 No Content responses (like PUT requests), return empty object
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<UserDto> {
    const loginDto: LoginDto = {
      Email: email,
      Password: password,
    };

    return this.request<UserDto>("/users/login", {
      method: "POST",
      body: JSON.stringify(loginDto),
    });
  }

  async register(
    fullName: string,
    email: string,
    password: string,
    role: string = "user"
  ): Promise<UserDto> {
    const registerDto: RegisterUserDto = {
      FullName: fullName,
      Email: email,
      Password: password,
      Role: role,
    };

    return this.request<UserDto>("/users/register", {
      method: "POST",
      body: JSON.stringify(registerDto),
    });
  }

  async updateFavorites(
    userId: string,
    favorites: { favoriteTeams: string[]; favoriteDrivers: string[] }
  ): Promise<void> {
    // Convert camelCase to PascalCase for the API
    const dto: UpdateFavoritesDto = {
      FavoriteTeams: favorites.favoriteTeams,
      FavoriteDrivers: favorites.favoriteDrivers,
    };

    await this.request(`/users/${userId}/favorites`, {
      method: "PUT",
      body: JSON.stringify(dto),
    });
  }

  async getUser(userId: string): Promise<UserDto> {
    return this.request<UserDto>(`/users/${userId}`);
  }

  async getAllUsers(): Promise<UserDto[]> {
    return this.request<UserDto[]>(`/users`);
  }
}

export const apiService = new ApiService();
