import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

// Initialize ElevenLabs client
const elevenlabs = new ElevenLabsClient({
  apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY,
});

// Voice configuration - using a clear, professional voice
const DEFAULT_VOICE_ID = 'JBFqnCBsd6RMkjVDRZzb'; // This is a good default voice
const DEFAULT_MODEL_ID = 'eleven_multilingual_v2';
const DEFAULT_OUTPUT_FORMAT = 'mp3_44100_128';

// Cache for storing recently played audio
const audioCache = new Map<string, ReadableStream>();

/**
 * Convert text to speech using ElevenLabs API
 * @param text The text to convert to speech
 * @param voiceId Optional voice ID to use
 * @returns Audio stream or buffer
 */
export const textToSpeech = async (text: string, voiceId?: string) => {
  try {
    // Skip if text is empty
    if (!text.trim()) {
      return null;
    }

    // Check cache first
    const cacheKey = `${voiceId || DEFAULT_VOICE_ID}:${text}`;
    if (audioCache.has(cacheKey)) {
      return audioCache.get(cacheKey);
    }

    // Convert text to speech
    const audio = await elevenlabs.textToSpeech.convert(voiceId || DEFAULT_VOICE_ID, {
      text: text,
      modelId: DEFAULT_MODEL_ID,
      outputFormat: DEFAULT_OUTPUT_FORMAT,
    });

    // Cache the result for future use (limit cache size)
    if (audioCache.size > 50) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    
    // Store the audio stream in cache
    audioCache.set(cacheKey, audio);
    return audio;
  } catch (error) {
    console.error('Error generating speech:', error);
    return null;
  }
};

/**
 * Play audio using the browser's audio capabilities
 * @param audioStream The audio stream to play
 */
export const playAudio = async (audioStream: ReadableStream) => {
  try {
    // Convert ReadableStream to Blob
    const reader = audioStream.getReader();
    const chunks = [];
    let done = false;
    
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) {
        chunks.push(value);
      }
    }
    
    const audioBlob = new Blob(chunks, { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // Create and play audio
    const audio = new Audio(audioUrl);
    await audio.play();
    
    // Clean up the URL object after playback
    audio.addEventListener('ended', () => {
      URL.revokeObjectURL(audioUrl);
    });
    
    return audio;
  } catch (error) {
    console.error('Error playing audio:', error);
    return null;
  }
};

/**
 * Speak text using ElevenLabs TTS
 * @param text The text to speak
 * @param voiceId Optional voice ID to use
 */
export const speakText = async (text: string, voiceId?: string) => {
  try {
    const audioStream = await textToSpeech(text, voiceId);
    if (audioStream) {
      const audio = await playAudio(audioStream);
      return audio;
    }
    return null;
  } catch (error) {
    console.error('Error speaking text:', error);
    return null;
  }
};

/**
 * Get available voices from ElevenLabs
 */
export const getVoices = async () => {
  try {
    const voices = await elevenlabs.voices.getAll();
    return voices;
  } catch (error) {
    console.error('Error fetching voices:', error);
    return [];
  }
};

/**
 * Stop currently playing audio
 * @param audio The audio element to stop
 */
export const stopAudio = (audio: HTMLAudioElement | null) => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
};

export default {
  textToSpeech,
  playAudio,
  speakText,
  getVoices,
  stopAudio,
};