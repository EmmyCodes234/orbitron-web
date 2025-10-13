import React, { useState } from 'react';
import { speakText, getVoices } from '../src/services/elevenlabsService';

const ElevenLabsTestPage: React.FC = () => {
  const [text, setText] = useState('Hello, this is a test of the ElevenLabs text-to-speech integration with PANASA Bot.');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('JBFqnCBsd6RMkjVDRZzb'); // Default voice ID

  const handleSpeak = async () => {
    if (!text.trim()) return;
    
    setIsSpeaking(true);
    try {
      await speakText(text, selectedVoice);
    } catch (error) {
      console.error('Error speaking text:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const fetchVoices = async () => {
    try {
      const voicesData = await getVoices();
      setVoices(voicesData || []);
    } catch (error) {
      console.error('Error fetching voices:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">ElevenLabs TTS Test</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Text to Speak</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white"
              rows={4}
              placeholder="Enter text to convert to speech..."
            />
          </div>
          
          <div className="mb-4">
            <button
              onClick={fetchVoices}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-4"
            >
              Load Voices
            </button>
            
            {voices.length > 0 && (
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="bg-gray-700 text-white px-3 py-2 rounded-md"
              >
                {voices.map((voice) => (
                  <option key={voice.voice_id} value={voice.voice_id}>
                    {voice.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          <button
            onClick={handleSpeak}
            disabled={isSpeaking || !text.trim()}
            className={`px-6 py-3 rounded-md font-medium ${
              isSpeaking || !text.trim()
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isSpeaking ? 'Speaking...' : 'Speak Text'}
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Enter text in the textarea above</li>
            <li>Click "Load Voices" to fetch available voices from ElevenLabs</li>
            <li>Select a voice from the dropdown (if loaded)</li>
            <li>Click "Speak Text" to hear the text-to-speech conversion</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ElevenLabsTestPage;