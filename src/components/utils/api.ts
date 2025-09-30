// Mock API layer for handling volunteer requests and notifications
import { LocalStorageManager } from './local-storage';

export interface VolunteerRequest {
  id: string;
  hostelId: string;
  hostelName: string;
  volunteerId: string;
  volunteerName: string;
  status: 'pending' | 'accepted' | 'declined';
  message: string;
  requestedDate: string;
  responseDate?: string;
  position?: string;
  duration?: string;
  startDate?: string;
}

export interface Notification {
  id: string;
  type: 'volunteer_request' | 'request_response' | 'application_status' | 'message' | 'system' | 'error' | 'success' | 'info' | 'warning';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  createdAt: string;
  relatedId?: string; // ID of related request/application
}

class MockAPI {
  // Store data in localStorage with prefixes for organization
  private getRequests(): VolunteerRequest[] {
    const requests = localStorage.getItem('hosteling_volunteer_requests');
    return requests ? JSON.parse(requests) : [];
  }

  private saveRequests(requests: VolunteerRequest[]): void {
    localStorage.setItem('hosteling_volunteer_requests', JSON.stringify(requests));
  }



  private saveNotifications(notifications: Notification[]): void {
    localStorage.setItem('hosteling_notifications', JSON.stringify(notifications));
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Send volunteer request from hostel to volunteer
  async sendVolunteerRequest(request: Omit<VolunteerRequest, 'id' | 'status' | 'requestedDate'>): Promise<VolunteerRequest> {
    const newRequest: VolunteerRequest = {
      ...request,
      id: this.generateId(),
      status: 'pending',
      requestedDate: new Date().toISOString()
    };

    const requests = this.getRequests();
    requests.push(newRequest);
    this.saveRequests(requests);

    // Create notification for volunteer
    const notification: Notification = {
      id: this.generateId(),
      type: 'volunteer_request',
      title: 'New Volunteer Request!',
      message: `${request.hostelName} would like you to volunteer at their hostel.`,
      priority: 'high',
      read: false,
      createdAt: new Date().toISOString(),
      relatedId: newRequest.id
    };

    this.addNotification(notification);

    return newRequest;
  }

  // Respond to volunteer request
  async respondToVolunteerRequest(requestId: string, response: 'accepted' | 'declined', responseMessage?: string): Promise<VolunteerRequest | null> {
    const requests = this.getRequests();
    const requestIndex = requests.findIndex(r => r.id === requestId);
    
    if (requestIndex === -1) return null;

    requests[requestIndex].status = response;
    requests[requestIndex].responseDate = new Date().toISOString();
    this.saveRequests(requests);

    // Create notification for hostel
    const notification: Notification = {
      id: this.generateId(),
      type: 'request_response',
      title: `Volunteer Request ${response}`,
      message: `${requests[requestIndex].volunteerName} has ${response} your volunteer request.${responseMessage ? ` Message: ${responseMessage}` : ''}`,
      priority: 'high',
      read: false,
      createdAt: new Date().toISOString(),
      relatedId: requestId
    };

    this.addNotification(notification);

    return requests[requestIndex];
  }

  // Get requests for a specific volunteer
  async getVolunteerRequests(volunteerId: string): Promise<VolunteerRequest[]> {
    const requests = this.getRequests();
    return requests.filter(r => r.volunteerId === volunteerId);
  }

  // Get requests sent by a specific hostel
  async getHostelRequests(hostelId: string): Promise<VolunteerRequest[]> {
    const requests = this.getRequests();
    return requests.filter(r => r.hostelId === hostelId);
  }

  // Get all requests (admin view)
  async getAllRequests(): Promise<VolunteerRequest[]> {
    return this.getRequests();
  }

  // Add notification
  addNotification(notification: Notification): void {
    const notifications = this.getNotificationsFromStorage();
    notifications.unshift(notification); // Add to beginning
    
    // Keep only last 100 notifications
    if (notifications.length > 100) {
      notifications.splice(100);
    }
    
    this.saveNotifications(notifications);
  }

  // Get notifications for current user
  getNotifications(limit?: number): Notification[] {
    const notifications = this.getNotificationsFromStorage();
    return limit ? notifications.slice(0, limit) : notifications;
  }

  // Helper method to get notifications from storage
  private getNotificationsFromStorage(): Notification[] {
    const notifications = localStorage.getItem('hosteling_notifications');
    return notifications ? JSON.parse(notifications) : [];
  }

  // Mark notification as read
  markNotificationAsRead(notificationId: string): void {
    const notifications = this.getNotificationsFromStorage();
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveNotifications(notifications);
    }
  }

  // Mark all notifications as read
  markAllNotificationsAsRead(): void {
    const notifications = this.getNotificationsFromStorage();
    notifications.forEach(n => n.read = true);
    this.saveNotifications(notifications);
  }

  // Get unread notification count
  getUnreadNotificationCount(): number {
    const notifications = this.getNotificationsFromStorage();
    return notifications.filter(n => !n.read).length;
  }

  // Clear old notifications
  clearOldNotifications(daysOld: number = 30): void {
    const notifications = this.getNotificationsFromStorage();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    const filteredNotifications = notifications.filter(n => 
      new Date(n.createdAt) > cutoffDate
    );
    
    this.saveNotifications(filteredNotifications);
  }

  // Search volunteers (mock implementation)
  async searchVolunteers(criteria: {
    country?: string;
    skills?: string[];
    experience?: string;
    availability?: { from: string; to: string };
  }): Promise<any[]> {
    // This would normally fetch from a real API
    // For now, return mock data based on criteria
    const mockVolunteers = [
      {
        id: "vol1",
        firstName: "Sarah",
        lastName: "Chen",
        country: "United States",
        skills: ["Social Media", "Photography", "Reception"],
        experience: "Intermediate",
        availability: { from: "2025-01-01", to: "2025-06-01" }
      },
      {
        id: "vol2", 
        firstName: "Jake",
        lastName: "Morrison",
        country: "United Kingdom",
        skills: ["Reception", "Tours", "Bar Help"],
        experience: "Advanced",
        availability: { from: "2024-12-01", to: "2025-05-01" }
      }
    ];

    return mockVolunteers.filter(volunteer => {
      if (criteria.country && volunteer.country !== criteria.country) return false;
      if (criteria.experience && volunteer.experience !== criteria.experience) return false;
      if (criteria.skills && !criteria.skills.some(skill => volunteer.skills.includes(skill))) return false;
      return true;
    });
  }
}

export const API = new MockAPI();