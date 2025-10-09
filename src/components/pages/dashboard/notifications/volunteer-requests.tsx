import React, { useState, useEffect } from "react";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { Textarea } from "../../../ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog";
import { API, VolunteerRequest } from "../../../utils/api";
import { LocalStorageManager } from "../../../utils/local-storage";
import { Check, X, Clock, MessageCircle, ArrowLeft, Calendar, MapPin, Star } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface VolunteerRequestsProps {
  onBack: () => void;
}

export function VolunteerRequests({ onBack }: VolunteerRequestsProps) {
  const [requests, setRequests] = useState<VolunteerRequest[]>([]);
  const [activeTab, setActiveTab] = useState("received");
  const [selectedRequest, setSelectedRequest] = useState<VolunteerRequest | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  const [userType, setUserType] = useState<"volunteer" | "hostel">("volunteer");

  useEffect(() => {
    const userData = LocalStorageManager.getUserData();
    if (userData) {
      setUserType(userData.type);
      loadRequests(userData);
    }
  }, []);

  const loadRequests = async (userData: any) => {
    try {
      let allRequests: VolunteerRequest[] = [];
      
      if (userData.type === 'volunteer') {
        allRequests = await API.getVolunteerRequests(userData.id);
      } else {
        allRequests = await API.getHostelRequests(userData.id);
      }
      
      setRequests(allRequests);
    } catch (error) {
      console.error('Failed to load requests:', error);
    }
  };

  const handleResponse = async (requestId: string, response: 'accepted' | 'declined') => {
    setIsResponding(true);
    try {
      await API.respondToVolunteerRequest(requestId, response, responseMessage);
      
      toast.success(`Request ${response} successfully!`);
      
      // Reload requests
      const userData = LocalStorageManager.getUserData();
      if (userData) {
        await loadRequests(userData);
      }
      
      setSelectedRequest(null);
      setResponseMessage("");
    } catch (error) {
      toast.error("Failed to respond to request");
    } finally {
      setIsResponding(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const respondedRequests = requests.filter(r => r.status !== 'pending');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl mt-2">
                {userType === 'volunteer' ? 'Volunteer Requests' : 'Volunteer Requests Sent'}
              </h1>
              <p className="text-muted-foreground">
                {userType === 'volunteer' 
                  ? 'Manage requests from hostels to volunteer'
                  : 'Track your volunteer requests to potential volunteers'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="received">
              {userType === 'volunteer' ? 'Received' : 'Sent'} 
              {pendingRequests.length > 0 && (
                <Badge className="ml-2 bg-orange-500">{pendingRequests.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-6">
            {pendingRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg mb-2">No Pending Requests</h3>
                  <p className="text-muted-foreground">
                    {userType === 'volunteer' 
                      ? "You don't have any pending volunteer requests from hostels."
                      : "You haven't sent any volunteer requests yet."
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`} />
                              <AvatarFallback>
                                {userType === 'volunteer' 
                                  ? request.hostelName.substring(0, 2).toUpperCase()
                                  : request.volunteerName.substring(0, 2).toUpperCase()
                                }
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">
                                {userType === 'volunteer' ? request.hostelName : request.volunteerName}
                              </h3>
                              <p className="text-sm text-muted-foreground flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                Requested: {new Date(request.requestedDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-muted-foreground">{request.message}</p>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            {request.position && (
                              <Badge variant="outline">{request.position}</Badge>
                            )}
                            {request.duration && (
                              <span>Duration: {request.duration}</span>
                            )}
                            {request.startDate && (
                              <span>Start: {new Date(request.startDate).toLocaleDateString()}</span>
                            )}
                          </div>

                          {userType === 'volunteer' && (
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    onClick={() => setSelectedRequest(request)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <Check className="w-4 h-4 mr-2" />
                                    Accept
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Accept Volunteer Request</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <p>
                                      Are you sure you want to accept the volunteer request from {request.hostelName}?
                                    </p>
                                    <div>
                                      <label className="text-sm font-medium">Optional Message</label>
                                      <Textarea
                                        placeholder="Add a message to the hostel..."
                                        value={responseMessage}
                                        onChange={(e) => setResponseMessage(e.target.value)}
                                        className="mt-1"
                                      />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                      <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                                        Cancel
                                      </Button>
                                      <Button 
                                        onClick={() => handleResponse(request.id, 'accepted')}
                                        disabled={isResponding}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        {isResponding ? 'Accepting...' : 'Accept Request'}
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setSelectedRequest(request)}
                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                  >
                                    <X className="w-4 h-4 mr-2" />
                                    Decline
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Decline Volunteer Request</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <p>
                                      Are you sure you want to decline the volunteer request from {request.hostelName}?
                                    </p>
                                    <div>
                                      <label className="text-sm font-medium">Optional Message</label>
                                      <Textarea
                                        placeholder="Explain why you're declining (optional)..."
                                        value={responseMessage}
                                        onChange={(e) => setResponseMessage(e.target.value)}
                                        className="mt-1"
                                      />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                      <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                                        Cancel
                                      </Button>
                                      <Button 
                                        onClick={() => handleResponse(request.id, 'declined')}
                                        disabled={isResponding}
                                        variant="destructive"
                                      >
                                        {isResponding ? 'Declining...' : 'Decline Request'}
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </div>

                        <Badge className={getStatusColor(request.status)} variant="outline">
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {respondedRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg mb-2">No Request History</h3>
                  <p className="text-muted-foreground">
                    Requests you've responded to will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {respondedRequests.map((request) => (
                  <Card key={request.id} className="opacity-80">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`} />
                              <AvatarFallback>
                                {userType === 'volunteer' 
                                  ? request.hostelName.substring(0, 2).toUpperCase()
                                  : request.volunteerName.substring(0, 2).toUpperCase()
                                }
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">
                                {userType === 'volunteer' ? request.hostelName : request.volunteerName}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {request.responseDate 
                                  ? `Responded: ${new Date(request.responseDate).toLocaleDateString()}`
                                  : `Requested: ${new Date(request.requestedDate).toLocaleDateString()}`
                                }
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">{request.message}</p>
                        </div>

                        <Badge className={getStatusColor(request.status)} variant="outline">
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}