import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import OpenAI from 'openai';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant for ThePawNest. How can I help you with pet adoption today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    // Rule-based fallback responses
    const getRuleBasedResponse = (input) => {
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        return 'Hello! Welcome to ThePawNest! How can I help you find your perfect pet companion today?';
      } else if (lowerInput.includes('adopt') || lowerInput.includes('adoption')) {
        return 'Adopting a pet is wonderful! You can browse available pets on our Adopt page. Simply click on any pet you\'re interested in and fill out the adoption form. Our team will review your application and contact you soon.';
      } else if (lowerInput.includes('dog') || lowerInput.includes('puppy')) {
        return 'We have many adorable dogs waiting for their forever homes! Each dog has been vaccinated and health-checked. Visit our Adopt page to see all available dogs with their photos and details.';
      } else if (lowerInput.includes('cat') || lowerInput.includes('kitten')) {
        return 'Our cats are looking for loving homes! We have kittens and adult cats, all litter-trained and socialized. Check out our Adopt page to meet your feline friend.';
      } else if (lowerInput.includes('cost') || lowerInput.includes('fee') || lowerInput.includes('price')) {
        return 'Great news! Pet adoption on ThePawNest is completely free. However, if you\'re adopting from a different city, the pet owner may ask for travel charges. We never charge additional fees!';
      } else if (lowerInput.includes('age') || lowerInput.includes('old') || lowerInput.includes('18')) {
        return 'You need to be at least 18 years old to adopt a pet. This ensures you can provide proper care and take legal responsibility for your new companion.';
      } else if (lowerInput.includes('return') || lowerInput.includes('give back')) {
        return 'Yes, if the adoption doesn\'t work out, you can return the pet for re-adoption. We want to ensure every pet finds the right home.';
      } else if (lowerInput.includes('process') || lowerInput.includes('how')) {
        return 'The adoption process is simple: 1) Browse pets on our Adopt page, 2) Click "Adopt" on your chosen pet, 3) Fill out the form, 4) Our team reviews and contacts you, 5) Meet the pet, 6) Complete adoption!';
      } else if (lowerInput.includes('contact') || lowerInput.includes('support') || lowerInput.includes('help')) {
        return 'You can contact us through the Contact page on our website. Our team is available Monday to Saturday, 9 AM to 6 PM, to help with any questions.';
      } else if (lowerInput.includes('care') || lowerInput.includes('take care')) {
        return 'Pet care includes regular feeding, exercise, vet check-ups, and lots of love! Each pet has specific needs - we provide care guides when you adopt. Make sure your home is pet-proofed before bringing your new friend home.';
      } else if (lowerInput.includes('ready') || lowerInput.includes('prepare')) {
        return 'To prepare for pet adoption: Ensure you have time commitment, budget for food/vet care, pet-proof your home, and get supplies like food bowls, toys, and a comfortable bed. Are you ready to give a pet a loving home?';
      } else {
        return 'That\'s a great question! For specific details about available pets or adoption requirements, I\'d recommend browsing our Adopt page or contacting our support team directly. Is there anything specific about pet adoption I can help you with?';
      }
    };

    try {
      // Try OpenAI API first
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const context = `You are a helpful AI assistant for ThePawNest, a pet adoption platform. 
      Your role is to help users with questions about pet adoption, pet care, and the adoption process.
      Be friendly, informative, and encouraging about pet adoption. 
      Keep responses concise but helpful. If you don't know something specific about the platform, 
      suggest they contact the platform directly.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: context },
          ...messages.filter(msg => msg.role !== 'system'),
          userMessage
        ],
        max_tokens: 150,
        temperature: 0.7
      });

      const assistantMessage = { 
        role: 'assistant', 
        content: completion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.' 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.log('OpenAI API failed, using fallback response:', error.message);
      
      // Fallback to rule-based response
      const fallbackResponse = getRuleBasedResponse(currentInput);
      const assistantMessage = { 
        role: 'assistant', 
        content: fallbackResponse
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-orange-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <h3 className="font-semibold">Pet Adoption Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${message.role === "user"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-800"
                    }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === "assistant" && (
                      <Bot className="h-4 w-4 mt-0.5" />
                    )}
                    {message.role === "user" && (
                      <User className="h-4 w-4 mt-0.5" />
                    )}
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-3 py-2 flex items-center space-x-2">
                  <Bot className="h-4 w-4" />
                  <span className="text-sm text-gray-500">Typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about pet adoption..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white p-2 rounded-lg"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
