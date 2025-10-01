export interface Notification {
  id?: string;
  type: 'system' | 'message' | 'application' | 'request' | 'error' | 'success' | 'warning' | 'info';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  timestamp?: number;
  read?: boolean;
}

export interface UserData {
  id: string;
  type: 'volunteer' | 'hostel';
  isLoggedIn: boolean;
  profile: any;
  savedItems: any[];
  applications: any[];
  messages: any[];
  notifications: Notification[];
}

export class LocalStorageManager {
  private static readonly USER_DATA_KEY = 'hosteling_user_data';

  static saveUserData(userData: UserData): void {
    try {
      localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  }

  static getUserData(): UserData | null {
    try {
      const data = localStorage.getItem(this.USER_DATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
      return null;
    }
  }

  static clearUserData(): void {
    try {
      localStorage.removeItem(this.USER_DATA_KEY);
    } catch (error) {
      console.error('Failed to clear user data:', error);
    }
  }

  static addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
    const userData = this.getUserData();
    if (!userData) return;

    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      read: false
    };

    userData.notifications = userData.notifications || [];
    userData.notifications.unshift(newNotification);

    // Keep only the last 50 notifications
    if (userData.notifications.length > 50) {
      userData.notifications = userData.notifications.slice(0, 50);
    }

    this.saveUserData(userData);
  }

  static markNotificationAsRead(notificationId: string): void {
    const userData = this.getUserData();
    if (!userData) return;

    const notification = userData.notifications?.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveUserData(userData);
    }
  }

  static getUnreadNotificationCount(): number {
    const userData = this.getUserData();
    if (!userData || !userData.notifications) return 0;
    
    return userData.notifications.filter(n => !n.read).length;
  }

  static addSavedItem(itemId: string, itemType: 'hostel' | 'volunteer'): void {
    const userData = this.getUserData();
    if (!userData) return;

    userData.savedItems = userData.savedItems || [];
    
    // Check if item is already saved
    const existingItem = userData.savedItems.find(item => 
      item.id === itemId && item.type === itemType
    );

    if (!existingItem) {
      userData.savedItems.push({
        id: itemId,
        type: itemType,
        savedAt: Date.now()
      });
      this.saveUserData(userData);
    }
  }

  static removeSavedItem(itemId: string, itemType: 'hostel' | 'volunteer'): void {
    const userData = this.getUserData();
    if (!userData) return;

    userData.savedItems = userData.savedItems?.filter(item => 
      !(item.id === itemId && item.type === itemType)
    ) || [];
    
    this.saveUserData(userData);
  }

  static isSaved(itemId: string, itemType: 'hostel' | 'volunteer'): boolean {
    const userData = this.getUserData();
    if (!userData || !userData.savedItems) return false;

    return userData.savedItems.some(item => 
      item.id === itemId && item.type === itemType
    );
  }

  static addApplication(hostelId: string, applicationData: any): void {
    const userData = this.getUserData();
    if (!userData) return;

    userData.applications = userData.applications || [];
    
    const newApplication = {
      id: Date.now().toString(),
      hostelId,
      ...applicationData,
      appliedAt: Date.now(),
      status: 'pending'
    };

    userData.applications.push(newApplication);
    this.saveUserData(userData);
  }

  static updateProfile(newProfileData: any): void {
    const userData = this.getUserData();
    if (!userData) return;

    userData.profile = { ...userData.profile, ...newProfileData };
    this.saveUserData(userData);
  }
}