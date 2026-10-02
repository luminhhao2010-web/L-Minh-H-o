import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { MascotKienSang } from './MascotKienSang';
import { getAnswerFromKnowledgeBase } from '../data/knowledgeBase';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  RotateCcw, 
  HelpCircle,
  CheckCircle2,
  Copy,
  Check,
  Mic,
  MicOff,
  Radio,
  Headphones
} from 'lucide-react';
import { playClickSound, playTingTingSound } from '../utils/audio';
import { 
  speakVietnamese, 
  stopSpeech, 
  createVietnameseSpeechRecognizer, 
  isSpeechRecognitionSupported, 
  isSpeechSynthesisSupported 
} from '../utils/speech';
import { VoiceChatModal } from './VoiceChatModal';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'kiensang',
    text: `Chào bạn! Mình là chú Kiến Sáng – người bạn đồng hành cùng bạn học tập Chuyên đề Địa lí 11: "Hợp tác hòa bình trong khai thác Biển Đông và liên hệ Việt Nam" và khám phá tri thức toàn diện về biển đảo quê hương! 🌊⚓🎙️

Bạn có thể **GÕ TIN NHẮN** hoặc **NHẤN VÀO MICRO NÓI TIẾNG VIỆT** để trò chuyện trực tiếp với mình nhé! Mình nắm vững toàn bộ kiến thức SGK, Nhà giàn DK1, Châu bản triều Nguyễn, Phán quyết PCA 2016, hiện tượng nước trồi, sinh thái biển và luật biển quốc tế!`,
    timestamp: 'Vừa xong',
    suggestions: [
      'Phát bộ câu hỏi Thuyền Trưởng Trổ Tài (Địa 11)',
      'Tên gọi và độ sâu kỷ lục của Biển Đông?',
      '4 Eo biển huyết mạch kết nối Biển Đông?',
      'Khung pháp lý 5 vùng biển theo UNCLOS 1982?',
      'Ý nghĩa chiến lược của hệ thống Nhà giàn DK1?',
      'Châu bản triều Nguyễn ghi gì về Hoàng Sa, Trường Sa?',
      'Phán quyết PCA 2016 có nội dung then chốt gì?',
      'Lập trường và Chiến lược kinh tế biển Việt Nam?',
      'Hiện tượng nước trồi Ninh Thuận - Bình Thuận là gì?'
    ]
  }
];

interface TabChatbotProps {
  initialQuery?: string;
}

export const TabChatbot: React.FC<TabChatbotProps> = ({ initialQuery }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Voice Chat features
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isListeningInput, setIsListeningInput] = useState(false);
  const [autoTTS, setAutoTTS] = useState(true);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRecognizerRef = useRef<{ start: () => void; stop: () => void; abort: () => void } | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    return () => {
      stopSpeech();
      inputRecognizerRef.current?.abort();
    };
  }, []);

  const handleSendMessage = async (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text || isTyping) return;

    // Stop speaking active audio when a new message is sent
    stopSpeech();
    setSpeakingId(null);
    playClickSound();

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    // Try server-side API or fallback to enriched knowledge base
    setTimeout(async () => {
      let botResponse = getAnswerFromKnowledgeBase(text);

      // Attempt /api/chat fetch if available
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.answer) {
            botResponse = {
              text: data.answer,
              reference: data.reference || 'Tư liệu Chuyên đề Địa lí 11 & Tri thức Biển Đông',
              suggestions: data.suggestions || botResponse.suggestions
            };
          }
        }
      } catch {
        // Fallback to local textbook knowledge base
      }

      const botMessageId = `k-${Date.now()}`;
      const botMessage: ChatMessage = {
        id: botMessageId,
        sender: 'kiensang',
        text: botResponse.text,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        reference: botResponse.reference,
        suggestions: botResponse.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      playTingTingSound();

      // Auto read out in natural Vietnamese voice if enabled
      if (autoTTS && isSpeechSynthesisSupported()) {
        setSpeakingId(botMessageId);
        speakVietnamese(
          botResponse.text,
          () => setSpeakingId(botMessageId),
          () => setSpeakingId(null),
          () => setSpeakingId(null)
        );
      }
    }, 500);
  };

  // Text to speech for Kiến Sáng in friendly natural Vietnamese
  const handleSpeak = (msgId: string, text: string) => {
    if (speakingId === msgId) {
      stopSpeech();
      setSpeakingId(null);
      return;
    }

    playClickSound();
    stopSpeech();
    setSpeakingId(msgId);
    speakVietnamese(
      text,
      () => setSpeakingId(msgId),
      () => setSpeakingId(null),
      () => setSpeakingId(null)
    );
  };

  // Voice dictation into the text input
  const handleToggleInputMic = () => {
    playClickSound();
    setVoiceError(null);

    if (isListeningInput) {
      inputRecognizerRef.current?.stop();
      setIsListeningInput(false);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      setVoiceError('Trình duyệt chưa hỗ trợ Web Speech Recognition. Bạn có thể mở Voice Chat hoặc gõ câu hỏi nhé!');
      setTimeout(() => setVoiceError(null), 4000);
      return;
    }

    setIsListeningInput(true);
    inputRecognizerRef.current = createVietnameseSpeechRecognizer({
      onStart: () => {
        setIsListeningInput(true);
      },
      onResult: (transcript, isFinal) => {
        setInputQuery(transcript);
        if (isFinal && transcript.trim()) {
          setIsListeningInput(false);
          handleSendMessage(transcript.trim());
        }
      },
      onError: (err) => {
        setVoiceError(err);
        setIsListeningInput(false);
        setTimeout(() => setVoiceError(null), 4000);
      },
      onEnd: () => {
        setIsListeningInput(false);
      }
    });

    inputRecognizerRef.current?.start();
  };

  const handleCopy = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    playClickSound();
    setMessages(INITIAL_MESSAGES);
    stopSpeech();
    setSpeakingId(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-6 h-[calc(100vh-140px)] min-h-[580px] flex flex-col">
      {/* Top Header Card with Voice Chat controls */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#0D3059] to-[#081B30] border border-cyan-500/30 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <MascotKienSang size={56} expression={speakingId ? 'talking' : isTyping ? 'thinking' : 'waving'} />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-1.5">
                Trợ Lý AI Kiến Sáng Đồng Hành
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </h2>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                Online
              </span>
            </div>
            <p className="text-xs text-cyan-200/80">
              Giải đáp Địa lí 11, Lịch sử, Hải văn, DK1 & Hợp tác hòa bình Biển Đông
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Live Voice Chat Mode Button */}
          <button
            onClick={() => {
              playClickSound();
              setIsVoiceModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
            title="Mở giao diện đàm thoại trực tiếp bằng giọng nói tiếng Việt"
          >
            <Radio className="w-4 h-4 animate-pulse text-slate-950" />
            <span>Voice Chat 1-1</span>
          </button>

          {/* Auto-TTS Toggle */}
          <button
            onClick={() => {
              playClickSound();
              if (speakingId) {
                stopSpeech();
                setSpeakingId(null);
              }
              setAutoTTS(!autoTTS);
            }}
            className={`px-3 py-2 rounded-2xl border text-xs flex items-center gap-1.5 transition-colors ${
              autoTTS 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' 
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
            }`}
            title={autoTTS ? 'Đang bật tự động cất giọng đọc phản hồi' : 'Tắt tự động đọc giọng nói'}
          >
            {autoTTS ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Giọng đọc: {autoTTS ? 'Bật' : 'Tắt'}</span>
          </button>

          {/* Refresh Conversation */}
          <button
            onClick={handleClearHistory}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
            title="Làm mới cuộc trò chuyện"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-[#081F36]/80 border border-cyan-500/20 rounded-3xl p-4 sm:p-6 space-y-4 shadow-inner no-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isCurrentSpeaking = speakingId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0 mt-0.5">
                {isUser ? (
                  <div className="w-9 h-9 rounded-2xl bg-cyan-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                    <User className="w-5 h-5" />
                  </div>
                ) : (
                  <MascotKienSang 
                    size={42} 
                    expression={isCurrentSpeaking ? 'talking' : 'happy'} 
                  />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                  isUser
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-medium rounded-tr-none'
                    : `bg-slate-900/90 text-slate-100 rounded-tl-none border ${
                        isCurrentSpeaking ? 'border-cyan-400 shadow-cyan-500/20 shadow-lg' : 'border-cyan-500/30'
                      }`
                }`}>
                  <div className="whitespace-pre-line">
                    {msg.text}
                  </div>

                  {/* Reference Citation */}
                  {msg.reference && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 text-[11px] text-cyan-300/80 flex items-center gap-1 italic">
                      <BookOpen className="w-3 h-3 text-cyan-400 inline flex-shrink-0" />
                      <span>Nguồn: {msg.reference}</span>
                    </div>
                  )}

                  {/* Action buttons on message (Speech, Copy) */}
                  {!isUser && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
                      <button
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        className={`p-1 px-2 rounded-lg hover:bg-white/10 flex items-center gap-1.5 transition-colors ${
                          isCurrentSpeaking ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40' : ''
                        }`}
                        title="Đọc câu trả lời bằng giọng nói tiếng Việt tự nhiên"
                      >
                        {isCurrentSpeaking ? (
                          <>
                            <div className="flex items-center gap-0.5 h-3">
                              <span className="w-0.5 bg-cyan-400 animate-soundWave"></span>
                              <span className="w-0.5 bg-cyan-400 animate-soundWave [animation-delay:0.2s]"></span>
                              <span className="w-0.5 bg-cyan-400 animate-soundWave [animation-delay:0.4s]"></span>
                            </div>
                            <VolumeX className="w-3.5 h-3.5 text-cyan-300" />
                            <span>Dừng đọc</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Nghe đọc</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="p-1 px-2 rounded-lg hover:bg-white/10 flex items-center gap-1 transition-colors ml-1"
                        title="Sao chép nội dung"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === msg.id ? 'Đã chép' : 'Sao chép'}</span>
                      </button>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Quick Prompts Suggestions pills */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.suggestions.map((promptText, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(promptText)}
                        className="text-left text-xs bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1.5 rounded-xl transition-all hover:scale-102 flex items-center gap-1.5"
                      >
                        <HelpCircle className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                        <span>{promptText}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <MascotKienSang size={38} expression="thinking" />
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2">
              <span className="animate-pulse font-medium">Kiến Sáng đang tổng hợp tư liệu Địa lí 11 & Biển Đông...</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-200"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Error Notification */}
      {voiceError && (
        <div className="mt-2 p-2 px-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <span>{voiceError}</span>
        </div>
      )}

      {/* Voice Listening Preview Banner */}
      {isListeningInput && (
        <div className="mt-2 p-2.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-400/50 text-cyan-300 text-xs flex items-center justify-between shadow-lg animate-pulse">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <span className="font-semibold">Đang lắng nghe tiếng Việt...</span>
            {inputQuery && <span className="text-white italic">"{inputQuery}"</span>}
          </div>
          <button
            onClick={handleToggleInputMic}
            className="px-2 py-0.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold"
          >
            Dừng & Gửi
          </button>
        </div>
      )}

      {/* Input Box with Voice Recognition & Text */}
      <div className="mt-3 bg-[#0A2540] border border-cyan-500/30 rounded-2xl p-2 sm:p-2.5 shadow-xl flex items-center gap-2">
        {/* Vietnamese Voice Dictation Button */}
        <button
          onClick={handleToggleInputMic}
          className={`p-2.5 rounded-xl border transition-all ${
            isListeningInput
              ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/40 animate-pulse'
              : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/30 hover:scale-105'
          }`}
          title={isListeningInput ? 'Dừng thu âm' : 'Nói tiếng Việt để đặt câu hỏi'}
        >
          {isListeningInput ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="Hỏi về UNCLOS 1982, Nhà giàn DK1, Châu bản triều Nguyễn, Nước trồi..."
          className="flex-1 bg-transparent px-2 sm:px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim() || isTyping}
          className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
            inputQuery.trim() && !isTyping
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-md shadow-cyan-500/20'
              : 'bg-white/5 text-slate-600 cursor-not-allowed'
          }`}
        >
          <span className="hidden sm:inline">Gửi</span>
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Voice Chat Modal */}
      <VoiceChatModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onSendToChatLog={(userText, botText) => {
          const uMsg: ChatMessage = {
            id: `u-${Date.now()}`,
            sender: 'user',
            text: userText,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          };
          const bMsg: ChatMessage = {
            id: `k-${Date.now() + 1}`,
            sender: 'kiensang',
            text: botText,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            reference: 'Tư liệu Chuyên đề Địa lí 11 & Tri thức Biển Đông'
          };
          setMessages(prev => [...prev, uMsg, bMsg]);
        }}
      />
    </div>
  );
};

