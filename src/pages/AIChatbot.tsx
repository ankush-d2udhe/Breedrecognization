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
import SplitText from "@/components/SplitText";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  image?: string;
}

const AIChatbot = () => {
  const { t } = useLanguage();
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
      
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
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

  // Send message to OpenAI API
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

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey || apiKey === "your_openai_api_key_here") {
      // Intelligent mock responses based on user input
      setTimeout(() => {
        const userInput = userMessage.text.toLowerCase();
        let response = "";
        
        // Contextual responses based on keywords
        if (userInput.includes('cattle') || userInput.includes('cow') || userInput.includes('buffalo') || userInput.includes('गाय') || userInput.includes('भैंस') || userInput.includes('गुरे')) {
          const cattleResponses = {
            english: "🐄 For cattle health: Provide clean water daily, vaccinate against FMD every 6 months, feed balanced diet with green fodder and concentrates. Watch for symptoms like reduced appetite, fever, or unusual behavior. Consult a vet immediately if you notice any issues.",
            hindi: "🐄 गाय-भैंस की देखभाल: रोज साफ पानी दें, हर 6 महीने में FMD का टीका लगवाएं, हरा चारा और दाना मिलाकर संतुलित आहार दें। भूख कम लगना, बुखार या असामान्य व्यवहार दिखे तो तुरंत पशु चिकित्सक से संपर्क करें।",
            marathi: "🐄 गुरांची काळजी: दररोज स्वच्छ पाणी द्या, दर 6 महिन्यांनी FMD लस द्या, हिरवा चारा आणि दाणा मिसळून संतुलित आहार द्या। भूक कमी लागणे, ताप किंवा असामान्य वर्तन दिसल्यास लगेच पशुवैद्यकांशी संपर्क साधा."
          };
          response = cattleResponses[selectedLanguage as keyof typeof cattleResponses];
        } else if (userInput.includes('crop') || userInput.includes('disease') || userInput.includes('plant') || userInput.includes('फसल') || userInput.includes('रोग') || userInput.includes('पीक')) {
          const cropResponses = {
            english: "🌾 Crop disease management: Use disease-resistant varieties, practice crop rotation, ensure proper drainage, apply organic fungicides like neem oil. Common signs include yellowing leaves, spots, wilting. Early detection and treatment are crucial for good yield.",
            hindi: "🌾 फसल रोग प्रबंधन: रोग प्रतिरोधी किस्में उगाएं, फसल चक्र अपनाएं, उचित जल निकासी करें, नीम तेल जैसे जैविक फफूंदनाशक का प्रयोग करें। पत्तियों का पीला होना, धब्बे, मुरझाना आम लक्षण हैं।",
            marathi: "🌾 पीक रोग व्यवस्थापन: रोगप्रतिकारक जाती लावा, पीक चक्र अवलंबा, योग्य पाणी निचरा करा, कडुनिंब तेल सारखे सेंद्रिय बुरशीनाशक वापरा. पानांचे पिवळे होणे, डाग, कोमेजणे ही सामान्य लक्षणे आहेत."
          };
          response = cropResponses[selectedLanguage as keyof typeof cropResponses];
        } else if (userInput.includes('vaccination') || userInput.includes('vaccine') || userInput.includes('टीका') || userInput.includes('लसीकरण')) {
          const vaccineResponses = {
            english: "💉 Vaccination Schedule: FMD (Foot & Mouth Disease) - Every 6 months, Anthrax - Annually, Brucellosis - As per vet advice, Blackquarter - Annually for young cattle. Keep vaccination records and follow your local veterinary guidelines.",
            hindi: "💉 टीकाकरण कार्यक्रम: FMD (मुंह-खुर रोग) - हर 6 महीने, एंथ्रेक्स - सालाना, ब्रुसेलोसिस - पशु चिकित्सक की सलाह पर, गलघोंटू - युवा पशुओं के लिए सालाना। टीकाकरण का रिकॉर्ड रखें।",
            marathi: "💉 लसीकरण वेळापत्रक: FMD (तोंड-खुर रोग) - दर 6 महिन्यांनी, अँथ्रॅक्स - वार्षिक, ब्रुसेलोसिस - पशुवैद्यकाच्या सल्ल्यानुसार, काळा पाय - तरुण गुरांसाठी वार्षिक. लसीकरणाची नोंद ठेवा."
          };
          response = vaccineResponses[selectedLanguage as keyof typeof vaccineResponses];
        } else if (userInput.includes('milk') || userInput.includes('production') || userInput.includes('दूध') || userInput.includes('उत्पादन')) {
          const milkResponses = {
            english: "🥛 Increase milk production: Feed high-quality green fodder (berseem, maize), provide 2-3 kg concentrates daily, ensure 50-80L clean water, maintain stress-free environment, regular milking schedule, and mineral supplements. Good nutrition = better milk yield.",
            hindi: "🥛 दूध उत्पादन बढ़ाने के लिए: उच्च गुणवत्ता का हरा चारा (बरसीम, मक्का) दें, रोज 2-3 किलो दाना दें, 50-80 लीटर साफ पानी दें, तनावमुक्त वातावरण बनाएं, नियमित दुहने का समय रखें।",
            marathi: "🥛 दूध उत्पादन वाढवण्यासाठी: उच्च दर्जाचा हिरवा चारा (बरसीम, मका) द्या, दररोज 2-3 किलो दाणा द्या, 50-80 लिटर स्वच्छ पाणी द्या, तणावमुक्त वातावरण राखा, नियमित दुहण्याची वेळ ठेवा."
          };
          response = milkResponses[selectedLanguage as keyof typeof milkResponses];
        } else if (userInput.includes('feed') || userInput.includes('nutrition') || userInput.includes('चारा') || userInput.includes('आहार')) {
          const feedResponses = {
            english: "🌱 Cattle nutrition: Green fodder 25-30kg/day, dry fodder 5-7kg, concentrates 2-4kg based on milk production, salt 50-60g, mineral mixture 50g daily. Ensure fresh water availability 24/7. Balanced nutrition improves health and productivity.",
            hindi: "🌱 पशु आहार: हरा चारा 25-30 किलो/दिन, सूखा चारा 5-7 किलो, दाना 2-4 किलो (दूध उत्पादन के अनुसार), नमक 50-60 ग्राम, खनिज मिश्रण 50 ग्राम रोज। 24 घंटे ताजा पानी उपलब्ध रखें।",
            marathi: "🌱 गुरांचे पोषण: हिरवा चारा 25-30 किलो/दिवस, कोरडा चारा 5-7 किलो, दाणा 2-4 किलो (दूध उत्पादनानुसार), मीठ 50-60 ग्राम, खनिज मिश्रण 50 ग्राम दररोज. 24 तास ताजे पाणी उपलब्ध ठेवा."
          };
          response = feedResponses[selectedLanguage as keyof typeof feedResponses];
        } else {
          // General farming advice
          const generalResponses = {
            english: "🌾 I'm here to help with farming questions! Ask me about cattle care, crop diseases, vaccination schedules, milk production, animal nutrition, or any other agricultural topics. What specific farming challenge can I help you with?",
            hindi: "🌾 मैं खेती के सवालों में आपकी मदद के लिए यहां हूं! मुझसे पशुपालन, फसल रोग, टीकाकरण, दूध उत्पादन, पशु आहार या अन्य कृषि विषयों के बारे में पूछें। कौन सी खेती की समस्या में मैं आपकी मदद कर सकता हूं?",
            marathi: "🌾 मी शेतीच्या प्रश्नांमध्ये तुमची मदत करण्यासाठी येथे आहे! माझ्याकडे पशुपालन, पीक रोग, लसीकरण, दूध उत्पादन, पशु आहार किंवा इतर शेती विषयांबद्दल विचारा. कोणत्या शेतीच्या आव्हानात मी तुमची मदत करू शकतो?"
          };
          response = generalResponses[selectedLanguage as keyof typeof generalResponses];
        }
        
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
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

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://farmsenseglow.vercel.app",
          "X-Title": "FarmSenseGlow",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI farming assistant specializing in livestock care, crop management, disease identification, and agricultural best practices. Be friendly, informative, and use farming emojis when appropriate."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || "⚠️ Sorry, I couldn't generate a response.";

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage = "⚠️ Error contacting AI service. Using demo response.";
      
      // Fallback to mock response
      const userInput = userMessage.text.toLowerCase();
      let fallbackResponse = "🌾 I'm here to help with farming questions! Ask me about cattle care, crop diseases, vaccination schedules, or any agricultural topics.";
      
      if (userInput.includes('cattle') || userInput.includes('cow')) {
        fallbackResponse = "🐄 For cattle health: Provide clean water daily, vaccinate against FMD every 6 months, feed balanced diet with green fodder and concentrates.";
      } else if (userInput.includes('crop') || userInput.includes('disease')) {
        fallbackResponse = "🌾 Crop disease management: Use disease-resistant varieties, practice crop rotation, apply organic fungicides like neem oil.";
      }
      
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: fallbackResponse,
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
          {/* Page Title */}
          <div className="text-center mb-8">
            <SplitText 
              text="🤖 AI Farming Assistant"
              className="page-title"
              delay={0.2}
              stagger={0.05}
            />
            <p className="text-green-600 mt-2">Get instant answers to your farming questions in multiple languages</p>
          </div>
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
                      placeholder="Ask about farming, livestock care, or crop management..."
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