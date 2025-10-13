# ElevenLabs Text-to-Speech Integration

This document explains how to integrate ElevenLabs text-to-speech functionality into the PANASA Bot chatbot.

## Overview

The ElevenLabs integration allows the PANASA Bot to speak its responses aloud using state-of-the-art text-to-speech technology. Users can click a "Speak" button next to each bot response to hear it spoken aloud.

## Setup Instructions

### 1. Obtain an ElevenLabs API Key

1. Sign up for an account at [ElevenLabs](https://elevenlabs.io/)
2. Navigate to your [API Keys page](https://elevenlabs.io/app/settings/api-keys)
3. Create a new API key
4. Copy the API key for use in the next step

### 2. Configure Environment Variables

Add your ElevenLabs API key to your `.env` file:

```env
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

### 3. Install Dependencies

The required dependencies should already be installed, but if needed:

```bash
npm install @elevenlabs/elevenlabs-js dotenv
```

## Features

### Speak Button

Each assistant message now includes a "Speak" button that allows users to hear the response spoken aloud. The button provides visual feedback when audio is playing.

### Voice Configuration

The integration uses a professional, clear voice by default:
- **Voice ID**: JBFqnCBsd6RMkjVDRZzb
- **Model**: eleven_multilingual_v2
- **Output Format**: mp3_44100_128

### Responsive Design

The speak functionality works on both desktop and mobile devices with appropriately sized buttons and visual feedback.

## Technical Implementation

### Service Layer

The integration is implemented in `src/services/elevenlabsService.ts` with the following functions:

1. `textToSpeech(text)` - Converts text to speech using ElevenLabs API
2. `playAudio(audioStream)` - Plays the audio stream in the browser
3. `speakText(text)` - Combines the above functions for easy use

### Component Integration

The `ChatbaseChatbot.tsx` component has been updated to include:
- Speak buttons for each assistant message
- Visual feedback during audio playback
- Proper state management for speaking status

## Usage

1. Users can click the "Speak" button next to any bot response
2. The text will be converted to speech and played through the device's speakers
3. Visual feedback shows when audio is playing
4. Users can click "Speak" on another message to interrupt current playback

## Customization

### Changing the Voice

To use a different voice, update the `DEFAULT_VOICE_ID` in `src/services/elevenlabsService.ts`:

```typescript
const DEFAULT_VOICE_ID = 'your_preferred_voice_id';
```

### Adjusting Audio Settings

Modify the model and output format in the same file:

```typescript
const DEFAULT_MODEL_ID = 'eleven_multilingual_v2';
const DEFAULT_OUTPUT_FORMAT = 'mp3_44100_128';
```

## Troubleshooting

### No Audio Playback

1. Ensure your device audio is not muted
2. Check that your browser allows audio playback
3. Verify your ElevenLabs API key is correct
4. Check the browser console for error messages

### API Key Issues

1. Confirm your API key is correctly set in the `.env` file
2. Verify you have sufficient credits in your ElevenLabs account
3. Check that the API key has not been revoked

## Security Considerations

- Store API keys securely in environment variables
- Never commit API keys to version control
- Use different API keys for development and production environments
- Monitor API usage to detect unusual activity

## Performance Optimization

The integration includes several performance optimizations:
- Audio streams are properly cleaned up after playback
- Only one audio stream plays at a time
- Minimal impact on chatbot performance
- Efficient state management for speaking status

## Browser Support

The text-to-speech functionality works in all modern browsers that support:
- Audio API
- Fetch API
- ES6 JavaScript features

## Accessibility

The speak functionality includes:
- Proper ARIA labels for screen readers
- Keyboard navigable buttons
- Visual feedback for non-audio users
- Sufficient color contrast for all users