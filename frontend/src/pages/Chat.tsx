import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { chatAPI } from "@/api";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import Navbar from '../components/navbar.jsx';
import axios from 'axios';

interface Message {
  _id: string;
  sender: string;
  receiver: string;
  text: string;
  createdAt: Date;
  isTemp?: boolean;
}

interface Midwife {
  _id: string;
  fullName: string;
  profilePicture?: string;
}

const Chat = () => {
  const { toast } = useToast();
  const [midwives, setMidwives] = useState<Midwife[]>([]);
  const [selectedMidwife, setSelectedMidwife] = useState<Midwife | null>(null);
  const [messagesByMidwife, setMessagesByMidwife] = useState<Record<string, Message[]>>({});
  const [newMessage, setNewMessage] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isConnectingRef = useRef(false);

  const currentUserId = JSON.parse(localStorage.getItem("user") || "{}").id;

  const connectWebSocket = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN || isConnectingRef.current) {
      return;
    }

    isConnectingRef.current = true;
    const socket = new WebSocket(`ws://localhost:5001?userId=${currentUserId}`);

    socket.onopen = () => {
      console.log("WebSocket connected");
      isConnectingRef.current = false;
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "message" && data.data) {
          const { sender, receiver, text, createdAt, _id } = data.data;
          const conversationId = sender === currentUserId ? receiver : sender;

          setMessagesByMidwife((prev) => {
            const existingMessages = prev[conversationId] || [];
            // Remove temp message if server confirms it
            const tempMessage = existingMessages.find(
              (msg) =>
                msg.isTemp &&
                msg.text === text &&
                msg.sender === sender &&
                Math.abs(new Date(msg.createdAt).getTime() - new Date(createdAt).getTime()) < 1000
            );
            if (tempMessage) {
              return {
                ...prev,
                [conversationId]: existingMessages
                  .filter((msg) => msg._id !== tempMessage._id)
                  .concat({ ...data.data, isTemp: false })
                  .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
              };
            }
            // Check for duplicates
            if (!existingMessages.some((msg) => msg._id === _id)) {
              return {
                ...prev,
                [conversationId]: [...existingMessages, { ...data.data, isTemp: false }].sort(
                  (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                ),
              };
            }
            return prev;
          });
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to chat server. Please try again later.",
        variant: "destructive",
      });
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      isConnectingRef.current = false;
      setTimeout(connectWebSocket, 5000);
    };

    wsRef.current = socket;
  };

  const fetchMessages = async () => {
    if (selectedMidwife) {
      try {
        const response = await chatAPI.getChatHistory(selectedMidwife._id);
        setMessagesByMidwife((prev) => ({
          ...prev,
          [selectedMidwife._id]: response.data || [],
        }));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000); // Fetch messages every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [selectedMidwife]); // Dependency array includes selectedMidwife

  useEffect(() => {
    const fetchMidwives = async () => {
      try {
        const response = await chatAPI.getMidwives();
        if (response.data && response.data.length > 0) {
          setMidwives(response.data);
          setSelectedMidwife(response.data[0]);
          // Preload chat histories for all midwives
          const histories = await Promise.all(
            response.data.map((midwife) =>
              chatAPI.getChatHistory(midwife._id).then((res) => ({
                midwifeId: midwife._id,
                messages: res.data || [],
              }))
            )
          );
          setMessagesByMidwife((prev) => {
            const newMessages = { ...prev };
            histories.forEach(({ midwifeId, messages }) => {
              newMessages[midwifeId] = messages.sort(
                (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
              );
            });
            return newMessages;
          });
        } else {
          toast({
            title: "No Midwives Available",
            description: "There are currently no midwives available. Please try again later.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching midwives:", error);
        toast({
          title: "Error",
          description: "Failed to load midwives. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchMidwives();
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [currentUserId, toast]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedMidwife, messagesByMidwife]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedMidwife || !wsRef.current) return;

    try {
      const messageText = newMessage.trim();
      setNewMessage("");

      const messageData = {
        _id: uuidv4(),
        sender: currentUserId,
        receiver: selectedMidwife._id,
        text: messageText,
        createdAt: new Date(),
        isTemp: true,
      };

      setMessagesByMidwife((prev) => ({
        ...prev,
        [selectedMidwife._id]: [...(prev[selectedMidwife._id] || []), messageData].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ),
      }));

      await chatAPI.sendMessage(selectedMidwife._id, messageText);

      wsRef.current.send(
        JSON.stringify({
          type: "message",
          data: messageData,
        })
      );

      await axios.post(
        '/api/chats',
        { receiverId: selectedMidwife._id, text: messageText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      setNewMessage(newMessage);
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div><Navbar />
    <div className="min-h-screen bg-gradient-to-b from-[#CED5FF] via-white to-[#CED5FF] py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12 font-poppins"
        >
          Chat with Midwife
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="h-[70vh] flex flex-col md:flex-row bg-white rounded-xl shadow-2xl border-[#CED5FF]">
            <div className="md:w-1/3 border-r border-[#CED5FF] bg-[#CED5FF]/10">
              <div className="p-4 border-b border-[#CED5FF]">
                <h2 className="font-poppins text-lg font-semibold text-gray-800">Midwives</h2>
              </div>
              <ScrollArea className="h-[calc(70vh-80px)]">
                <div className="p-4 space-y-2">
                  <AnimatePresence>
                    {midwives.map((midwife, index) => (
                      <motion.div
                        key={midwife._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => setSelectedMidwife(midwife)}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedMidwife?._id === midwife._id
                            ? "bg-[#AA60EA]/20"
                            : "hover:bg-[#CED5FF]/20"
                        }`}
                      >
                        <Avatar className="relative">
                          <AvatarImage src={midwife.profilePicture} alt={midwife.fullName} />
                          <AvatarFallback className="bg-[#AA60EA] text-white">
                            {midwife.fullName.charAt(0)}
                          </AvatarFallback>
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                        </Avatar>
                        <div>
                          <p className="font-poppins font-medium text-gray-800">{midwife.fullName}</p>
                          <p className="text-sm text-gray-500">Online</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </div>

            <div className="flex-1 flex flex-col">
              <CardHeader className="border-b border-[#CED5FF] bg-[#CED5FF]/10 p-4">
                {selectedMidwife ? (
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={selectedMidwife.profilePicture} alt={selectedMidwife.fullName} />
                      <AvatarFallback className="bg-[#AA60EA] text-white">
                        {selectedMidwife.fullName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-poppins text-lg font-semibold text-gray-800">
                        {selectedMidwife.fullName}
                      </h2>
                      <p className="text-sm text-gray-500">Midwife Consultant • Online</p>
                    </div>
                  </div>
                ) : (
                  <h2 className="font-poppins text-lg font-semibold text-gray-800">
                    Select a midwife to start chatting
                  </h2>
                )}
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(70vh-180px)] p-4">
                  <AnimatePresence>
                    {selectedMidwife &&
                      messagesByMidwife[selectedMidwife._id]?.map((message, index) => (
                        <motion.div
                          key={message._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={`flex ${
                            message.sender === currentUserId ? "justify-end" : "justify-start"
                          } mb-4`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-4 py-2 relative ${
                              message.sender === currentUserId
                                ? "bg-[#AA60EA] text-white"
                                : "bg-[#CED5FF]/20 text-gray-800"
                            } ${
                              message.sender === currentUserId ? "rounded-br-none" : "rounded-bl-none"
                            }`}
                          >
                            <p className="break-words">{message.text}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.sender === currentUserId ? "text-white/70" : "text-gray-500"
                              }`}
                            >
                              {formatTime(message.createdAt)}
                            </p>
                            <div
                              className={`absolute bottom-0 w-3 h-3 ${
                                message.sender === currentUserId
                                  ? "right-[-6px] bg-[#AA60EA]"
                                  : "left-[-6px] bg-[#CED5FF]/20"
                              }`}
                              style={{
                                clipPath: message.sender === currentUserId
                                  ? "polygon(0 0, 100% 0, 100% 100%)"
                                  : "polygon(0 0, 100% 0, 0 100%)",
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              {selectedMidwife && (
                <div className="border-t border-[#CED5FF] p-4 bg-white">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="border-[#CED5FF] focus:ring-[#AA60EA] rounded-lg"
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="submit"
                        className="bg-[#AA60EA] hover:bg-[#AA60EA]/90 text-white rounded-lg"
                        disabled={!newMessage.trim()}
                      >
                        Send
                      </Button>
                    </motion.div>
                  </form>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default Chat;