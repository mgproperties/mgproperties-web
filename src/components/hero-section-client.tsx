"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Send,
    Bot,
    User,
    TrendingUp,
    Award,
    Users,
    ArrowRight,
    Star,
    MessageCircle,
    Minimize2,
} from "lucide-react";

const chatSuggestions = [
    "Find me a 3-bedroom house under $750K",
    "What's the market like in Beverly Hills?",
    "I'm a first-time buyer, where do I start?",
    "Show me luxury condos with city views",
    "Help me sell my current home",
];

export default function HeroSectionClient() {
    const [currentSuggestion, setCurrentSuggestion] = useState(0);
    const [chatMessage, setChatMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([
        {
            type: "bot",
            message:
                "Hi! I'm your AI real estate assistant. How can I help you find your perfect home today?",
            timestamp: new Date(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [isChatExpanded, setIsChatExpanded] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSuggestion((prev) => (prev + 1) % chatSuggestions.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleSendMessage = async () => {
        if (!chatMessage.trim()) return;

        const userMessage = {
            type: "user" as const,
            message: chatMessage,
            timestamp: new Date(),
        };

        setChatHistory((prev) => [...prev, userMessage]);
        setChatMessage("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const botResponse = {
                type: "bot" as const,
                message:
                    "I'd be happy to help you with that! Let me search our database for properties that match your criteria. Would you like to schedule a consultation with one of our expert agents?",
                timestamp: new Date(),
            };
            setChatHistory((prev) => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setChatMessage(suggestion);
        setIsChatExpanded(true);
    };

    const handleChatFocus = () => {
        setIsChatExpanded(true);
    };

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-secondary via-secondary to-secondary/90 overflow-hidden">
            {/* Warm Geometric Background Elements */}
            <div className="absolute inset-0">
                {/* Soft geometric shapes */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl" />
                <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-tr from-accent/8 to-primary/5 rounded-full blur-2xl" />

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                            backgroundSize: "40px 40px",
                        }}
                    />
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="text-center max-w-6xl mx-auto">
                    {/* Trust Indicators - Floating */}
                    <div className="flex justify-center gap-6 mb-8 opacity-0 animate-fade-in delay-300">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                            <Star className="w-4 h-4 text-accent fill-accent" />
                            <span className="text-sm font-medium text-white">
                                4.9/5 Rating
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                            <Award className="w-4 h-4 text-accent" />
                            <span className="text-sm font-medium text-white">
                                Award Winning
                            </span>
                        </div>
                    </div>

                    {/* Premium Badge */}
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-accent-600 rounded-full text-white font-semibold mb-8 animate-fade-in hover:scale-105 transition-transform cursor-pointer shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse" />
                        🏆 #1 Trusted Real Estate Platform
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </div>

                    {/* Hero Headlines - Editorial Style */}
                    <div className="mb-12 animate-fade-in">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-white mb-6">
                            <span className="block">Discover Your</span>
                            <span className="block bg-gradient-to-r from-accent via-accent-600 to-accent-700 bg-clip-text text-transparent">
                                Dream Home
                            </span>
                        </h1>
                        <div className="mt-8 text-xl md:text-2xl text-white/90 font-medium">
                            with our{" "}
                            <span className="text-accent font-bold animate-pulse">
                                AI-Powered Assistant
                            </span>
                        </div>
                    </div>

                    <p className="text-xl md:text-2xl text-white/80 mb-16 max-w-4xl mx-auto leading-relaxed animate-fade-in">
                        Experience the future of real estate with our
                        intelligent chatbot.
                        <span className="text-accent font-semibold">
                            {" "}
                            Ask questions, find properties, and get expert
                            guidance
                        </span>{" "}
                        instantly.
                    </p>

                    {/* Minimized/Expanded AI Chatbot Interface */}
                    <div
                        className={`bg-white/95 backdrop-blur-lg rounded-3xl mb-16 max-w-5xl mx-auto shadow-2xl animate-fade-in border border-white/20 transition-all duration-500 ${
                            isChatExpanded ? "p-8" : "p-6"
                        }`}
                    >
                        {!isChatExpanded ? (
                            // Minimized Chat Interface
                            <div className="space-y-6">
                                {/* Simple Chat Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-2xl">
                                            <Bot className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-800">
                                                Ask Our AI Assistant
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                <span className="text-sm text-slate-600">
                                                    Ready to help you find
                                                    properties
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 rounded-xl px-3 py-1">
                                        AI Powered
                                    </Badge>
                                </div>

                                {/* Simple Chat Input */}
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="Ask me anything about real estate..."
                                        value={chatMessage}
                                        onChange={(e) =>
                                            setChatMessage(e.target.value)
                                        }
                                        onFocus={handleChatFocus}
                                        onKeyPress={(e) =>
                                            e.key === "Enter" &&
                                            handleSendMessage()
                                        }
                                        className="flex-1 px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!chatMessage.trim()}
                                        className="bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all rounded-2xl px-8 py-4 font-semibold group disabled:opacity-50"
                                    >
                                        <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>

                                {/* Quick Suggestions - Compact */}
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {chatSuggestions
                                        .slice(0, 3)
                                        .map((suggestion, index) => (
                                            <Badge
                                                key={index}
                                                onClick={() =>
                                                    handleSuggestionClick(
                                                        suggestion
                                                    )
                                                }
                                                className={`px-3 py-2 cursor-pointer transition-all bg-gray-100 text-gray-600 rounded-xl hover:bg-primary/5 hover:text-primary font-medium text-sm ${
                                                    index === currentSuggestion
                                                        ? "ring-2 ring-primary/30 bg-primary/5 text-primary"
                                                        : ""
                                                }`}
                                            >
                                                {suggestion}
                                            </Badge>
                                        ))}
                                </div>
                            </div>
                        ) : (
                            // Expanded Chat Interface
                            <div className="space-y-6">
                                {/* Full Chat Header */}
                                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-2xl">
                                            <Bot className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-800">
                                                PrimeRealty AI Assistant
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                <span className="text-sm text-slate-600">
                                                    Online & Ready to Help
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 rounded-xl px-3 py-1">
                                            AI Powered
                                        </Badge>
                                        <Button
                                            onClick={() =>
                                                setIsChatExpanded(false)
                                            }
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-xl hover:bg-gray-100"
                                        >
                                            <Minimize2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="h-64 overflow-y-auto space-y-4 bg-gray-50 rounded-2xl p-4">
                                    {chatHistory.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`flex ${
                                                message.type === "user"
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}
                                        >
                                            <div
                                                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                                                    message.type === "user"
                                                        ? "bg-gradient-to-r from-primary to-primary-600 text-white"
                                                        : "bg-white border border-gray-200 text-slate-700"
                                                }`}
                                            >
                                                <div className="flex items-start gap-2">
                                                    {message.type === "bot" && (
                                                        <Bot className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                                    )}
                                                    {message.type ===
                                                        "user" && (
                                                        <User className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                                                    )}
                                                    <p className="text-sm leading-relaxed">
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-white border border-gray-200 text-slate-700 px-4 py-3 rounded-2xl">
                                                <div className="flex items-center gap-2">
                                                    <Bot className="h-4 w-4 text-primary" />
                                                    <div className="flex gap-1">
                                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Chat Input */}
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="Ask me anything about real estate..."
                                        value={chatMessage}
                                        onChange={(e) =>
                                            setChatMessage(e.target.value)
                                        }
                                        onKeyPress={(e) =>
                                            e.key === "Enter" &&
                                            handleSendMessage()
                                        }
                                        className="flex-1 px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg hover:shadow-md"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!chatMessage.trim()}
                                        className="bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transition-all rounded-2xl px-8 py-4 font-semibold group disabled:opacity-50"
                                    >
                                        <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>

                                {/* All Quick Suggestions */}
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-slate-600 text-center">
                                        Try asking:
                                    </p>
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        {chatSuggestions.map(
                                            (suggestion, index) => (
                                                <Badge
                                                    key={index}
                                                    onClick={() =>
                                                        handleSuggestionClick(
                                                            suggestion
                                                        )
                                                    }
                                                    className={`px-4 py-2 cursor-pointer transition-all bg-gray-100 text-gray-600 rounded-xl hover:bg-primary/5 hover:text-primary font-medium ${
                                                        index ===
                                                        currentSuggestion
                                                            ? "ring-2 ring-primary/30 bg-primary/5 text-primary"
                                                            : ""
                                                    }`}
                                                >
                                                    {suggestion}
                                                </Badge>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CTA Buttons - Sophisticated */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
                        <Button
                            size="lg"
                            onClick={() => setIsChatExpanded(true)}
                            className="bg-accent hover:bg-accent-600 text-white shadow-xl hover:shadow-2xl transition-all px-12 py-6 text-xl rounded-2xl group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative flex items-center font-semibold">
                                <MessageCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                                Start Chatting Now
                            </span>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-white/30 text-white hover:bg-white hover:text-secondary transition-all px-12 py-6 text-xl rounded-2xl group backdrop-blur-sm bg-white/10 font-semibold"
                        >
                            <ArrowRight className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                            Browse Properties
                        </Button>
                    </div>

                    {/* Stats - Layered Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in">
                        {[
                            {
                                icon: TrendingUp,
                                value: "500+",
                                label: "Properties Sold",
                                gradient: "from-primary to-primary-600",
                            },
                            {
                                icon: Award,
                                value: "15+",
                                label: "Years Experience",
                                gradient: "from-accent to-accent-600",
                            },
                            {
                                icon: Users,
                                value: "98%",
                                label: "Client Satisfaction",
                                gradient: "from-secondary to-secondary-600",
                            },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:shadow-2xl transition-all hover:scale-105 cursor-pointer relative overflow-hidden"
                            >
                                {/* Gradient overlay */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl`}
                                />

                                <div className="relative z-10 text-center">
                                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <stat.icon className="h-10 w-10 text-primary" />
                                    </div>
                                    <div className="text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-700 font-semibold text-lg">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
