import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { LocalStorageManager } from "./utils/local-storage";
import { Search, MessageCircle, Send, Phone, Video, MoreVertical, ArrowLeft, Paperclip, Smile } from "lucide-react";

interface MessagesProps {
  onBack: () => void;
  userType: 'volunteer' | 'hostel';
}

// Sample conversation structure - in real app this would come from backend
const getSampleConversations = () => [
  {
    id: "1",
    participantName: "Example User",
    participantAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=40&h=40&fit=crop&crop=face",
    participantType: "volunteer" as const,
    lastMessage: "Thanks for considering my application! I'm very excited about the opportunity.",
    lastMessageTime: "2 minutes ago",
    unreadCount: 2,
    online: true,
    messages: [
      {
        id: "1",
        senderId: "volunteer_1",
        content: "Hi! I'm interested in volunteering at your hostel. I saw your listing for social media help.",
        timestamp: "2024-11-20T10:00:00Z",
        read: true
      },
      {
        id: "2", 
        senderId: "hostel_1",
        content: "Hello Sarah! Thanks for your interest. I'd love to learn more about your experience with social media.",
        timestamp: "2024-11-20T10:15:00Z",
        read: true
      },
      {
        id: "3",
        senderId: "volunteer_1", 
        content: "I've been managing Instagram and TikTok accounts for the past 2 years. I helped my previous hostel increase their followers by 300%!",
        timestamp: "2024-11-20T10:30:00Z",
        read: true
      },
      {
        id: "4",
        senderId: "hostel_1",
        content: "That's impressive! What kind of content strategies did you use?",
        timestamp: "2024-11-20T10:45:00Z", 
        read: true
      },
      {
        id: "5",
        senderId: "volunteer_1",
        content: "I focused on behind-the-scenes content, guest stories, and local attractions. I also did live Q&As which were really popular.",
        timestamp: "2024-11-20T11:00:00Z",
        read: true
      },
      {
        id: "6",
        senderId: "hostel_1", 
        content: "Perfect! When would you be available to start? We're looking for someone to begin in January.",
        timestamp: "2024-11-20T11:15:00Z",
        read: true
      },
      {
        id: "7",
        senderId: "volunteer_1",
        content: "Thanks for considering my application! I'm very excited about the opportunity.",
        timestamp: "2024-11-20T11:30:00Z",
        read: false
      }
    ]
  },
  {
    id: "2",
    participantName: "Nomad's Paradise Bangkok",
    participantAvatar: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=40&h=40&fit=crop",
    participantType: "hostel" as const,
    lastMessage: "Great! We'd love to have you join our team in February.",
    lastMessageTime: "1 hour ago", 
    unreadCount: 0,
    online: false,
    messages: [
      {
        id: "1",
        senderId: "volunteer_2",
        content: "Hello! I'm planning a trip to Bangkok and would love to volunteer at your hostel.",
        timestamp: "2024-11-20T09:00:00Z",
        read: true
      },
      {
        id: "2",
        senderId: "hostel_2", 
        content: "Hi! We'd be happy to have you. What kind of work are you interested in?",
        timestamp: "2024-11-20T09:30:00Z",
        read: true
      },
      {
        id: "3",
        senderId: "volunteer_2",
        content: "I'm experienced with reception work and I speak English, Spanish, and some Thai.",
        timestamp: "2024-11-20T09:45:00Z",
        read: true
      },
      {
        id: "4",
        senderId: "hostel_2",
        content: "Great! We'd love to have you join our team in February.",
        timestamp: "2024-11-20T10:00:00Z", 
        read: true
      }
    ]
  },
  {
    id: "3",
    participantName: "Jake Morrison", 
    participantAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    participantType: "volunteer" as const,
    lastMessage: "I can start next week if that works for you!",
    lastMessageTime: "3 hours ago",
    unreadCount: 1,
    online: true,
    messages: [
      {
        id: "1",
        senderId: "volunteer_3",
        content: "Hi! I saw your urgent posting for reception help. I'm available immediately.",
        timestamp: "2024-11-20T08:00:00Z", 
        read: true
      },
      {
        id: "2",
        senderId: "hostel_3",
        content: "That's perfect timing! Can you tell me about your previous hostel experience?",
        timestamp: "2024-11-20T08:15:00Z",
        read: true
      },
      {
        id: "3", 
        senderId: "volunteer_3",
        content: "I've worked at 5 different hostels across Europe. I'm great with check-ins and helping guests with local recommendations.",
        timestamp: "2024-11-20T08:30:00Z",
        read: true
      },
      {
        id: "4",
        senderId: "volunteer_3",
        content: "I can start next week if that works for you!",
        timestamp: "2024-11-20T08:45:00Z",
        read: false
      }
    ]
  }
];

export function Messages({ onBack, userType }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState(getSampleConversations());

  // Load messages from localStorage on mount
  useEffect(() => {
    const storedMessages = LocalStorageManager.getMessages();
    // In a real app, you'd merge stored messages with conversations
  }, []);

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);
  const currentUserId = userType === 'volunteer' ? 'volunteer_current' : 'hostel_current';
  
  // Determine if current user is the sender based on message patterns
  const isCurrentUserMessage = (message: any) => {
    // For volunteers: they are senders of volunteer_X messages
    // For hostels: they are senders of hostel_X messages
    if (userType === 'volunteer') {
      return message.senderId.startsWith('volunteer_') || message.senderId === currentUserId;
    } else {
      return message.senderId.startsWith('hostel_') || message.senderId === currentUserId;
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: true
    };

    // Update conversation
    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          lastMessage: newMessage.trim(),
          lastMessageTime: "just now"
        };
      }
      return conv;
    }));

    // Save to localStorage
    LocalStorageManager.addMessage({
      conversationId: selectedConversation,
      content: newMessage.trim(),
      senderId: currentUserId,
      recipientName: selectedConv?.participantName
    });

    setNewMessage("");
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map(msg => ({ ...msg, read: true }))
        };
      }
      return conv;
    }));
  };

  if (selectedConversation && selectedConv) {
    return (
      <div className="flex flex-col h-screen bg-background">
        {/* Chat Header */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setSelectedConversation(null)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Avatar>
                <AvatarImage src={selectedConv.participantAvatar} alt={selectedConv.participantName} />
                <AvatarFallback>{selectedConv.participantName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedConv.participantName}</h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${selectedConv.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-muted-foreground">
                    {selectedConv.online ? 'Online' : 'Offline'}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {selectedConv.participantType}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {selectedConv.messages.map((message, index) => {
              const isOwn = isCurrentUserMessage(message);
              const showTime = index === 0 || 
                new Date(message.timestamp).getTime() - new Date(selectedConv.messages[index - 1].timestamp).getTime() > 300000; // 5 minutes

              return (
                <div key={message.id}>
                  {showTime && (
                    <div className="text-center text-xs text-muted-foreground my-4">
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                  )}
                  <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-lg ${
                      isOwn 
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white' 
                        : 'bg-gray-100 text-gray-900 border'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        isOwn ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <div className="flex-1 relative">
              <Textarea
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                rows={1}
                className="resize-none"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>
            <Button onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" onClick={onBack}>
                ← Back to Dashboard
              </Button>
              <h1 className="text-2xl mt-2">Messages</h1>
              <p className="text-muted-foreground">Communicate with {userType === 'volunteer' ? 'hostels' : 'volunteers'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="space-y-2">
          {filteredConversations.map((conversation) => (
            <Card 
              key={conversation.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedConversation(conversation.id);
                markAsRead(conversation.id);
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.participantAvatar} alt={conversation.participantName} />
                      <AvatarFallback>{conversation.participantName.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium truncate">{conversation.participantName}</h3>
                        <Badge variant="outline" className="text-xs">
                          {conversation.participantType}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {conversation.lastMessageTime}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredConversations.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg mb-2">No conversations yet</h3>
            <p className="text-muted-foreground">
              {userType === 'volunteer' 
                ? "Start applying to hostels to begin conversations" 
                : "Volunteers will appear here when they contact you"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}