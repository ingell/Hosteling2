import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es';

interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

const translations: Translations = {
  // Header
  'header.dashboard': { en: 'Dashboard', es: 'Panel' },
  'header.browse': { en: 'Browse', es: 'Explorar' },
  'header.community': { en: 'Community', es: 'Comunidad' },
  'header.howItWorks': { en: 'How it works', es: 'Cómo funciona' },
  'header.forHostels': { en: 'For Hostels', es: 'Para Albergues' },
  'header.login': { en: 'Login', es: 'Iniciar sesión' },
  'header.signup': { en: 'Sign up', es: 'Registrarse' },
  'header.logout': { en: 'Logout', es: 'Cerrar sesión' },
  'header.admin': { en: 'Admin', es: 'Admin' },

  // Navigation
  'nav.home': { en: 'Home', es: 'Inicio' },
  'nav.about': { en: 'About', es: 'Acerca de' },
  'nav.help': { en: 'Help Center', es: 'Centro de Ayuda' },
  'nav.contact': { en: 'Contact', es: 'Contacto' },
  'nav.terms': { en: 'Terms', es: 'Términos' },
  'nav.privacy': { en: 'Privacy', es: 'Privacidad' },
  'nav.safety': { en: 'Safety Guidelines', es: 'Pautas de Seguridad' },

  // Landing page
  'landing.hero.title': { 
    en: 'Volunteer at hostels worldwide', 
    es: 'Voluntariado en albergues en todo el mundo' 
  },
  'landing.hero.subtitle': { 
    en: 'Exchange your skills for free accommodation at amazing hostels around the globe',
    es: 'Intercambia tus habilidades por alojamiento gratuito en increíbles albergues de todo el mundo'
  },
  'landing.hero.startVolunteering': { en: 'Start Volunteering', es: 'Comenzar Voluntariado' },
  'landing.hero.findVolunteers': { en: 'Find Volunteers', es: 'Encontrar Voluntarios' },

  // Login/Signup
  'auth.email': { en: 'Email', es: 'Correo electrónico' },
  'auth.password': { en: 'Password', es: 'Contraseña' },
  'auth.firstName': { en: 'First Name', es: 'Nombre' },
  'auth.lastName': { en: 'Last Name', es: 'Apellido' },
  'auth.phone': { en: 'Phone', es: 'Teléfono' },
  'auth.volunteer': { en: 'Volunteer', es: 'Voluntario' },
  'auth.hostel': { en: 'Hostel', es: 'Albergue' },
  'auth.welcomeBack': { en: 'Welcome back!', es: '¡Bienvenido de nuevo!' },
  'auth.loginFailed': { en: 'Login Failed', es: 'Error de Inicio de Sesión' },
  'auth.signupSuccess': { en: 'Account created successfully!', es: '¡Cuenta creada exitosamente!' },

  // Dashboard
  'dashboard.welcomeVolunteer': { en: 'Welcome back, Volunteer!', es: '¡Bienvenido de nuevo, Voluntario!' },
  'dashboard.welcomeHostel': { en: 'Welcome back, Hostel!', es: '¡Bienvenido de nuevo, Albergue!' },
  'dashboard.applications': { en: 'Applications', es: 'Aplicaciones' },
  'dashboard.messages': { en: 'Messages', es: 'Mensajes' },
  'dashboard.profile': { en: 'Profile', es: 'Perfil' },
  'dashboard.notifications': { en: 'Notifications', es: 'Notificaciones' },

  // Admin
  'admin.title': { en: 'Admin Dashboard', es: 'Panel de Administración' },
  'admin.users': { en: 'Users', es: 'Usuarios' },
  'admin.hostels': { en: 'Hostels', es: 'Albergues' },
  'admin.volunteers': { en: 'Volunteers', es: 'Voluntarios' },
  'admin.statistics': { en: 'Statistics', es: 'Estadísticas' },
  'admin.emailNotifications': { en: 'Email Notifications', es: 'Notificaciones por Email' },
  'admin.login': { en: 'Admin Login', es: 'Acceso de Administrador' },
  'admin.password': { en: 'Admin Password', es: 'Contraseña de Administrador' },
  'admin.loginButton': { en: 'Login as Admin', es: 'Iniciar sesión como Admin' },

  // Email notifications
  'email.welcome.subject': { en: 'Welcome to Hosteling!', es: '¡Bienvenido a Hosteling!' },
  'email.welcome.body': { 
    en: 'Thank you for joining Hosteling. Start exploring opportunities now!',
    es: 'Gracias por unirte a Hosteling. ¡Comienza a explorar oportunidades ahora!'
  },
  'email.message.subject': { en: 'New message received', es: 'Nuevo mensaje recibido' },
  'email.request.subject': { en: 'New volunteer request', es: 'Nueva solicitud de voluntario' },
  'email.application.subject': { en: 'Application update', es: 'Actualización de aplicación' },

  // Forms
  'form.save': { en: 'Save', es: 'Guardar' },
  'form.cancel': { en: 'Cancel', es: 'Cancelar' },
  'form.submit': { en: 'Submit', es: 'Enviar' },
  'form.update': { en: 'Update', es: 'Actualizar' },
  'form.delete': { en: 'Delete', es: 'Eliminar' },
  'form.edit': { en: 'Edit', es: 'Editar' },
  'form.view': { en: 'View', es: 'Ver' },

  // Browse page
  'browse.foundOpportunities': { en: 'Found {count} opportunities', es: '{count} oportunidades encontradas' },
  'browse.featuredOpportunities': { en: 'Featured Opportunities', es: 'Oportunidades Destacadas' },
  'browse.volunteersNeeded': { en: 'Volunteers needed', es: 'Voluntarios necesarios' },
  'browse.commitment': { en: 'Commitment', es: 'Compromiso' },
  'browse.tasks': { en: 'Tasks', es: 'Tareas' },

  // Dashboard
  'dashboard.welcome': { en: 'Welcome back, {name}!', es: '¡Bienvenido de nuevo, {name}!' },
  'dashboard.welcomeVolunteerDesc': { en: 'Here\'s what\'s happening with your volunteer journey', es: 'Esto es lo que está pasando en tu viaje de voluntariado' },
  'dashboard.welcomeHostelDesc': { en: 'Here\'s what\'s happening at your hostel', es: 'Esto es lo que está pasando en tu albergue' },
  'dashboard.overview': { en: 'Overview', es: 'Resumen' },
  'dashboard.opportunities': { en: 'Browse', es: 'Explorar' },
  'dashboard.saved': { en: 'Saved', es: 'Guardados' },
  'dashboard.applications': { en: 'Applications', es: 'Aplicaciones' },
  'dashboard.requests': { en: 'Requests', es: 'Solicitudes' },
  'dashboard.volunteers': { en: 'Browse Volunteers', es: 'Explorar Voluntarios' },
  'dashboard.analytics': { en: 'Analytics', es: 'Análisis' },
  'dashboard.completed': { en: 'Completed', es: 'Completados' },
  'dashboard.rating': { en: 'Rating', es: 'Calificación' },
  'dashboard.daysLeft': { en: 'Days Left', es: 'Días Restantes' },
  'dashboard.current': { en: 'Current', es: 'Actual' },
  'dashboard.pending': { en: 'Pending', es: 'Pendiente' },
  'dashboard.totalVolunteers': { en: 'Total Volunteers', es: 'Total Voluntarios' },
  'dashboard.currentlyVolunteering': { en: 'Currently Volunteering', es: 'Actualmente Haciendo Voluntariado' },
  'dashboard.noActiveVolunteering': { en: 'No active volunteering positions', es: 'No hay posiciones de voluntariado activas' },
  'dashboard.applyToStart': { en: 'Apply to hostels to start your volunteer journey!', es: '¡Postúlate a albergues para comenzar tu viaje de voluntariado!' },
  'dashboard.recommendedForYou': { en: 'Recommended for You', es: 'Recomendado para Ti' },
  'dashboard.noRecommendations': { en: 'No recommendations yet', es: 'Aún no hay recomendaciones' },
  'dashboard.completeProfile': { en: 'Complete your profile to get personalized recommendations!', es: '¡Completa tu perfil para obtener recomendaciones personalizadas!' },
  'dashboard.browseOpportunities': { en: 'Browse Opportunities', es: 'Explorar Oportunidades' },
  'dashboard.recentActivity': { en: 'Recent Activity', es: 'Actividad Reciente' },
  'dashboard.noRecentActivity': { en: 'No recent activity', es: 'No hay actividad reciente' },
  'dashboard.volunteerActivities': { en: 'Your volunteer activities will appear here', es: 'Tus actividades de voluntariado aparecerán aquí' },
  'dashboard.savedOpportunities': { en: 'Saved Opportunities', es: 'Oportunidades Guardadas' },
  'dashboard.noSavedOpportunities': { en: 'No saved opportunities', es: 'No hay oportunidades guardadas' },
  'dashboard.heartToSave': { en: 'Heart opportunities while browsing to save them here!', es: '¡Dale corazón a las oportunidades mientras navegas para guardarlas aquí!' },
  'dashboard.discoverOpportunities': { en: 'Discover Amazing Opportunities', es: 'Descubre Oportunidades Increíbles' },
  'dashboard.browseThousands': { en: 'Browse thousands of volunteer opportunities worldwide', es: 'Explora miles de oportunidades de voluntariado en todo el mundo' },
  'dashboard.startBrowsing': { en: 'Start Browsing', es: 'Comenzar a Explorar' },
  'dashboard.browseAllHostels': { en: 'Browse All Hostels', es: 'Explorar Todos los Albergues' },
  'dashboard.noApplications': { en: 'No applications yet', es: 'Aún no hay aplicaciones' },
  'dashboard.applicationsAppear': { en: 'Your applications to hostels will appear here', es: 'Tus aplicaciones a albergues aparecerán aquí' },
  'dashboard.hostelsWantYou': { en: 'Hostels that want you to volunteer will send requests here', es: 'Los albergues que quieren que hagas voluntariado enviarán solicitudes aquí' },
  'dashboard.viewRequests': { en: 'View Requests', es: 'Ver Solicitudes' },
  'dashboard.viewAllRequests': { en: 'View All Requests', es: 'Ver Todas las Solicitudes' },

  // About page
  'about.title': { en: 'About Hosteling', es: 'Acerca de Hosteling' },
  'about.back': { en: 'Back', es: 'Atrás' },
  'about.getStarted': { en: 'Get Started', es: 'Comenzar' },
  'about.makingTravelAccessible': { en: 'Making travel accessible through community', es: 'Haciendo el viaje accesible a través de la comunidad' },
  'about.mission': { en: 'We\'re on a mission to connect passionate travelers with amazing hostels worldwide, creating opportunities for authentic cultural exchange while making travel more affordable.', es: 'Tenemos la misión de conectar viajeros apasionados con albergues increíbles en todo el mundo, creando oportunidades para el intercambio cultural auténtico mientras hacemos el viaje más asequible.' },
  'about.countries': { en: 'Countries', es: 'Países' },
  'about.volunteers': { en: 'Volunteers', es: 'Voluntarios' },
  'about.partnerHostels': { en: 'Partner Hostels', es: 'Albergues Socios' },
  'about.freePlatform': { en: 'Free Platform', es: 'Plataforma Gratuita' },
  'about.ourStory': { en: 'Our Story', es: 'Nuestra Historia' },
  'about.ourValues': { en: 'Our Values', es: 'Nuestros Valores' },
  'about.valuesDescription': { en: 'These principles guide everything we do and shape the community we\'re building together.', es: 'Estos principios guían todo lo que hacemos y dan forma a la comunidad que estamos construyendo juntos.' },
  'about.communityFirst': { en: 'Community First', es: 'Comunidad Primero' },
  'about.sustainableTravel': { en: 'Sustainable Travel', es: 'Viaje Sostenible' },
  'about.equalAccess': { en: 'Equal Access', es: 'Acceso Igualitario' },
  'about.authenticExperiences': { en: 'Authentic Experiences', es: 'Experiencias Auténticas' },
  'about.meetOurTeam': { en: 'Meet Our Team', es: 'Conoce Nuestro Equipo' },
  'about.teamDescription': { en: 'A passionate group of travelers, hostel experts, and community builders dedicated to making travel accessible for everyone.', es: 'Un grupo apasionado de viajeros, expertos en albergues y constructores de comunidad dedicados a hacer que el viaje sea accesible para todos.' },
  'about.ourImpact': { en: 'Our Impact', es: 'Nuestro Impacto' },
  'about.savedByVolunteers': { en: 'Saved by volunteers', es: 'Ahorrado por voluntarios' },
  'about.citiesCovered': { en: 'Cities covered', es: 'Ciudades cubiertas' },
  'about.averageRating': { en: 'Average rating', es: 'Calificación promedio' },
  'about.joinCommunity': { en: 'Join Our Community', es: 'Únete a Nuestra Comunidad' },
  'about.joinDescription': { en: 'Ready to start your volunteer journey? Join thousands of travelers who are exploring the world while making a positive impact on local communities.', es: '¿Listo para comenzar tu viaje de voluntariado? Únete a miles de viajeros que están explorando el mundo mientras hacen un impacto positivo en las comunidades locales.' },
  'about.getStartedToday': { en: 'Get Started Today', es: 'Comenzar Hoy' },

  // General
  'general.loading': { en: 'Loading...', es: 'Cargando...' },
  'general.loadingProfile': { en: 'Loading your profile...', es: 'Cargando tu perfil...' },
  'general.search': { en: 'Search', es: 'Buscar' },
  'general.filter': { en: 'Filter', es: 'Filtrar' },
  'general.location': { en: 'Location', es: 'Ubicación' },
  'general.skills': { en: 'Skills', es: 'Habilidades' },
  'general.languages': { en: 'Languages', es: 'Idiomas' },
  'general.availability': { en: 'Availability', es: 'Disponibilidad' },
  'general.description': { en: 'Description', es: 'Descripción' },
  'general.reviews': { en: 'Reviews', es: 'Reseñas' },
  'general.amenities': { en: 'Amenities', es: 'Servicios' },
  'general.apply': { en: 'Apply', es: 'Aplicar' },
  'general.contact': { en: 'Contact', es: 'Contactar' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on app start
  useEffect(() => {
    const savedLanguage = localStorage.getItem('hosteling-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('hosteling-language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (translation) {
      return translation[language];
    }
    // Return the key if translation is not found (for development)
    console.warn(`Translation missing for key: ${key}`);
    return key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};