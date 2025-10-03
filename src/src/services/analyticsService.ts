/**
 * Analytics service for tracking user interactions
 * Ready for Azure Application Insights integration
 */

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  metrics?: Record<string, number>;
}

interface PageView {
  pageName: string;
  url?: string;
  duration?: number;
}

class AnalyticsService {
  private isEnabled: boolean;
  private appInsights: any = null;

  constructor() {
    this.isEnabled = true; // Enable analytics by default for demo
    this.initializeAppInsights();
  }

  /**
   * Initialize Azure Application Insights
   */
  private initializeAppInsights() {
    if (!this.isEnabled) return;

    try {
      // This would be replaced with actual Azure Application Insights SDK
      // import { ApplicationInsights } from '@microsoft/applicationinsights-web';
      
      const appInsightsKey = 'demo-key'; // Replace with actual key in production
      
      if (appInsightsKey) {
        // Initialize Application Insights
        console.log('Analytics initialized with key:', appInsightsKey);
        
        // Example initialization (replace with actual Azure App Insights):
        // this.appInsights = new ApplicationInsights({
        //   config: {
        //     instrumentationKey: appInsightsKey,
        //     enableAutoRouteTracking: true,
        //     enableCorsCorrelation: true,
        //     enableRequestHeaderTracking: true,
        //     enableResponseHeaderTracking: true,
        //   }
        // });
        // this.appInsights.loadAppInsights();
      }
    } catch (error) {
      console.error('Failed to initialize Application Insights:', error);
    }
  }

  /**
   * Track a custom event
   */
  trackEvent(event: AnalyticsEvent) {
    if (!this.isEnabled) return;

    try {
      // For now, log to console (replace with actual Azure tracking)
      console.log('Analytics Event:', {
        timestamp: new Date().toISOString(),
        ...event,
      });

      // When Azure App Insights is configured:
      // this.appInsights?.trackEvent(event);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  /**
   * Track page view
   */
  trackPageView(pageView: PageView) {
    if (!this.isEnabled) return;

    try {
      console.log('Analytics Page View:', {
        timestamp: new Date().toISOString(),
        ...pageView,
      });

      // When Azure App Insights is configured:
      // this.appInsights?.trackPageView(pageView);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  /**
   * Track pre-launch form submission
   */
  trackPrelaunchSignup(userType: 'volunteer' | 'hostel', email: string) {
    this.trackEvent({
      name: 'prelaunch_signup',
      properties: {
        userType,
        email: this.hashEmail(email), // Hash for privacy
        page: 'prelaunch',
        timestamp: new Date().toISOString(),
      },
      metrics: {
        signupCount: 1,
      },
    });
  }

  /**
   * Track form interactions
   */
  trackFormInteraction(action: string, field?: string) {
    this.trackEvent({
      name: 'form_interaction',
      properties: {
        action, // 'start', 'field_focus', 'validation_error', 'submit_attempt', 'submit_success'
        field,
        page: 'prelaunch',
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Track social sharing
   */
  trackSocialShare(platform: string) {
    this.trackEvent({
      name: 'social_share',
      properties: {
        platform, // 'twitter', 'facebook', 'linkedin'
        page: 'prelaunch',
        timestamp: new Date().toISOString(),
      },
      metrics: {
        shareCount: 1,
      },
    });
  }

  /**
   * Track user type selection
   */
  trackUserTypeSelection(userType: 'volunteer' | 'hostel') {
    this.trackEvent({
      name: 'user_type_selected',
      properties: {
        userType,
        page: 'prelaunch',
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Track errors
   */
  trackError(error: Error, context?: string) {
    if (!this.isEnabled) return;

    try {
      console.error('Analytics Error:', {
        error: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
      });

      // When Azure App Insights is configured:
      // this.appInsights?.trackException({ exception: error, properties: { context } });
    } catch (trackingError) {
      console.error('Error tracking error:', trackingError);
    }
  }

  /**
   * Hash email for privacy while maintaining uniqueness
   */
  private hashEmail(email: string): string {
    // Simple hash for demo - in production, use proper hashing
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Set user properties (for tracking returning users)
   */
  setUserProperties(properties: Record<string, any>) {
    if (!this.isEnabled) return;

    try {
      console.log('Analytics User Properties:', properties);

      // When Azure App Insights is configured:
      // this.appInsights?.setAuthenticatedUserContext(properties.userId, properties.accountId, true);
    } catch (error) {
      console.error('Error setting user properties:', error);
    }
  }

  /**
   * Flush any pending analytics data
   */
  flush() {
    if (!this.isEnabled) return;

    try {
      // When Azure App Insights is configured:
      // this.appInsights?.flush();
    } catch (error) {
      console.error('Error flushing analytics:', error);
    }
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();

export default analyticsService;