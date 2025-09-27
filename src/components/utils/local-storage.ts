// Local storage utility for persisting user data

export interface UserData {
  id: string;
  type: 'volunteer' | 'hostel';
  isLoggedIn: boolean;
  profile: VolunteerProfile | HostelProfile;
  preferences?: any;
  savedItems?: string[];
  applications?: any[];
  messages?: any[];
  notifications?: any[];
}

export interface VolunteerProfile {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  skills: string[];
  languages: string[];
  availability: {
    from: Date | undefined;
    to: Date | undefined;
  };
  experience: string;
  bio: string;
  commitment: string;
}

export interface HostelProfile {
  hostelName: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  hostelType: string;
  totalBeds: string;
  establishedYear: string;
  volunteerRoles: string[];
  accommodationType: string;
  mealsIncluded: boolean;
  wifiIncluded: boolean;
  workHoursPerDay: string;
  minimumStay: string;
  maximumStay: string;
  description: string;
  amenities: string[];
  languages: string[];
  photos: string[];
}

const STORAGE_KEY = 'volunteerStay_userData';

export class LocalStorageManager {
  static saveUserData(userData: UserData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data to localStorage:', error);
    }
  }

  static getUserData(): UserData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // Convert date strings back to Date objects for availability
        if (parsed.type === 'volunteer' && parsed.profile.availability) {
          parsed.profile.availability.from = parsed.profile.availability.from 
            ? new Date(parsed.profile.availability.from) 
            : undefined;
          parsed.profile.availability.to = parsed.profile.availability.to 
            ? new Date(parsed.profile.availability.to) 
            : undefined;
        }
        return parsed;
      }
      return null;
    } catch (error) {
      console.error('Error loading user data from localStorage:', error);
      return null;
    }
  }

  static updateUserData(updates: Partial<UserData>): void {
    const currentData = this.getUserData();
    if (currentData) {
      const updatedData = { ...currentData, ...updates };
      this.saveUserData(updatedData);
    }
  }

  static clearUserData(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing user data from localStorage:', error);
    }
  }

  static addSavedItem(itemId: string): void {
    const userData = this.getUserData();
    if (userData) {
      const savedItems = userData.savedItems || [];
      if (!savedItems.includes(itemId)) {
        savedItems.push(itemId);
        this.updateUserData({ savedItems });
      }
    }
  }

  static removeSavedItem(itemId: string): void {
    const userData = this.getUserData();
    if (userData && userData.savedItems) {
      const savedItems = userData.savedItems.filter(id => id !== itemId);
      this.updateUserData({ savedItems });
    }
  }

  static getSavedItems(): string[] {
    const userData = this.getUserData();
    return userData?.savedItems || [];
  }

  static addApplication(application: any): void {
    const userData = this.getUserData();
    if (userData) {
      const applications = userData.applications || [];
      applications.push({
        ...application,
        id: Date.now().toString(),
        appliedDate: new Date().toISOString(),
        status: 'pending'
      });
      this.updateUserData({ applications });
    }
  }

  static getApplications(): any[] {
    const userData = this.getUserData();
    return userData?.applications || [];
  }

  static addMessage(message: any): void {
    const userData = this.getUserData();
    if (userData) {
      const messages = userData.messages || [];
      messages.push({
        ...message,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false
      });
      this.updateUserData({ messages });
    }
  }

  static getMessages(): any[] {
    const userData = this.getUserData();
    return userData?.messages || [];
  }

  static markMessageAsRead(messageId: string): void {
    const userData = this.getUserData();
    if (userData && userData.messages) {
      const messages = userData.messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      );
      this.updateUserData({ messages });
    }
  }

  static addNotification(notification: any): void {
    const userData = this.getUserData();
    if (userData) {
      const notifications = userData.notifications || [];
      notifications.unshift({
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false
      });
      // Keep only last 50 notifications
      if (notifications.length > 50) {
        notifications.splice(50);
      }
      this.updateUserData({ notifications });
    }
  }

  static getNotifications(): any[] {
    const userData = this.getUserData();
    return userData?.notifications || [];
  }

  static markNotificationAsRead(notificationId: string): void {
    const userData = this.getUserData();
    if (userData && userData.notifications) {
      const notifications = userData.notifications.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      this.updateUserData({ notifications });
    }
  }

  static getUnreadNotificationCount(): number {
    const userData = this.getUserData();
    if (userData && userData.notifications) {
      return userData.notifications.filter(notif => !notif.read).length;
    }
    return 0;
  }

  static getUnreadMessageCount(): number {
    const userData = this.getUserData();
    if (userData && userData.messages) {
      return userData.messages.filter(msg => !msg.read).length;
    }
    return 0;
  }
}