import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Search, Send, Paperclip, Archive, Trash2, MessageCircle } from "lucide-react";
import LoggedInNavbar from "@/components/LoggedInNavbar";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  seller: {
    name: string;
    avatar: string;
    initials: string;
    isOnline: boolean;
  };
  gig: {
    title: string;
    orderNumber: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const conversations: Conversation[] = [
    {
      id: "1",
      seller: {
        name: "Sarah Johnson",
        avatar: "",
        initials: "SJ",
        isOnline: true
      },
      gig: {
        title: "Social Media Content Creation",
        orderNumber: "ORD-2024-001"
      },
      lastMessage: "I'll have the first draft ready by tomorrow morning!",
      lastMessageTime: "2 min ago",
      unreadCount: 2,
      messages: [
        {
          id: "1",
          senderId: "seller",
          content: "Hi! Thanks for placing the order. I'm excited to work on your social media content. Do you have any specific brand guidelines I should follow?",
          timestamp: "10:30 AM",
          isRead: true
        },
        {
          id: "2",
          senderId: "buyer",
          content: "Hello! Yes, I'll send you our brand guidelines. We prefer a modern, minimalist style with our brand colors.",
          timestamp: "10:35 AM",
          isRead: true
        },
        {
          id: "3",
          senderId: "seller",
          content: "Perfect! Could you also share some examples of content you like? This will help me understand your preferences better.",
          timestamp: "10:40 AM",
          isRead: true
        },
        {
          id: "4",
          senderId: "seller",
          content: "I'll have the first draft ready by tomorrow morning!",
          timestamp: "11:15 AM",
          isRead: false
        }
      ]
    },
    {
      id: "2",
      seller: {
        name: "Mike Chen",
        avatar: "",
        initials: "MC",
        isOnline: false
      },
      gig: {
        title: "Logo Design Package",
        orderNumber: "ORD-2024-002"
      },
      lastMessage: "The logo concepts are ready for review",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
      messages: [
        {
          id: "1",
          senderId: "seller",
          content: "Hi! I've started working on your logo design. The logo concepts are ready for review",
          timestamp: "Yesterday 3:20 PM",
          isRead: true
        }
      ]
    },
    {
      id: "3",
      seller: {
        name: "Emma Wilson",
        avatar: "",
        initials: "EW",
        isOnline: true
      },
      gig: {
        title: "Website Copywriting",
        orderNumber: "ORD-2024-003"
      },
      lastMessage: "When would be a good time for a quick call?",
      lastMessageTime: "3 hours ago",
      unreadCount: 1,
      messages: [
        {
          id: "1",
          senderId: "seller",
          content: "When would be a good time for a quick call?",
          timestamp: "Today 8:30 AM",
          isRead: false
        }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conversation =>
    conversation.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.gig.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConv) return;
    
    // Mock sending message
    setNewMessage("");
    console.log("Sending message:", newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LoggedInNavbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-heading-dark">Messages</h1>
            <p className="text-text-secondary">Communicate with your sellers</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations Sidebar */}
          <div className="lg:col-span-1 border rounded-lg bg-card">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
              {filteredConversations.length === 0 ? (
                <div className="p-6 text-center">
                  <MessageCircle className="h-12 w-12 text-text-secondary mx-auto mb-3" />
                  <p className="text-text-secondary">No conversations found</p>
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b cursor-pointer transition-colors hover:bg-muted ${
                      selectedConversation === conversation.id ? 'bg-primary-light border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.seller.avatar} />
                          <AvatarFallback>{conversation.seller.initials}</AvatarFallback>
                        </Avatar>
                        {conversation.seller.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm truncate">{conversation.seller.name}</h4>
                          <span className="text-xs text-text-secondary">{conversation.lastMessageTime}</span>
                        </div>
                        
                        <p className="text-xs text-text-secondary truncate mb-1">
                          {conversation.gig.title}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-text-secondary truncate">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 border rounded-lg bg-card flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={selectedConv.seller.avatar} />
                        <AvatarFallback>{selectedConv.seller.initials}</AvatarFallback>
                      </Avatar>
                      {selectedConv.seller.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedConv.seller.name}</h3>
                      <p className="text-sm text-text-secondary">{selectedConv.gig.title}</p>
                      <p className="text-xs text-text-secondary">Order: {selectedConv.gig.orderNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConv.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'buyer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === 'buyer'
                            ? 'bg-primary text-white'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === 'buyer' ? 'text-primary-foreground/70' : 'text-text-secondary'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="min-h-[40px]"
                      />
                    </div>
                    <Button 
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-text-secondary mt-2">
                    Press Enter to send, Shift + Enter for new line
                  </p>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-heading-dark mb-2">Select a conversation</h3>
                  <p className="text-text-secondary">Choose a conversation from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;