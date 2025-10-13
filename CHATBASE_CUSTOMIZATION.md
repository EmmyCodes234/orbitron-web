# Chatbase Chatbot Customization Guide

This guide explains how to customize the Chatbase chatbot integration for specific needs and preferences.

## Customizing the Chat Interface

### Changing the Position

The chat widget is positioned in the bottom right corner by default. To change its position, modify the CSS classes in the ChatbaseChatbot component:

```tsx
// Current positioning (bottom right)
className="fixed bottom-6 right-6 ..."

// Top right positioning
className="fixed top-6 right-6 ..."

// Bottom left positioning
className="fixed bottom-6 left-6 ..."

// Center positioning
className="fixed bottom-6 left-1/2 transform -translate-x-1/2 ..."
```

### Modifying Colors

The chat widget uses the website's color scheme. To change colors, modify these classes:

```tsx
// Toggle button gradient
className="bg-gradient-to-r from-green-500 to-cyan-500 ..."

// User message bubble
className="bg-gradient-to-r from-green-500 to-cyan-500 ..."

// Assistant message bubble
className="bg-slate-800 ..."
```

### Adjusting Size

To change the chat window size, modify these classes:

```tsx
// Chat container size
className="w-full max-w-md h-[70vh] max-h-[600px] ..."

// For a larger chat window:
className="w-full max-w-lg h-[80vh] max-h-[700px] ..."

// For a smaller chat window:
className="w-full max-w-sm h-[60vh] max-h-[500px] ..."
```

## Customizing Behavior

### Welcome Message

The welcome message is defined in the `toggleChat` function:

```typescript
setMessages([
  { 
    content: 'Hello! I\'m here to help answer your questions about PANASA. How can I assist you today?', 
    role: 'assistant' 
  }
]);
```

To customize the welcome message, simply change the content string.

### Message Styling

To modify how messages appear, adjust the message rendering code:

```tsx
<div 
  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
    message.role === 'user' 
      ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-br-none' 
      : 'bg-slate-800 text-gray-100 rounded-bl-none border border-slate-700'
  }`}
>
  {message.content}
</div>
```

### Adding Custom Features

#### Timestamps

To add timestamps to messages:

```tsx
// Add timestamp to message interface
interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date; // Add this
}

// When adding messages:
const userMessage: Message = { 
  content: inputValue, 
  role: 'user',
  timestamp: new Date() 
};

// In the render:
<span className="text-xs text-gray-500 mt-1">
  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
</span>
```

#### Message Avatars

To add avatars to messages:

```tsx
// Add avatar URLs to message interface
interface Message {
  content: string;
  role: 'user' | 'assistant';
  avatar?: string; // Add this
}

// In the render:
<div className="flex items-start space-x-2">
  <img 
    src={message.avatar || (message.role === 'user' ? '/user-avatar.png' : '/bot-avatar.png')} 
    alt={`${message.role} avatar`}
    className="w-8 h-8 rounded-full"
  />
  <div className={`...`}>
    {message.content}
  </div>
</div>
```

## Advanced Customization

### Adding Quick Replies

To add quick reply buttons:

```tsx
// Add quick replies state
const [quickReplies, setQuickReplies] = useState<string[]>([]);

// Show quick replies based on context
const generateQuickReplies = (lastMessage: string) => {
  if (lastMessage.includes('tournament')) {
    return ['When is the next tournament?', 'How do I register?', 'Tournament rules'];
  }
  if (lastMessage.includes('rating')) {
    return ['How are ratings calculated?', 'Check my rating', 'Rating requirements'];
  }
  return ['Tournaments', 'Player ratings', 'Contact info'];
};

// In the render:
{quickReplies.length > 0 && (
  <div className="flex flex-wrap gap-2 p-3 border-t border-slate-700">
    {quickReplies.map((reply, index) => (
      <button
        key={index}
        onClick={() => {
          setInputValue(reply);
          setQuickReplies([]);
        }}
        className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 rounded-full transition-colors"
      >
        {reply}
      </button>
    ))}
  </div>
)}
```

### Typing Indicators

Enhance the typing indicator:

```tsx
{isLoading && (
  <div className="flex justify-start items-end space-x-2">
    <div className="bg-slate-800 text-gray-100 rounded-2xl rounded-bl-none px-4 py-2.5 text-sm border border-slate-700">
      <div className="flex space-x-1 items-center">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        <span className="ml-2 text-xs text-gray-500">PANASA Assistant is typing...</span>
      </div>
    </div>
  </div>
)}
```

### Persistent Chat History

To save chat history between sessions:

```typescript
// Save messages to localStorage
useEffect(() => {
  localStorage.setItem('chatbase-messages', JSON.stringify(messages));
}, [messages]);

// Load messages from localStorage on component mount
useEffect(() => {
  const savedMessages = localStorage.getItem('chatbase-messages');
  if (savedMessages) {
    setMessages(JSON.parse(savedMessages));
  }
}, []);
```

## Customizing API Integration

### Adding Custom Headers

To add custom headers to API requests:

```typescript
const requestOptions = {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'X-Custom-Header': 'custom-value', // Add custom headers here
    'User-Agent': 'PANASA-Website/1.0'
  },
  body: JSON.stringify({
    messages: [...messages, userMessage],
    chatbotId: chatbotId,
    stream: streamingEnabled
  })
};
```

### Error Handling Customization

To customize error messages:

```typescript
catch (error) {
  console.error('Error sending message:', error);
  let errorMessage = 'Sorry, I encountered an error. Please try again.';
  
  if (error instanceof TypeError) {
    errorMessage = 'Network error. Please check your connection and try again.';
  } else if (error.message.includes('401')) {
    errorMessage = 'Authentication failed. Please contact support.';
  } else if (error.message.includes('429')) {
    errorMessage = 'Too many requests. Please wait a moment and try again.';
  }
  
  setMessages(prev => {
    const newMessages = [...prev];
    newMessages[newMessages.length - 1] = { 
      content: errorMessage, 
      role: 'assistant' 
    };
    return newMessages;
  });
}
```

### Adding Analytics

To track chat interactions:

```typescript
// Track message sent
const trackMessage = (message: Message) => {
  // Your analytics implementation
  console.log('Message sent:', message);
  
  // Example with Google Analytics
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'chat_message', {
      'message_role': message.role,
      'message_length': message.content.length
    });
  }
};

// Call when sending messages
trackMessage(userMessage);
```

## Testing Customizations

### Development Testing

1. **Visual Testing**:
   - Test on different screen sizes
   - Check color contrast for accessibility
   - Verify animations work smoothly

2. **Functional Testing**:
   - Test all user interactions
   - Verify error states
   - Check loading states

3. **Performance Testing**:
   - Monitor bundle size impact
   - Check rendering performance
   - Verify memory usage

### User Testing

1. **Usability Testing**:
   - Conduct user interviews
   - Gather feedback on positioning
   - Test quick reply effectiveness

2. **A/B Testing**:
   - Test different welcome messages
   - Compare different color schemes
   - Evaluate different chat window sizes

## Best Practices

1. **Accessibility**:
   - Ensure proper contrast ratios
   - Add ARIA labels for screen readers
   - Support keyboard navigation

2. **Performance**:
   - Minimize re-renders
   - Optimize animations
   - Cache frequently used data

3. **Security**:
   - Never expose API keys
   - Validate all user inputs
   - Sanitize message content

4. **User Experience**:
   - Keep messages concise
   - Provide clear error messages
   - Offer helpful quick replies

## Troubleshooting Customizations

### Common Issues

1. **Styling Not Applied**:
   - Check Tailwind CSS configuration
   - Verify class names are correct
   - Ensure styles aren't being overridden

2. **Positioning Issues**:
   - Check z-index values
   - Verify fixed positioning
   - Test on different devices

3. **Functionality Problems**:
   - Check browser console for errors
   - Verify API credentials
   - Test network connectivity

### Debugging Tips

1. **Console Logging**:
   ```typescript
   console.log('Messages:', messages);
   console.log('Config:', config);
   ```

2. **Component Inspection**:
   - Use React DevTools
   - Check component props
   - Monitor state changes

3. **Network Monitoring**:
   - Use browser dev tools
   - Check API request/response
   - Monitor loading times