// Mock email service for frontend-only implementation
// In a real application, this would connect to a backend email service

export interface EmailNotification {
  id: string;
  to: string;
  subject: string;
  body: string;
  type: 'welcome' | 'message' | 'request' | 'application' | 'reminder' | 'system';
  sentAt: Date;
  status: 'sent' | 'pending' | 'failed';
  userId?: string;
}

export interface EmailTemplate {
  type: string;
  subject: {
    en: string;
    es: string;
  };
  body: {
    en: string;
    es: string;
  };
}

// Email templates
const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    type: 'welcome_volunteer',
    subject: {
      en: 'Welcome to Hosteling! 🎒',
      es: '¡Bienvenido a Hosteling! 🎒',
    },
    body: {
      en: `Welcome to Hosteling, {{firstName}}!

Thank you for joining our community of volunteers. You can now:

• Browse hostels worldwide
• Apply for volunteer positions
• Connect with other volunteers
• Build your travel experience

Start exploring opportunities: https://hosteling.com/browse

Happy travels!
The Hosteling Team`,
      es: `¡Bienvenido a Hosteling, {{firstName}}!

Gracias por unirte a nuestra comunidad de voluntarios. Ahora puedes:

• Explorar albergues en todo el mundo
• Aplicar a posiciones de voluntario
• Conectar con otros voluntarios
• Construir tu experiencia de viaje

Comienza a explorar oportunidades: https://hosteling.com/browse

¡Felices viajes!
El Equipo de Hosteling`,
    },
  },
  {
    type: 'welcome_hostel',
    subject: {
      en: 'Welcome to Hosteling! 🏠',
      es: '¡Bienvenido a Hosteling! 🏠',
    },
    body: {
      en: `Welcome to Hosteling, {{hostelName}}!

Thank you for joining our network of hostels. You can now:

• Post volunteer opportunities
• Review volunteer applications
• Connect with skilled volunteers
• Grow your hostel community

Manage your hostel: https://hosteling.com/dashboard

Best regards,
The Hosteling Team`,
      es: `¡Bienvenido a Hosteling, {{hostelName}}!

Gracias por unirte a nuestra red de albergues. Ahora puedes:

• Publicar oportunidades de voluntariado
• Revisar aplicaciones de voluntarios
• Conectar con voluntarios calificados
• Hacer crecer tu comunidad del albergue

Gestiona tu albergue: https://hosteling.com/dashboard

Saludos cordiales,
El Equipo de Hosteling`,
    },
  },
  {
    type: 'new_message',
    subject: {
      en: 'New message from {{senderName}}',
      es: 'Nuevo mensaje de {{senderName}}',
    },
    body: {
      en: `Hi {{recipientName}},

You have received a new message from {{senderName}}:

"{{messagePreview}}"

Reply here: https://hosteling.com/messages

Best regards,
The Hosteling Team`,
      es: `Hola {{recipientName}},

Has recibido un nuevo mensaje de {{senderName}}:

"{{messagePreview}}"

Responde aquí: https://hosteling.com/messages

Saludos cordiales,
El Equipo de Hosteling`,
    },
  },
  {
    type: 'volunteer_application',
    subject: {
      en: 'New volunteer application for {{hostelName}}',
      es: 'Nueva aplicación de voluntario para {{hostelName}}',
    },
    body: {
      en: `Hi {{hostelName}},

{{volunteerName}} has applied to volunteer at your hostel.

Volunteer Details:
• Name: {{volunteerName}}
• Skills: {{skills}}
• Available from: {{availableFrom}}

Review the application: https://hosteling.com/applications

Best regards,
The Hosteling Team`,
      es: `Hola {{hostelName}},

{{volunteerName}} ha aplicado para ser voluntario en tu albergue.

Detalles del Voluntario:
• Nombre: {{volunteerName}}
• Habilidades: {{skills}}
• Disponible desde: {{availableFrom}}

Revisa la aplicación: https://hosteling.com/applications

Saludos cordiales,
El Equipo de Hosteling`,
    },
  },
  {
    type: 'application_accepted',
    subject: {
      en: 'Your application to {{hostelName}} has been accepted! 🎉',
      es: '¡Tu aplicación a {{hostelName}} ha sido aceptada! 🎉',
    },
    body: {
      en: `Congratulations {{volunteerName}}!

Your application to volunteer at {{hostelName}} has been accepted.

Next steps:
1. Check your dashboard for contact details
2. Coordinate your arrival date
3. Prepare for an amazing experience!

View details: https://hosteling.com/dashboard

Safe travels!
The Hosteling Team`,
      es: `¡Felicidades {{volunteerName}}!

Tu aplicación para ser voluntario en {{hostelName}} ha sido aceptada.

Próximos pasos:
1. Revisa tu panel para detalles de contacto
2. Coordina tu fecha de llegada
3. ¡Prepárate para una experiencia increíble!

Ver detalles: https://hosteling.com/dashboard

¡Buen viaje!
El Equipo de Hosteling`,
    },
  },
];

class EmailService {
  private emailHistory: EmailNotification[] = [];

  constructor() {
    // Load email history from localStorage
    const saved = localStorage.getItem('hosteling-email-history');
    if (saved) {
      try {
        this.emailHistory = JSON.parse(saved).map((email: any) => ({
          ...email,
          sentAt: new Date(email.sentAt),
        }));
      } catch (error) {
        console.error('Error loading email history:', error);
      }
    }
  }

  private saveHistory() {
    localStorage.setItem('hosteling-email-history', JSON.stringify(this.emailHistory));
  }

  private replaceTemplateVariables(template: string, variables: Record<string, string>): string {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return result;
  }

  async sendEmail(
    templateType: string,
    to: string,
    variables: Record<string, string>,
    language: 'en' | 'es' = 'en',
    userId?: string
  ): Promise<EmailNotification> {
    const template = EMAIL_TEMPLATES.find(t => t.type === templateType);
    
    if (!template) {
      throw new Error(`Email template not found: ${templateType}`);
    }

    const subject = this.replaceTemplateVariables(template.subject[language], variables);
    const body = this.replaceTemplateVariables(template.body[language], variables);

    const email: EmailNotification = {
      id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      to,
      subject,
      body,
      type: templateType.split('_')[0] as EmailNotification['type'],
      sentAt: new Date(),
      status: 'sent', // In real app, this would be 'pending' initially
      userId,
    };

    this.emailHistory.push(email);
    this.saveHistory();

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 100));

    console.log('📧 Mock Email Sent:', {
      to: email.to,
      subject: email.subject,
      type: email.type,
    });

    return email;
  }

  getEmailHistory(userId?: string): EmailNotification[] {
    if (userId) {
      return this.emailHistory.filter(email => email.userId === userId);
    }
    return [...this.emailHistory].sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
  }

  getEmailsByType(type: EmailNotification['type']): EmailNotification[] {
    return this.emailHistory.filter(email => email.type === type);
  }

  getEmailStats() {
    const total = this.emailHistory.length;
    const byType = this.emailHistory.reduce((acc, email) => {
      acc[email.type] = (acc[email.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byStatus = this.emailHistory.reduce((acc, email) => {
      acc[email.status] = (acc[email.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, byType, byStatus };
  }

  // Helper methods for common email scenarios
  async sendWelcomeEmail(userType: 'volunteer' | 'hostel', userEmail: string, userData: any, language: 'en' | 'es' = 'en') {
    const templateType = `welcome_${userType}`;
    const variables = userType === 'volunteer' 
      ? { firstName: userData.firstName }
      : { hostelName: userData.hostelName };

    return this.sendEmail(templateType, userEmail, variables, language, userData.id);
  }

  async sendMessageNotification(recipientEmail: string, senderName: string, messagePreview: string, recipientName: string, language: 'en' | 'es' = 'en') {
    return this.sendEmail('new_message', recipientEmail, {
      recipientName,
      senderName,
      messagePreview,
    }, language);
  }

  async sendApplicationNotification(hostelEmail: string, volunteerData: any, hostelName: string, language: 'en' | 'es' = 'en') {
    return this.sendEmail('volunteer_application', hostelEmail, {
      hostelName,
      volunteerName: `${volunteerData.firstName} ${volunteerData.lastName}`,
      skills: volunteerData.skills?.join(', ') || 'Various skills',
      availableFrom: volunteerData.availability?.from || 'Flexible',
    }, language);
  }

  async sendApplicationAcceptedEmail(volunteerEmail: string, volunteerName: string, hostelName: string, language: 'en' | 'es' = 'en') {
    return this.sendEmail('application_accepted', volunteerEmail, {
      volunteerName,
      hostelName,
    }, language);
  }
}

export const emailService = new EmailService();