import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Avatar } from "../../ui/avatar";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { ArrowLeft, Send, Search, MoreVertical, Phone, Video, Info, Paperclip, Smile } from "lucide-react";

interface MessagesProps {
  onBack: () => void;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  online: boolean;
  type: 'hostel' | 'volunteer' | 'support';
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Mountain View Lodge",
    avatar: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Thanks for your application! We'd love to have you join our team.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 2,
    online: true,
    type: 'hostel',
    messages: [
      {
        id: "m1",
        senderId: "hostel",
        content: "Hi! Thanks for applying to volunteer with us at Mountain View Lodge.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        read: true
      },
      {
        id: "m2", 
        senderId: "user",
        content: "Hello! I'm really excited about the opportunity. I've been looking for a place where I can combine my love for mountains with helping others.",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        read: true
      },
      {
        id: "m3",
        senderId: "hostel", 
        content: "Perfect! Your experience with photography would be great for our social media. When are you available to start?",
        timestamp: new Date(Date.now() - 1000 * 60 * 40),
        read: true
      },
      {
        id: "m4",
        senderId: "hostel",
        content: "Thanks for your application! We'd love to have you join our team.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false
      }
    ]
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4d4?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Have you been to Thailand before? I'm planning my next trip!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 0,
    online: false,
    type: 'volunteer',
    messages: [
      {
        id: "m5",
        senderId: "volunteer",
        content: "Hey! I saw you're also volunteering in Southeast Asia. Have you been to Thailand before?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        read: true
      },
      {
        id: "m6",
        senderId: "user", 
        content: "Yes! I spent 2 months there last year. Bangkok and Chiang Mai were amazing. Are you planning to go?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
        read: true
      },
      {
        id: "m7",
        senderId: "volunteer",
        content: "Have you been to Thailand before? I'm planning my next trip!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: true
      }
    ]
  },
  {
    id: "3",
    name: "Hosteling Support",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Your verification has been completed successfully!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0,
    online: true,
    type: 'support',
    messages: [
      {
        id: "m8",
        senderId: "support",
        content: "Hi! We've reviewed your profile and documentation. Your verification has been completed successfully!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: true
      }
    ]
  },
  {
    id: "4",
    name: "Eco Green Hostel",
    avatar: "https://images.unsplash.com/photo-1518012312832-5b0b3b9c0b7a?w=100&h=100&fit=crop&crop=face",
    lastMessage: "We have an urgent need for a gardening volunteer starting next week.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    unreadCount: 1,
    online: false,
    type: 'hostel',
    messages: [
      {
        id: "m9",
        senderId: "hostel",
        content: "Hi! We have an urgent need for a gardening volunteer starting next week. Are you still interested?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        read: false
      }
    ]
  }
];

export function MessagesPage({ onBack }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    if (diff < 1000 * 60 * 60) {
      return `${Math.floor(diff / (1000 * 60))}m ago`;
    } else if (diff < 1000 * 60 * 60 * 24) {
      return `${Math.floor(diff / (1000 * 60 * 60))}h ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, this would send the message via API
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const selectedConv = mockConversations.find(c => c.id === selectedConversation);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="font-bold">Messages</h1>
            <div className="w-16" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          {/* Conversations List */}
          <div className={`border-r ${selectedConversation ? 'hidden lg:block' : ''}`}>
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100%-80px)]">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                    selectedConversation === conversation.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <ImageWithFallback
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">{conversation.name}</h3>
                        <div className="flex items-center space-x-1">
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center p-0">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(conversation.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {conversation.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`lg:col-span-2 flex flex-col ${!selectedConversation ? 'hidden lg:flex' : ''}`}>
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="lg:hidden"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Avatar className="w-10 h-10">
                      <ImageWithFallback
                        src={selectedConv.avatar}
                        alt={selectedConv.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedConv.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedConv.online ? 'Online' : 'Offline'}
                      </p>
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
                      <Info className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConv.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === 'user' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {formatTimestamp(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            sendMessage();
                          }
                        }}
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button 
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">
                    Choose from your existing conversations or start a new one
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}