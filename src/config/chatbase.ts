// Environment-specific configuration for Chatbase
// In a production environment, these values should be loaded from environment variables

export interface ChatbaseConfig {
  apiKey: string;
  chatbotId: string;
  apiUrl: string;
  streamingEnabled: boolean;
}

// For development, you can set these values directly
// For production, use environment variables
export const getChatbaseConfig = (): ChatbaseConfig => {
  return {
    apiKey: import.meta.env.VITE_CHATBASE_API_KEY || 'a0422b95-e042-489e-afb2-dfc4c77387c9',
    chatbotId: import.meta.env.VITE_CHATBASE_CHATBOT_ID || '6J5SNA3NVgeGUft4Yrsah',
    apiUrl: import.meta.env.VITE_CHATBASE_API_URL || 'https://www.chatbase.co/api/v1/chat',
    streamingEnabled: import.meta.env.VITE_CHATBASE_STREAMING_ENABLED 
      ? import.meta.env.VITE_CHATBASE_STREAMING_ENABLED === 'true' 
      : true,
  };
};