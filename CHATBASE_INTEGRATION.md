# Chatbase AI Chatbot Integration

This document explains how to integrate and configure the Chatbase AI chatbot for the PANASA website.

## Overview

The Chatbase integration provides an AI-powered chatbot that can answer questions about PANASA, scrabble tournaments, player ratings, and upcoming events. The chatbot is implemented as a floating widget that appears on all pages of the website.

## Features

- Floating chat widget accessible from any page
- Real-time streaming responses for better user experience
- Responsive design that works on mobile and desktop
- Custom styling to match the website's design
- Welcome message for first-time users
- Error handling for API issues

## Setup Instructions

### 1. Obtain API Credentials

To use the Chatbase chatbot, you need to obtain your API credentials:

1. Visit your [Chatbase Dashboard](https://www.chatbase.co/dashboard)
2. Navigate to **Workspace Settings** → **API Keys**
3. Click **Create API Key** and copy the generated key
4. Select your AI Agent in the dashboard
5. Go to **Settings** → **General**
6. Copy the **Chatbot ID** (UUID format)

### 2. Configure the Chatbot

Update the configuration in `constants/chatbase.ts`:

```typescript
export const CHATBASE_CONFIG = {
  // Your Chatbase API key
  API_KEY: 'YOUR_CHATBASE_API_KEY',
  
  // Your Chatbase chatbot ID
  CHATBOT_ID: 'YOUR_CHATBOT_ID',
  
  // Chatbase API endpoint
  API_URL: 'https://www.chatbase.co/api/v1/chat',
  
  // Enable streaming for real-time responses
  STREAMING_ENABLED: true,
};
```

### 3. Test the Integration

After configuring the API credentials:

1. Start the development server: `npm run dev`
2. Navigate to any page on the website
3. Click the chat icon in the bottom right corner
4. Type a message and verify that you receive a response from the AI

## Customization

### Styling

The chatbot uses Tailwind CSS classes that match the website's color scheme:
- Primary colors: Green (#10B981) and Cyan (#06B6D4)
- Background: Dark slate colors
- Text: White and light gray

### Position

The chat widget is positioned in the bottom right corner of the screen. To change the position, modify the CSS classes in the ChatbaseChatbot component:

```tsx
// Change these classes to reposition the chat widget
className="fixed bottom-6 right-6 ..."
```

### Welcome Message

The welcome message can be customized in the `toggleChat` function:

```typescript
content: 'Hello! I\'m here to help answer your questions about PANASA. How can I assist you today?'
```

## API Integration Details

### Endpoints Used

- **Chat API**: `https://www.chatbase.co/api/v1/chat`
- **Method**: POST
- **Authentication**: Bearer token with API key

### Request Format

```json
{
  "messages": [
    {"content": "Hello! How can you help me?", "role": "user"}
  ],
  "chatbotId": "your-chatbot-id-here",
  "stream": true
}
```

### Response Handling

The integration supports both streaming and non-streaming responses:
- **Streaming**: Provides real-time responses as the AI generates them
- **Non-streaming**: Waits for the complete response before displaying

## Troubleshooting

### Common Issues

1. **No response from chatbot**
   - Verify API key and chatbot ID are correct
   - Check browser console for error messages
   - Ensure the Chatbase API is accessible

2. **Styling issues**
   - Confirm Tailwind CSS is properly configured
   - Check that the color classes match the website's design

3. **Widget not appearing**
   - Verify the component is imported in Layout.tsx
   - Check that there are no JavaScript errors in the console

### Error Handling

The integration includes error handling for:
- Network issues
- API errors
- Invalid responses
- Missing configuration

Users will see an error message if the chatbot encounters any issues.

## Maintenance

To update the chatbot:
1. Check for updates to the Chatbase API
2. Review any changes to the widget design
3. Update the API endpoint if necessary
4. Test the integration after any changes

## Security Considerations

- Store API keys securely and never expose them in client-side code
- Use environment variables for production deployments
- Regularly rotate API keys
- Monitor API usage for unusual activity