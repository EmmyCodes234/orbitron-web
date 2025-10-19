# Chatbase Environment Setup

This guide explains how to properly configure environment variables for the Chatbase integration.

## Environment Variables

The Chatbase integration uses the following environment variables:

| Variable | Description | Required | Default Value |
|----------|-------------|----------|---------------|
| VITE_CHATBASE_API_KEY | Your Chatbase API key | Yes | 'YOUR_CHATBASE_API_KEY' |
| VITE_CHATBASE_CHATBOT_ID | Your Chatbase chatbot ID | Yes | 'YOUR_CHATBOT_ID' |
| VITE_CHATBASE_API_URL | Chatbase API endpoint | No | 'https://www.chatbase.co/api/v1/chat' |
| VITE_CHATBASE_STREAMING_ENABLED | Enable streaming responses | No | true |

## Setup Instructions

### 1. Create Environment Files

Create a `.env` file in the root of your project:

```bash
# .env
VITE_CHATBASE_API_KEY=your_actual_api_key_here
VITE_CHATBASE_CHATBOT_ID=your_actual_chatbot_id_here
VITE_CHATBASE_API_URL=https://www.chatbase.co/api/v1/chat
VITE_CHATBASE_STREAMING_ENABLED=true
```

For different environments, you can create:

- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env.local` - Local overrides (add to .gitignore)

### 2. Security Best Practices

1. **Never commit API keys to version control**
   - Add `.env.local` to your `.gitignore` file
   - Use placeholder values in `.env` files that are committed

2. **Environment-specific keys**
   - Use different API keys for development and production
   - Rotate keys regularly

3. **Access in code**
   ```typescript
   // Correct way to access environment variables in Vite
   const apiKey = import.meta.env.VITE_CHATBASE_API_KEY;
   
   // Fallback values for development
   const apiKey = import.meta.env.VITE_CHATBASE_API_KEY || 'YOUR_CHATBASE_API_KEY';
   ```

### 3. Development vs Production

#### Development Setup
```bash
# .env.development
VITE_CHATBASE_API_KEY=dev_api_key_12345
VITE_CHATBASE_CHATBOT_ID=dev_chatbot_id_12345
VITE_CHATBASE_STREAMING_ENABLED=true
```

#### Production Setup
```bash
# .env.production
VITE_CHATBASE_API_KEY=prod_api_key_67890
VITE_CHATBASE_CHATBOT_ID=prod_chatbot_id_67890
VITE_CHATBASE_STREAMING_ENABLED=true
```

### 4. Testing Environment Variables

To verify your environment variables are set correctly:

1. **In your browser console**:
   ```javascript
   console.log(import.meta.env.VITE_CHATBASE_API_KEY);
   ```

2. **In your application code**:
   ```typescript
   import { getChatbaseConfig } from './src/config/chatbase';
   
   const config = getChatbaseConfig();
   console.log('Chatbase config:', config);
   ```

## Troubleshooting

### Common Issues

1. **Environment variables returning undefined**
   - Ensure variable names start with `VITE_`
   - Restart the development server after adding new variables
   - Check for typos in variable names

2. **API key not working**
   - Verify the API key is correct and active
   - Check that the key has proper permissions
   - Ensure you're using the correct chatbot ID

3. **Streaming not working**
   - Verify `VITE_CHATBASE_STREAMING_ENABLED` is set to `true`
   - Check browser console for errors
   - Ensure the Chatbase API supports streaming for your plan

### Debugging Tips

1. **Log configuration at startup**:
   ```typescript
   const config = getChatbaseConfig();
   console.log('Chatbase configuration:', config);
   ```

2. **Check for missing variables**:
   ```typescript
   if (!config.apiKey || config.apiKey === 'YOUR_CHATBASE_API_KEY') {
     console.warn('Chatbase API key is not configured properly');
   }
   ```

## Example Configuration

### Basic Setup
```bash
# .env
VITE_CHATBASE_API_KEY=cbk_1234567890abcdef
VITE_CHATBASE_CHATBOT_ID=cbid_0987654321fedcba
```

### Advanced Setup
```bash
# .env
VITE_CHATBASE_API_KEY=cbk_1234567890abcdef
VITE_CHATBASE_CHATBOT_ID=cbid_0987654321fedcba
VITE_CHATBASE_API_URL=https://www.chatbase.co/api/v1/chat
VITE_CHATBASE_STREAMING_ENABLED=true
```

## CI/CD Integration

When deploying through CI/CD pipelines, set environment variables in your pipeline configuration:

### GitHub Actions
```yaml
env:
  VITE_CHATBASE_API_KEY: ${{ secrets.CHATBASE_API_KEY }}
  VITE_CHATBASE_CHATBOT_ID: ${{ secrets.CHATBASE_CHATBOT_ID }}
```

### Netlify
In Netlify dashboard under "Build & deploy" → "Environment":

```
VITE_CHATBASE_API_KEY = cbk_1234567890abcdef
VITE_CHATBASE_CHATBOT_ID = cbid_0987654321fedcba
```

## Security Considerations

1. **Client-side exposure**
   - Environment variables prefixed with `VITE_` are embedded in the client bundle
   - Only use API keys that are safe for client-side use
   - Consider using a backend proxy for sensitive operations

2. **Key rotation**
   - Set up regular key rotation procedures
   - Monitor API usage for unusual activity
   - Have a process for quickly replacing compromised keys

3. **Access control**
   - Restrict API key permissions to only what's needed
   - Use separate keys for different environments
   - Implement rate limiting where possible