import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { 
  Users, 
  Building2, 
  Mail, 
  BarChart3, 
  Shield, 
  LogOut,
  Eye,
  Edit,
  Trash2,
  Send,
  UserCheck,
  MessageCircle,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../shared/contexts/LanguageContext';
import { emailService, EmailNotification } from '../services/emailService';
import { LocalStorageManager } from '../../components/utils/local-storage';

// Mock data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    type: 'volunteer',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    location: 'Barcelona, Spain',
    joinDate: '2024-01-15',
    status: 'active',
    applications: 3,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '2',
    type: 'volunteer',
    name: 'Mike Chen',
    email: 'mike@example.com',
    location: 'Bangkok, Thailand',
    joinDate: '2024-02-20',
    status: 'active',
    applications: 1,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '3',
    type: 'hostel',
    name: 'Barcelona Beach Hostel',
    email: 'contact@barcelonabeach.com',
    location: 'Barcelona, Spain',
    joinDate: '2024-01-10',
    status: 'verified',
    applications: 12,
    avatar: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=50&h=50&fit=crop'
  },
  {
    id: '4',
    type: 'hostel',
    name: 'Lisbon Central Hostel',
    email: 'info@lisboncentral.com',
    location: 'Lisbon, Portugal',
    joinDate: '2024-03-01',
    status: 'pending',
    applications: 5,
    avatar: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=50&h=50&fit=crop'
  }
];

export const AdminDashboardPage: React.FC = () => {
  const [emailHistory, setEmailHistory] = useState<EmailNotification[]>([]);
  const [stats, setStats] = useState({ total: 0, byType: {}, byStatus: {} });
  
  const { adminUser, adminLogout, hasPermission } = useAdmin();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Load email history and stats
    setEmailHistory(emailService.getEmailHistory());
    setStats(emailService.getEmailStats());
  }, []);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const handleSendTestEmail = async () => {
    try {
      await emailService.sendEmail(
        'welcome_volunteer',
        'test@example.com',
        { firstName: 'Test User' },
        language
      );
      
      // Refresh data
      setEmailHistory(emailService.getEmailHistory());
      setStats(emailService.getEmailStats());
      
      alert('Test email sent successfully!');
    } catch (error) {
      alert('Error sending test email');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: 'default',
      verified: 'default',
      pending: 'secondary',
      inactive: 'destructive'
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  const getEmailTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      welcome: 'bg-green-100 text-green-800',
      message: 'bg-blue-100 text-blue-800',
      request: 'bg-purple-100 text-purple-800',
      application: 'bg-orange-100 text-orange-800',
      system: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge className={colors[type] || 'bg-gray-100 text-gray-800'}>
        {type}
      </Badge>
    );
  };

  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Hosteling Admin</span>
              </div>
              <Badge variant="outline" className="ml-4">
                {adminUser.role.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {adminUser.username}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.title')}</h1>
          <p className="text-gray-600 mt-2">
            Manage users, hostels, and system notifications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">247</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Hostels</p>
                  <p className="text-2xl font-bold text-gray-900">89</p>
                </div>
                <Building2 className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Mail className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">+23%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{t('admin.users')}</span>
            </TabsTrigger>
            <TabsTrigger value="hostels" className="flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span>{t('admin.hostels')}</span>
            </TabsTrigger>
            <TabsTrigger value="emails" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Emails</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>{t('admin.statistics')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage all registered users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_USERS.filter(user => user.type === 'volunteer').map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.type}</Badge>
                        </TableCell>
                        <TableCell>{user.location}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.applications}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {hasPermission('edit_users') && (
                              <Button size="sm" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
                            {hasPermission('delete_users') && (
                              <Button size="sm" variant="ghost">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hostels Tab */}
          <TabsContent value="hostels">
            <Card>
              <CardHeader>
                <CardTitle>Hostel Management</CardTitle>
                <CardDescription>
                  View and manage all registered hostels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hostel</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_USERS.filter(user => user.type === 'hostel').map((hostel) => (
                      <TableRow key={hostel.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={hostel.avatar} alt={hostel.name} />
                              <AvatarFallback>
                                {hostel.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{hostel.name}</div>
                              <div className="text-sm text-gray-500">{hostel.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{hostel.location}</TableCell>
                        <TableCell>{getStatusBadge(hostel.status)}</TableCell>
                        <TableCell>{hostel.applications}</TableCell>
                        <TableCell>{hostel.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {hasPermission('edit_hostels') && (
                              <Button size="sm" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
                            {hasPermission('delete_hostels') && (
                              <Button size="sm" variant="ghost">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emails Tab */}
          <TabsContent value="emails">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Manage and monitor email communications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-6">
                    {hasPermission('send_emails') && (
                      <Button onClick={handleSendTestEmail}>
                        <Send className="w-4 h-4 mr-2" />
                        Send Test Email
                      </Button>
                    )}
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sent At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {emailHistory.slice(0, 10).map((email) => (
                        <TableRow key={email.id}>
                          <TableCell>{email.to}</TableCell>
                          <TableCell className="max-w-xs truncate">{email.subject}</TableCell>
                          <TableCell>{getEmailTypeBadge(email.type)}</TableCell>
                          <TableCell>
                            <Badge variant={email.status === 'sent' ? 'default' : 'secondary'}>
                              {email.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{email.sentAt.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Emails Sent</span>
                      <Badge>{stats.total}</Badge>
                    </div>
                    {Object.entries(stats.byType).map(([type, count]) => (
                      <div key={type} className="flex justify-between items-center">
                        <span className="capitalize">{type} Emails</span>
                        <Badge variant="outline">{count as number}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Active Users</span>
                      <Badge>158</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>New Registrations (This Week)</span>
                      <Badge variant="outline">23</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Applications Submitted</span>
                      <Badge variant="outline">89</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Messages Sent</span>
                      <Badge variant="outline">234</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};