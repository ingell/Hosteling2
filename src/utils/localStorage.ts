import { UserData, VolunteerProfile, HostelProfile, Application, Message, Notification } from '../types';

const STORAGE_KEY = 'hosteling_userData';

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
          parsed.profile.availability.startDate = parsed.profile.availability.startDate 
            ? new Date(parsed.profile.availability.startDate) 
            : undefined;
          parsed.profile.availability.endDate = parsed.profile.availability.endDate 
            ? new Date(parsed.profile.availability.endDate) 
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

  static addApplication(application: Omit<Application, 'id' | 'appliedDate' | 'status'>): void {
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

  static getApplications(): Application[] {
    const userData = this.getUserData();
    return userData?.applications || [];
  }

  static addMessage(message: Omit<Message, 'id' | 'timestamp' | 'read'>): void {
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

  static getMessages(): Message[] {
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

  static addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
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

  static getNotifications(): Notification[] {
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