import React, { useState, useRef, useEffect } from 'react';
import { getChatbaseConfig, ChatbaseConfig } from '../src/config/chatbase';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

// Function to format chatbot responses with improved styling
const formatChatbotResponse = (text: string) => {
  // Remove markdown-style asterisks
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold
  formattedText = formattedText.replace(/\*(.*?)\*/g, '$1'); // Remove italics
  
  // Convert rule citations to styled tags (e.g., "Rule 3.10.2")
  formattedText = formattedText.replace(/Rule (\d+\.\d+(?:\.\d+)?)/g, '<span class="font-mono text-xs bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-300 px-2 py-1 rounded-md border border-green-500/30">$1</span>');
  
  // Convert markdown links to highlighted references
  formattedText = formattedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="text-green-400 underline hover:text-green-300 cursor-pointer transition-colors">$1</span>');
  
  // Convert markdown headers to styled headings
  formattedText = formattedText.replace(/^### (.*$)/gim, '<h3 class="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2 mt-4 pb-1 border-b border-gray-700">$1</h3>');
  formattedText = formattedText.replace(/^## (.*$)/gim, '<h2 class="text-base font-semibold text-gray-200 uppercase tracking-wide mb-3 mt-5 pb-2 border-b border-gray-700">$1</h2>');
  formattedText = formattedText.replace(/^# (.*$)/gim, '<h1 class="text-lg font-bold text-gray-100 uppercase tracking-wide mb-4 mt-6 pb-2 border-b border-gray-600">$1</h1>');
  
  // Convert markdown lists to HTML lists with proper styling
  formattedText = formattedText.replace(/^\s*\*\s(.*)$/gm, '<li class="ml-5 mb-1.5 relative before:content-["•"] before:absolute before:left-0 before:text-green-400">$1</li>');
  formattedText = formattedText.replace(/(<li.*<\/li>)/gs, '<ul class="list-none my-3 space-y-1 ml-2">$1</ul>');
  
  // Convert line breaks
  formattedText = formattedText.replace(/\n/g, '<br />');
  
  return formattedText;
};

const ChatbaseChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isChatCleared, setIsChatCleared] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isUserAtBottom = useRef(true);
  const shouldAutoScroll = useRef(true);
  const inputRef = useRef<HTMLInputElement>(null);

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
        id: 'welcome-' + Date.now(),
        content: 'Hello! I\'m PANASA Bot, your expert on the official WESPA Scrabble rules. How can I help you today?', 
        role: 'assistant',
        timestamp: new Date()
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
    
    // Focus input on mount
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  // Function to copy message to clipboard
  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(id);
      // Reset the copied status after 2 seconds
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Function to clear chat history
  const clearChat = () => {
    setMessages([
      { 
        id: 'cleared-' + Date.now(),
        content: 'Chat history cleared. How can I help you today?', 
        role: 'assistant',
        timestamp: new Date()
      }
    ]);
    setIsChatCleared(true);
    setTimeout(() => setIsChatCleared(false), 3000);
  };

  // Function to export chat
  const exportChat = () => {
    const chatText = messages
      .filter(msg => msg.content.trim() !== '')
      .map(msg => `${msg.role === 'user' ? 'You' : 'PANASA Bot'}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `panasa-bot-chat-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = { 
      id: 'user-' + Date.now(), 
      content: inputValue, 
      role: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Add temporary assistant message
      const tempAssistantMessage: Message = {
        id: 'assistant-' + Date.now(),
        content: '',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, tempAssistantMessage]);

      // Prepare request options
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
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
                id: tempAssistantMessage.id,
                content: assistantResponse, 
                role: 'assistant',
                timestamp: new Date()
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
          newMessages[newMessages.length - 1] = { 
            id: tempAssistantMessage.id,
            content: data.text, 
            role: 'assistant',
            timestamp: new Date()
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { 
          id: 'error-' + Date.now(),
          content: 'Sorry, I encountered an error. Please try again.', 
          role: 'assistant',
          timestamp: new Date()
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

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
    
    // Clear chat with Ctrl+Shift+K
    if (e.key === 'k' && e.ctrlKey && e.shiftKey) {
      e.preventDefault();
      clearChat();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Controls */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 mb-2 sm:mb-3 px-1">
        <h2 className="text-xs sm:text-sm font-medium text-gray-400">Chat with PANASA Bot</h2>
        <div className="flex space-x-1.5 sm:space-x-2 w-full xs:w-auto">
          <button
            onClick={exportChat}
            className="text-[10px] xs:text-xs sm:text-sm px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-gray-100 transition-colors flex items-center whitespace-nowrap"
            aria-label="Export chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hidden xs:inline">Export</span>
            <span className="xs:hidden">Exp</span>
          </button>
          <button
            onClick={clearChat}
            className="text-[10px] xs:text-xs sm:text-sm px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-gray-100 transition-colors flex items-center whitespace-nowrap"
            aria-label="Clear chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="hidden xs:inline">Clear</span>
            <span className="xs:hidden">Clr</span>
          </button>
        </div>
      </div>
      
      {/* Messages container - Improved design with better scrolling */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 space-y-3 sm:space-y-4 rounded-xl bg-gray-800/20 border border-gray-700/30 mb-3 sm:mb-4 custom-scrollbar"
      >
        {isChatCleared && (
          <div className="text-center py-2 mb-3 sm:mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Chat history cleared
            </span>
          </div>
        )}
        
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-1.5 sm:mr-2 md:mr-3 ${message.role === 'user' ? 'bg-gradient-to-br from-cyan-600 to-blue-700' : 'bg-gray-700'}`}>
              {message.role === 'user' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              ) : (
                <img src="/panasa-logo.png" alt="PANASA Logo" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              )}
            </div>
            
            {/* Message bubble */}
            <div className="flex-1 max-w-[75%] sm:max-w-[80%] md:max-w-[85%]">
              <div className="flex items-center mb-0.5 sm:mb-1">
                <span className="text-[10px] sm:text-xs font-medium text-gray-400">
                  {message.role === 'user' ? 'You' : 'PANASA Bot'}
                </span>
                <span className="mx-1 text-gray-600 hidden xs:inline">•</span>
                <span className="text-[9px] sm:text-xs text-gray-500 hidden xs:inline">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <div 
                className={`rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 text-[11px] sm:text-xs md:text-sm ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-br from-cyan-600/30 to-blue-700/30 text-gray-100 rounded-br-none border border-cyan-500/30' 
                    : 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 rounded-bl-none border border-gray-700'
                }`}
                style={{ lineHeight: '1.4' }}
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
              
              {/* Action buttons for assistant messages */}
              {message.role === 'assistant' && (
                <div className="mt-1.5 sm:mt-2 flex justify-start space-x-1.5">
                  {/* Copy button */}
                  <button
                    onClick={() => copyToClipboard(message.content, message.id)}
                    className="flex items-center text-[10px] sm:text-xs text-gray-400 hover:text-gray-200 transition-colors px-1.5 py-1 rounded-lg hover:bg-gray-700/50"
                    aria-label="Copy message"
                  >
                    {copiedMessageId === message.id ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[10px] sm:text-xs">Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        <span className="text-[10px] sm:text-xs">Copy</span>
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
            <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-1.5 sm:mr-2 md:mr-3 bg-gray-700">
              <img src="/panasa-logo.png" alt="PANASA Logo" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
            </div>
            <div className="flex-1 max-w-[75%] sm:max-w-[80%] md:max-w-[85%]">
              <div className="flex items-center mb-0.5 sm:mb-1">
                <span className="text-[10px] sm:text-xs font-medium text-gray-400">PANASA Bot</span>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 rounded-2xl rounded-bl-none px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 text-[11px] sm:text-xs md:text-sm border border-gray-700">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              <div className="mt-1 text-[9px] sm:text-xs text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="hidden xs:inline">PANASA Bot is typing...</span>
                <span className="xs:hidden">Typing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area - Improved design with better mobile responsiveness */}
      <form onSubmit={handleSubmit} className="border-t border-gray-700/50 pt-2 sm:pt-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message PANASA Bot..."
            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl pl-3 pr-10 py-2.5 sm:pl-4 sm:pr-12 sm:py-3 text-xs sm:text-sm md:text-base text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500"
            disabled={isLoading}
            aria-label="Type your message"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className={`absolute right-2.5 top-1/2 transform -translate-y-1/2 rounded-full p-1 sm:p-1.5 ${
              isLoading || !inputValue.trim() ? 'text-gray-600' : 'text-green-400 hover:bg-gray-700'
            }`}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col xs:flex-row justify-between items-center gap-1 mt-2 sm:mt-3">
          <p className="text-[9px] sm:text-xs text-gray-500 text-center xs:text-left w-full xs:w-auto">
            PANASA Bot references WESPA Rules V5.1. Please verify important information.
          </p>
          <div className="hidden sm:flex items-center text-xs text-gray-500 mt-1 xs:mt-0">
            <kbd className="px-1.5 py-0.5 rounded bg-gray-700 text-gray-300 text-[10px] sm:text-xs">Enter</kbd>
            <span className="mx-1">to send</span>
            <kbd className="px-1.5 py-0.5 rounded bg-gray-700 text-gray-300 ml-2 text-[10px] sm:text-xs">Ctrl+Shift+K</kbd>
            <span className="mx-1">to clear</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatbaseChatbot;