interface PrelaunchSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: 'volunteer' | 'hostel';
  consent: boolean;
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

interface SubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
}

export class PrelaunchService {
  private static readonly API_ENDPOINT = '/api/prelaunch';

  /**
   * Submit pre-launch form data to Azure
   * This will be integrated with Azure Functions or Azure App Service
   */
  static async submitPrelaunchForm(formData: Omit<PrelaunchSubmission, 'submittedAt' | 'ipAddress' | 'userAgent'>): Promise<SubmissionResponse> {
    try {
      // Prepare submission data
      const submission: PrelaunchSubmission = {
        ...formData,
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        // Note: IP address will be captured on the server side
      };

      // For now, we'll simulate the API call
      // Replace this with actual Azure integration
      const response = await this.simulateAzureSubmission(submission);
      
      return response;
    } catch (error) {
      console.error('Error submitting prelaunch form:', error);
      return {
        success: false,
        message: 'Failed to submit form. Please try again later.',
      };
    }
  }

  /**
   * Simulate Azure submission - replace with actual Azure call
   */
  private static async simulateAzureSubmission(submission: PrelaunchSubmission): Promise<SubmissionResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Log the data that would be sent to Azure
    console.log('Prelaunch submission data for Azure:', {
      ...submission,
      // Azure Table Storage or Cosmos DB structure
      partitionKey: submission.userType, // Group by user type
      rowKey: `${Date.now()}_${submission.email}`, // Unique identifier
      timestamp: submission.submittedAt,
    });

    // Simulate successful response
    return {
      success: true,
      message: 'Successfully registered for early access!',
      submissionId: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  /**
   * Validate email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format (basic international format)
   */
  static validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  /**
   * Format data for Azure Analytics/Application Insights
   */
  static formatForAnalytics(submission: PrelaunchSubmission) {
    return {
      event: 'prelaunch_signup',
      properties: {
        userType: submission.userType,
        email: submission.email, // Consider hashing for privacy
        timestamp: submission.submittedAt,
        hasPhone: !!submission.phone,
        consentGiven: submission.consent,
      },
      metrics: {
        signupCount: 1,
      },
    };
  }
}

export default PrelaunchService;