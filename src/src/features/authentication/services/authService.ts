import { User } from '../../../shared/types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  location: string;
  userType: 'volunteer' | 'hostel';
}

class AuthService {
  private readonly STORAGE_KEY = 'hosteling_user';
  private readonly USERS_KEY = 'hosteling_users';

  async login(credentials: LoginCredentials): Promise<User | null> {
    const users = this.getStoredUsers();
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (user) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      return user;
    }
    
    return null;
  }

  async signup(data: SignupData): Promise<User | null> {
    const users = this.getStoredUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === data.email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      password: data.password,
      name: data.name,
      location: data.location,
      userType: data.userType,
      createdAt: new Date().toISOString(),
      isVerified: false,
      profileImage: '',
      bio: '',
      skills: [],
      languages: ['English'],
      availability: {
        startDate: '',
        endDate: '',
        duration: ''
      }
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser));
    
    return newUser;
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.STORAGE_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  private getStoredUsers(): User[] {
    const usersStr = localStorage.getItem(this.USERS_KEY);
    return usersStr ? JSON.parse(usersStr) : [];
  }

  updateUser(updatedUser: User): void {
    const users = this.getStoredUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedUser));
    }
  }
}

export const authService = new AuthService();