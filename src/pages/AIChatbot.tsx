"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Image as ImageIcon, 
  X, 
  Volume2, 
  VolumeX,
  Copy,
  RotateCcw,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  image?: string;
  isVoice?: boolean;
}

const AIChatbot = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const languages = {
    english: "English",
    hindi: "हिंदी",
    marathi: "मराठी",
  };

  const greetings = {
    english: "🌾 Hello! I'm your AI farming assistant. I can help with livestock care, crop management, disease identification, and more. How can I assist you today?",
    hindi: "🌾 नमस्ते! मैं आपका AI कृषि सहायक हूं। मैं पशुधन देखभाल, फसल प्रबंधन, रोग पहचान और अधिक में मदद कर सकता हूं। आज मैं आपकी कैसे मदत कर सकता हूं?",
    marathi: "🌾 नमस्कार! मी तुमचा AI शेती सहाय्यक आहे. मी पशुधन काळजी, पीक व्यवस्थापन, रोग ओळख आणि बरेच काही मदत करू शकतो. आज मी तुम्हाला कशी मदत करू शकतो?",
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = selectedLanguage === 'hindi' ? 'hi-IN' : selectedLanguage === 'marathi' ? 'mr-IN' : 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [selectedLanguage]);

  // Initial greeting when language changes
  useEffect(() => {
    const greeting: Message = {
      id: "1",
      text: greetings[selectedLanguage as keyof typeof greetings],
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages([greeting]);
  }, [selectedLanguage]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to OpenRouter API
  const sendMessage = async () => {
    if (!inputText.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim() || "📷 Image uploaded",
      sender: "user",
      timestamp: new Date(),
      image: selectedImage || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setSelectedImage(null);
    setIsTyping(true);

    // Check if API key is present, if not use mock responses
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log('Gemini API Key status:', apiKey ? 'Present' : 'Missing');
    
    if (!apiKey || apiKey === "your_gemini_api_key_here" || apiKey === "undefined") {
      // Use mock AI responses for demo
      setTimeout(() => {
        const mockResponses = {
          english: [
            "🐄 For cattle health, ensure regular vaccination and clean water supply. Monitor for signs of illness like loss of appetite or unusual behavior.",
            "🌾 Crop rotation is essential for soil health. Consider legumes to naturally fix nitrogen in the soil.",
            "💊 Vaccination schedule: FMD every 6 months, Anthrax annually, and Brucellosis as recommended by your vet.",
            "🌱 For better milk production, provide balanced nutrition with green fodder, concentrates, and mineral supplements.",
            "🏥 Regular health checkups every 3 months can prevent major diseases. Contact your nearest veterinary hospital."
          ],
          hindi: [
            "🐄 गाय की सेहत के लिए नियमित टीकाकरण और साफ पानी जरूरी है। भूख न लगना या असामान्य व्यवहार जैसे लक्षणों पर ध्यान दें।",
            "🌾 मिट्टी की सेहत के लिए फसल चक्र जरूरी है। दलहनी फसलों से मिट्टी में नाइट्रोजन की मात्रा बढ़ती है।",
            "💊 टीकाकरण कार्यक्रम: FMD हर 6 महीने, एंथ्रेक्स सालाना, और ब्रुसेलोसिस पशु चिकित्सक की सलाह पर।",
            "🌱 बेहतर दूध उत्पादन के लिए हरा चारा, दाना और खनिज पूरक आहार दें।",
            "🏥 हर 3 महीने में स्वास्थ्य जांच से बड़ी बीमारियों से बचा जा सकता है।"
          ],
          marathi: [
            "🐄 गुरांच्या आरोग्यासाठी नियमित लसीकरण आणि स्वच्छ पाणी आवश्यक आहे। भूक न लागणे किंवा असामान्य वर्तन यावर लक्ष ठेवा।",
            "🌾 मातीच्या आरोग्यासाठी पीक चक्र महत्वाचे आहे। कडधान्य पिकांमुळे मातीत नायट्रोजन वाढते।",
            "💊 लसीकरण वेळापत्रक: FMD दर 6 महिन्यांनी, अँथ्रॅक्स वार्षिक, आणि ब्रुसेलोसिस पशुवैद्यकाच्या सल्ल्यानुसार।",
            "🌱 चांगल्या दूध उत्पादनासाठी हिरवा चारा, दाणा आणि खनिज पूरक आहार द्या।",
            "🏥 दर 3 महिन्यांनी आरोग्य तपासणी केल्याने मोठे आजार टाळता येतात।"
          ]
        };
        
        const responses = mockResponses[selectedLanguage as keyof typeof mockResponses] || mockResponses.english;
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
      return;
    }

    try {
      const prompt = `You are a helpful AI farming assistant specializing in livestock care, crop management, disease identification, and agricultural best practices. Respond in ${languages[selectedLanguage as keyof typeof languages]}. Be friendly, informative, and use farming emojis when appropriate.\n\nUser: ${selectedImage ? `${userMessage.text} [User has uploaded an image - please acknowledge this and provide relevant farming advice based on the context]` : userMessage.text}`;

      console.log('Making API request to Gemini...');
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "⚠️ Sorry, I couldn't generate a response.";

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage = err instanceof Error && err.message.includes('401') 
        ? "🔑 Gemini API key not configured. Using demo responses for now. Contact admin to enable full AI features."
        : "⚠️ Error contacting Gemini AI service. Please try again.";
      
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: errorMessage,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Voice recognition toggle
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Text to speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'hindi' ? 'hi-IN' : selectedLanguage === 'marathi' ? 'mr-IN' : 'en-US';
      utterance.rate = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Copy message text
  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Clear chat
  const clearChat = () => {
    const greeting: Message = {
      id: "1",
      text: greetings[selectedLanguage as keyof typeof greetings],
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages([greeting]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-100 relative">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Language Selection */}
            <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="border-green-200 focus:border-amber-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(languages).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Voice Control */}
            <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-700">Voice Chat</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleListening}
                    className={`${isListening ? 'bg-red-100 border-red-300 text-red-700' : 'border-green-300 text-green-700'}`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Clear Chat */}
            <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-700">Clear Chat</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearChat}
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <Card className="bg-white/95 backdrop-blur-sm border-amber-200 shadow-2xl rounded-xl">
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-green-50/30 to-amber-50/30">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    } animate-fade-in`}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-[80%] ${
                        message.sender === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                          message.sender === "user"
                            ? "bg-gradient-to-br from-green-600 to-emerald-600"
                            : "bg-gradient-to-br from-amber-400 to-orange-500"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div
                        className={`p-4 rounded-2xl shadow-md ${
                          message.sender === "user"
                            ? "bg-gradient-to-br from-green-600 to-emerald-600 text-white"
                            : "bg-white border border-green-200"
                        }`}
                      >
                        {message.image && (
                          <img 
                            src={message.image} 
                            alt="Uploaded" 
                            className="max-w-48 max-h-48 rounded-lg mb-2 object-cover"
                          />
                        )}
                        <p className="leading-relaxed">{message.text}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p
                            className={`text-xs ${
                              message.sender === "user"
                                ? "text-green-100"
                                : "text-gray-500"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                          <div className="flex gap-1">
                            {message.sender === "bot" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => speakText(message.text)}
                                className="h-6 w-6 p-0 hover:bg-green-100"
                              >
                                {isSpeaking ? (
                                  <VolumeX className="w-3 h-3 text-green-600" />
                                ) : (
                                  <Volume2 className="w-3 h-3 text-green-600" />
                                )}
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyMessage(message.text)}
                              className="h-6 w-6 p-0 hover:bg-green-100"
                            >
                              <Copy className="w-3 h-3 text-green-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-green-200 shadow-md">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Section */}
              <div className="p-6 border-t border-green-200 bg-white/80 backdrop-blur-sm">
                {/* Image Preview */}
                {selectedImage && (
                  <div className="mb-4 relative inline-block">
                    <img 
                      src={selectedImage} 
                      alt="Selected" 
                      className="max-w-32 max-h-32 rounded-lg object-cover border-2 border-green-300"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setSelectedImage(null)}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}

                {/* Voice Listening Indicator */}
                {isListening && (
                  <div className="mb-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full animate-pulse">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                      <span className="text-sm font-medium">🎤 Listening... Speak now</span>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                )}

                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={t('chatbot.placeholder')}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      className="border-green-200 focus:border-amber-400 focus:ring-amber-400 bg-white/90"
                    />
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-green-300 text-green-700 hover:bg-green-50"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleListening}
                    className={`${
                      isListening 
                        ? "bg-red-100 border-red-300 text-red-700" 
                        : "border-green-300 text-green-700 hover:bg-green-50"
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>

                  <Button
                    onClick={sendMessage}
                    disabled={!inputText.trim() && !selectedImage}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              "🐄 Cattle health issues",
              "🌾 Crop disease identification", 
              "💊 Vaccination schedules",
              "🌱 Best farming practices"
            ].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setInputText(suggestion.split(' ').slice(1).join(' '))}
                className="bg-white/90 border-amber-200 text-green-700 hover:bg-amber-50 p-3 h-auto text-left"
              >
                <span className="text-sm">{suggestion}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;