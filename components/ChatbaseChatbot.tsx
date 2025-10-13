import React, { useState, useRef, useEffect } from 'react';
import { getChatbaseConfig, ChatbaseConfig } from '../src/config/chatbase';

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

// Function to format chatbot responses with improved styling
const formatChatbotResponse = (text: string) => {
  // Remove markdown-style asterisks
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold
  formattedText = formattedText.replace(/\*(.*?)\*/g, '$1'); // Remove italics
  
  // Convert rule citations to styled tags (e.g., "Rule 3.10.2")
  formattedText = formattedText.replace(/Rule (\d+\.\d+(?:\.\d+)?)/g, '<span class="font-mono text-xs bg-green-500/10 text-green-300 px-2 py-1 rounded">$1</span>');
  
  // Convert markdown links to highlighted references
  formattedText = formattedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="text-green-400 underline hover:text-green-300 cursor-pointer">$1</span>');
  
  // Convert markdown headers to styled headings
  formattedText = formattedText.replace(/^### (.*$)/gim, '<h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">$1</h3>');
  formattedText = formattedText.replace(/^## (.*$)/gim, '<h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">$1</h2>');
  formattedText = formattedText.replace(/^# (.*$)/gim, '<h1 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">$1</h1>');
  
  // Convert markdown lists to HTML lists with proper styling
  formattedText = formattedText.replace(/^\s*\*\s(.*)$/gm, '<li class="ml-4 mb-1">$1</li>');
  formattedText = formattedText.replace(/(<li.*<\/li>)/gs, '<ul class="list-disc list-inside my-2 space-y-1">$1</ul>');
  
  // Convert line breaks
  formattedText = formattedText.replace(/\n/g, '<br />');
  
  return formattedText;
};

const ChatbaseChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isUserAtBottom = useRef(true);
  const shouldAutoScroll = useRef(true);

  // Get configuration from environment
  const config: ChatbaseConfig = getChatbaseConfig();
  const { apiKey, chatbotId, apiUrl, streamingEnabled } = config;

  // Check if user is at bottom of chat
  const checkIfUserIsAtBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      // Allow for a small margin of error
      return scrollTop + clientHeight >= scrollHeight - 10;
    }
    return true;
  };

  // Handle scroll events
  const handleScroll = () => {
    isUserAtBottom.current = checkIfUserIsAtBottom();
  };

  // Set up scroll listener
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initial check
      isUserAtBottom.current = checkIfUserIsAtBottom();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll to bottom when new messages are added, but only if user is at bottom
  useEffect(() => {
    if (shouldAutoScroll.current && isUserAtBottom.current && messagesEndRef.current) {
      // Force scroll to bottom
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  // Add welcome message on component mount
  useEffect(() => {
    setMessages([
      { 
        content: 'Hello! I\'m PANASA Bot, your expert on the official WESPA Scrabble rules. How can I help you today?', 
        role: 'assistant' 
      }
    ]);
    
    // Set initial scroll position after welcome message is added
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'instant'
        });
        isUserAtBottom.current = true;
      }
    }, 50);
  }, []);

  // Function to copy message to clipboard
  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(index);
      // Reset the copied status after 2 seconds
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = { content: inputValue, role: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Add temporary assistant message
      setMessages(prev => [...prev, { content: '', role: 'assistant' }]);

      // Prepare request options
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          chatbotId: chatbotId,
          stream: streamingEnabled
        })
      };

      // Disable auto-scroll during streaming
      shouldAutoScroll.current = false;

      if (streamingEnabled) {
        // Handle streaming response
        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (!response.body) {
          throw new Error('Response body is null');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let assistantResponse = '';

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            // Process the chunk and update the assistant message
            assistantResponse += chunk;
            
            // Update the last message (assistant message) with the new content
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = { 
                content: assistantResponse, 
                role: 'assistant' 
              };
              return newMessages;
            });
          }
        }
      } else {
        // Handle non-streaming response
        const response = await fetch(apiUrl, requestOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Update assistant message with response
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { content: data.text, role: 'assistant' };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { 
          content: 'Sorry, I encountered an error. Please try again.', 
          role: 'assistant' 
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
      // Re-enable auto-scroll and scroll to bottom after streaming is complete
      setTimeout(() => {
        shouldAutoScroll.current = true;
        isUserAtBottom.current = checkIfUserIsAtBottom();
        if (isUserAtBottom.current && messagesEndRef.current) {
          messagesContainerRef.current?.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages container - Improved design with better scrolling */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6"
      >
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-2 sm:mr-4 ${message.role === 'user' ? 'bg-gray-600' : ''}`}>
              {message.role === 'user' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              ) : (
                <img src="/panasa-logo.png" alt="PANASA Logo" className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </div>
            
            {/* Message bubble */}
            <div className="flex-1 max-w-[85%] sm:max-w-3xl">
              <div 
                className={`rounded-xl px-3 py-2 sm:px-5 sm:py-4 text-xs sm:text-sm ${
                  message.role === 'user' 
                    ? 'bg-gray-700 text-gray-100 rounded-tr-none' 
                    : 'bg-gray-800 text-gray-100 rounded-tl-none'
                }`}
                style={{ lineHeight: '1.6' }}
              >
                {message.role === 'assistant' ? (
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: formatChatbotResponse(message.content) 
                    }} 
                    className="prose prose-invert max-w-none"
                  />
                ) : (
                  <div>{message.content}</div>
                )}
              </div>
              
              {/* Copy button for assistant messages */}
              {message.role === 'assistant' && (
                <div className="mt-1 sm:mt-2 flex justify-start">
                  <button
                    onClick={() => copyToClipboard(message.content, index)}
                    className="flex items-center text-xs text-gray-400 hover:text-gray-200 transition-colors"
                    aria-label="Copy message"
                  >
                    {copiedMessageId === index ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-2 sm:mr-4">
              <img src="/panasa-logo.png" alt="PANASA Logo" className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="flex-1 max-w-[85%] sm:max-w-3xl">
              <div className="bg-gray-800 text-gray-100 rounded-xl rounded-tl-none px-3 py-2 sm:px-5 sm:py-4 text-xs sm:text-sm">
                <div className="flex space-x-1 sm:space-x-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              <div className="mt-1 sm:mt-2 text-xs text-gray-400">PANASA Bot is typing...</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area - Improved design */}
      <form onSubmit={handleSubmit} className="border-t border-gray-700/50 p-2 sm:p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Message PANASA Bot..."
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl pl-3 pr-10 py-3 sm:pl-5 sm:pr-12 sm:py-4 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-1 sm:p-1.5 ${
                isLoading || !inputValue.trim() ? 'text-gray-500' : 'text-green-400 hover:bg-gray-700'
              }`}
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-2 sm:mt-3">
            PANASA Bot references WESPA Rules V5.1. Please verify important information.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ChatbaseChatbot;