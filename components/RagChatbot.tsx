import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../src/supabaseClient';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

// Function to format chatbot responses with premium styling
const formatChatbotResponse = (text: string) => {
    if (!text) return '';
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-gray-100">$1</span>'); // Bold
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<span class="italic text-gray-300">$1</span>'); // Italics

    // Rule citations - Gold/Amber for Arbiter authority
    formattedText = formattedText.replace(/Rule (\d+\.\d+(?:\.\d+)?)/g,
        '<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(251,191,36,0.1)] mx-1 cursor-help" title="WESPA Rule $1">Rule $1</span>');

    // Headers - Sophisticated typography
    formattedText = formattedText.replace(/^### (.*$)/gim, '<h3 class="text-sm font-semibold text-amber-500/90 uppercase tracking-wider mt-4 mb-2 pb-1 border-b border-gray-700/50">$1</h3>');
    formattedText = formattedText.replace(/^## (.*$)/gim, '<h2 class="text-base font-bold text-amber-500 uppercase tracking-wider mt-6 mb-3 pb-2 border-b border-gray-700">$1</h2>');
    formattedText = formattedText.replace(/^# (.*$)/gim, '<h1 class="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 uppercase tracking-widest mt-8 mb-4 pb-2 border-b border-gray-600">$1</h1>');

    // Lists
    formattedText = formattedText.replace(/^\s*\*\s(.*)$/gm, '<li class="ml-4 mb-2 relative pl-4 before:content-[\'\'] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-green-500/80 text-gray-300 leading-relaxed">$1</li>');
    formattedText = formattedText.replace(/(<li.*<\/li>)/gs, '<ul class="list-none my-4 space-y-1">$1</ul>');

    formattedText = formattedText.replace(/\n/g, '<br />');

    return formattedText;
};

const RagChatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
    const [isChatCleared, setIsChatCleared] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const isUserAtBottom = useRef(true);
    const shouldAutoScroll = useRef(true);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Scroll Logic
    const checkIfUserIsAtBottom = () => {
        if (messagesContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
            return scrollTop + clientHeight >= scrollHeight - 30; // Slightly larger buffer
        }
        return true;
    };

    const handleScroll = () => {
        isUserAtBottom.current = checkIfUserIsAtBottom();
    };

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            isUserAtBottom.current = checkIfUserIsAtBottom();
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        if (shouldAutoScroll.current && isUserAtBottom.current && messagesEndRef.current) {
            messagesContainerRef.current?.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isLoading]); // Dependency on isLoading ensures scroll keeps up with streaming

    // Initialization
    useEffect(() => {
        const welcome: Message = {
            id: 'welcome',
            content: "Greetings. I am the **Official PANASA Arbiter Bot**. \n\nI am authorized to interpret the **WESPA Rules (Version 5.1)**. Please state your query regarding gameplay, adjudication, or penalties.",
            role: 'assistant',
            timestamp: new Date()
        };
        setMessages([welcome]);
        setTimeout(() => inputRef.current?.focus(), 500);
    }, []);

    const copyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedMessageId(id);
            setTimeout(() => setCopiedMessageId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const clearChat = () => {
        setMessages([{
            id: 'cleared-' + Date.now(),
            content: 'History cleared. Ready for new adjudication.',
            role: 'assistant',
            timestamp: new Date()
        }]);
        setIsChatCleared(true);
        setTimeout(() => setIsChatCleared(false), 3000);
    };

    const exportChat = () => {
        const chatText = messages
            .filter(msg => msg.content.trim() !== '')
            .map(msg => `${msg.role === 'user' ? 'REQUEST' : 'RULING'}: ${msg.content}`)
            .join('\n\n');
        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `PANASA-Ruling-${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: 'user-' + Date.now(),
            content: inputValue,
            role: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        shouldAutoScroll.current = true;

        const tempId = 'assistant-' + Date.now();
        const tempAssistantMessage: Message = {
            id: tempId,
            content: '',
            role: 'assistant',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, tempAssistantMessage]);

        try {
            // 1. Generate client-side embedding
            // Note: We're lazy loading the pipeline to avoid large bundles if not used
            // This might trigger a download on the first use
            // @ts-ignore
            const { pipeline, env } = await import('@xenova/transformers');

            // Disable local model checks to avoid 404s (which return HTML index.html in Vite)
            env.allowLocalModels = false;

            // You might want to move the pipeline initialization outside/useEffect to avoid reloading
            // But for now, we do it here for simplicity
            // Use 'Xenova/gte-small' which is the standard quantized version for transformers.js
            const pipe = await pipeline('feature-extraction', 'Xenova/gte-small');
            const output = await pipe(inputValue, {
                pooling: 'mean',
                normalize: true,
            });
            const embedding = Array.from(output.data);

            // 2. Send to PHP Backend (which proxies Supabase & Cerebras)
            // DEV: Use localhost:8000 proxy if running locally
            // PROD: Use relative path /panasa-bot.php
            const phpEndpoint = import.meta.env.DEV
                ? 'http://localhost:8000/panasa-bot.php'
                : '/panasa-bot.php';

            const response = await fetch(phpEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(msg => ({ role: msg.role, content: msg.content })),
                    embedding: embedding
                })
            });

            if (!response.ok) throw new Error('Communication failure with Arbiter Core (PHP Backend).');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        // Handle server-sent events or raw text streams
                        // OpenAI format usually sends 'data: ' prefix
                        if (line.startsWith('data: ')) {
                            const dataStr = line.slice(6);
                            if (dataStr === '[DONE]') continue;
                            try {
                                const data = JSON.parse(dataStr);
                                // Check if it's an error object sent as data
                                if (data.error) throw new Error(data.error);

                                const content = data.choices?.[0]?.delta?.content || '';
                                fullResponse += content;

                                setMessages(prev => {
                                    const next = [...prev];
                                    const last = next[next.length - 1];
                                    if (last.id === tempId) {
                                        last.content = fullResponse;
                                    }
                                    return next;
                                });
                            } catch (e) {
                                // console.warn('Stream parse skip', e);
                            }
                        }
                    }
                }
            } else {
                const text = await response.text();
                setMessages(prev => {
                    const next = [...prev];
                    next[next.length - 1].content = text;
                    return next;
                });
            }

        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => {
                const next = [...prev];
                const last = next[next.length - 1];
                if (last.id === tempId) {
                    last.content = "Prior Ruling Unavailable. Connection to Council interrupted. Please retry.";
                    last.content += `\n\nError Details: ${(error as Error).message}`;
                }
                return next;
            });
        } finally {
            setIsLoading(false);
            shouldAutoScroll.current = true;
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
        if (e.key === 'k' && e.ctrlKey && e.shiftKey) {
            e.preventDefault();
            clearChat();
        }
    };

    return (
        <div className="flex flex-col h-full w-full relative">

            {/* Messages Area - Centered Column */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto w-full">
                <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-32 flex flex-col gap-6">

                    {/* Welcome/Empty State */}
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 fade-in duration-700">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-2xl shadow-cyan-500/10">
                                <img src="/panasa-logo.png" className="w-12 h-12 opacity-90" alt="Logo" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-semibold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent tracking-tight">How can I help you judge?</h2>
                                <p className="text-gray-500 mt-2 text-lg">I'm trained on WESPA Rules V5.1</p>
                            </div>

                            {/* Suggestion Chips */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mt-8">
                                {[
                                    "Is 'QI' a valid word?",
                                    "How do I challenge a play?",
                                    "Player over-drew tiles",
                                    "Timer malfunction procedure"
                                ].map((suggestion, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            if (!isLoading) {
                                                setInputValue(suggestion);
                                            }
                                        }}
                                        className="text-left p-4 rounded-xl bg-[#1e2029] border border-white/5 hover:border-cyan-500/30 hover:bg-[#252833] transition-all text-sm text-gray-400 hover:text-gray-200 group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform inline-block">{suggestion}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <AnimatePresence mode="popLayout">
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex max-w-[85%] sm:max-w-[75%] gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* Avatar */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg ${message.role === 'user'
                                        ? 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white'
                                        : 'bg-[#1a1c24] border border-white/10' // Bot avatar minimal
                                        }`}>
                                        {message.role === 'user' ? <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg> : <img src="/panasa-logo.png" className="w-5 h-5 opacity-80" />}
                                    </div>

                                    {/* Message Content */}
                                    <div className={`relative px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${message.role === 'user'
                                        ? 'bg-[#2b2d36] text-gray-100 rounded-tr-sm'
                                        : 'text-gray-300'
                                        }`}>
                                        {message.role === 'assistant' ? (
                                            <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-100 prose-strong:text-cyan-400 prose-ul:text-gray-400 max-w-none">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        a: ({ node, ...props }) => <a {...props} className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer" />,
                                                    }}
                                                >
                                                    {message.content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            message.content
                                        )}

                                        {/* Timestamp/Meta */}
                                        <div className={`text-[10px] mt-2 opacity-40 flex items-center gap-1 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    {isLoading && (
                        <div className="flex justify-start w-full animate-pulse">
                            <div className="flex items-center gap-2 ml-12">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Floating Input Area */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0f1117] via-[#0f1117]/90 to-transparent pt-10 pb-6 pointer-events-none z-20">
                <div className="max-w-3xl mx-auto px-4 xs:px-6 pointer-events-auto w-full">
                    {/* Error Banner Floating */}
                    <AnimatePresence>
                        {/* Error banner logic can go here if state exists for error */}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="relative group w-full">
                        <div className="p-1 rounded-[28px] bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20 hover:bg-[#1a1c24] transition-all duration-300">
                            <div className="relative flex items-end gap-2 px-2 py-2">
                                {/* Attachment Button (Visual Only for now) */}
                                <button type="button" className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors" title="Attach context">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                </button>

                                <textarea
                                    ref={inputRef}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Request a ruling (e.g., 'Is PHONY allowed?')"
                                    className="w-full bg-transparent text-gray-100 placeholder-gray-500 text-base px-2 py-2.5 min-h-[52px] max-h-[200px] focus:outline-none resize-none scroll-thin"
                                    style={{ height: '52px' }}
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim()}
                                    className={`p-2.5 rounded-full mb-0.5 transition-all duration-200 ${inputValue.trim()
                                        ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-500'
                                        : 'bg-white/5 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <p className="text-[10px] text-gray-500">
                                PANASA Bot can make mistakes. Verify important rulings with the official WESPA V5.1 PDF.
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default RagChatbot;
